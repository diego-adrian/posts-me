let deferredPrompt;
let MAIN;
let MODAL_POST;
const showPostModal = () => {
  MAIN.style.display = 'none';
  MODAL_POST.style.display = 'block';
  setTimeout(() => {
    MODAL_POST.style.transform = 'translateY(0)';
  }, 1);
};
const closePostModal = () => {
  MAIN.style.display = 'block';
  MODAL_POST.style.transform = 'translateY(100vh)';
};
const sendData = async (e) => {
  try {
    e.preventDefault();
    const title = document.querySelector('#title');
    const description = document.querySelector('#description');
    if (title.value && description.value) {
      Loading();
      await db.collection('posts').add({
        title: title.value,
        description: description.value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      Loading('none');
      document.forms[0].reset();
      const data = {
        message: 'Registro exitosamente almacenado',
        timeout: 1500
      };
      Message().MaterialSnackbar.showSnackbar(data);
      closePostModal();
    } else {
      const data = {
        message: 'Faltan campos por llenar',
        timeout: 1500
      };
      Message('error').MaterialSnackbar.showSnackbar(data);
    }
  } catch (error) {
    Loading('none');
    const data = {
      message: error.message,
      timeout: 1500
    };
    Message('error').MaterialSnackbar.showSnackbar(data);
  }
};
const createPosts = ({ description, title }) => {
  const mainContent = document.createElement('div');
  mainContent.className = 'card-wide mdl-card mdl-shadow--2dp';

  const cardTitle = document.createElement('div');
  cardTitle.className = 'mdl-card__title';
  const h2 = document.createElement('h2');
  h2.className = 'mdl-card__title-text';
  h2.appendChild(document.createTextNode(title));
  cardTitle.appendChild(h2);

  const cardText = document.createElement('div');
  cardText.className = 'mdl-card__supporting-text';
  cardText.appendChild(document.createTextNode(description));
  
  const btnShare = document.createElement('div');
  btnShare.className = 'mdl-card__menu';
  const btn = document.createElement('button');
  btn.className = 'mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect';
  const icon = document.createElement('i');
  icon.className = 'material-icons';
  icon.appendChild(document.createTextNode('share'));

  btn.appendChild(icon);
  btnShare.appendChild(btn);

  mainContent.appendChild(cardTitle);
  mainContent.appendChild(cardText);
  mainContent.appendChild(btnShare);
  
  MAIN.appendChild(mainContent);
};
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});
window.addEventListener('appinstalled', (e) => {
  console.info('APP Installed');
});
window.addEventListener('load', async () => {
  try {
    MAIN = document.querySelector('#main');
    MODAL_POST = document.querySelector('#modal-post-section');
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query === 'all') {
      // Recuperando todos los registros de firebase
      const allPosts = await db.collection('posts').orderBy('timestamp', 'desc').get();
      allPosts.forEach(post => {
        createPosts(post.data());
      });
    } else if (query === 'images') {
    } else {} 
    window.Message = (option = 'success', container = document.querySelector('#toast-container')) => {
      container.classList.remove('success');
      container.classList.remove('error');
      container.classList.add(option);
      return container;
    };
    const btnShowPost = document.querySelector('#btn-upload-post');
    btnShowPost.addEventListener('click', showPostModal);
    const btnPostCancel = document.querySelector('#btn-post-cancel');
    const btnPostSubmit = document.querySelector('#btn-post-submit');
    btnPostCancel.addEventListener('click', closePostModal);
    btnPostSubmit.addEventListener('click', sendData);
    if ('serviceWorker' in navigator) {
      const response = await navigator.serviceWorker.register('sw.js');
      if (response) {
        console.info('Service worker registrado');
      }
    }
    window.Loading = (option = 'block') => {
      document.querySelector('#loading').style.display = option;
    };
    const bannerInstall = document.querySelector('#banner-install');
    bannerInstall.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const response = await deferredPrompt.userChoice;
        const data = {
          timeout: 1500
        };
        if (response.outcome === 'dismissed') {
          data.message = 'El usuario cancelo la instalación';
          Message('error').MaterialSnackbar.showSnackbar(data);
        }
      }
    });
  } catch (error) {
    const data = {
      message: error.message,
      timeout: 1500
    };
    Message('error').MaterialSnackbar.showSnackbar(data);
  }
});