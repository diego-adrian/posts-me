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

window.addEventListener('load', async () => {
  // Recuperando todos los registros de firebase

  const allPosts = await db.collection('posts').orderBy('timestamp', 'desc').get();
  allPosts.forEach(post => {
    createPosts(post.data());
  })
});