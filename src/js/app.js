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
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});
window.addEventListener('appinstalled', (e) => {
  console.info('APP Installed');
});
window.addEventListener('load', async () => {
  try {
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
    MAIN = document.querySelector('#main');
    MODAL_POST = document.querySelector('#modal-post-section');
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