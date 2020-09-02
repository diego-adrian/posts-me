document.addEventListener('DOMContentLoaded', () => {
  window.Message = (option = 'success', container = document.querySelector('#toast-container')) => {
    container.classList.remove('success');
    container.classList.remove('error');
    container.classList.add(option);
    return container;
  };
  window.Loading = (option = 'block') => {
    document.querySelector('#loading').style.display = option;
  };
});