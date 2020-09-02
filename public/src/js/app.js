window.addEventListener('load', async () => {
  try {
    if ('serviceWorker' in navigator) {
      const response = await navigator.serviceWorker.register('/sw.js');
      if (response) {
        console.info('Service worker registrado');
      }
    }
    window.Message = (option = 'success', container = document.querySelector('#toast-container')) => {
      container.classList.remove('success');
      container.classList.remove('error');
      container.classList.add(option);
      return container;
    };
    window.Loading = (option = 'block') => {
      document.querySelector('#loading').style.display = option;
    };
  } catch (error) {
    const data = {
      message: error.message,
      timeout: 1500
    };
    Message('error').MaterialSnackbar.showSnackbar(data);
  }
});