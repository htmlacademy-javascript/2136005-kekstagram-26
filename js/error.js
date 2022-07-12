const showErrorMessage = () => {
  const errorElement = document.querySelector('.error-message');

  errorElement.classList.remove('hidden');
};

export {showErrorMessage};
