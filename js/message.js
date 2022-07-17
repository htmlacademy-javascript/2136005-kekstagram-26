import { resetFormValues } from './load-form.js';
import { isEscapeKey } from './util.js';

const Z_INDEX = '5';

const showErrorMessage = () => {
  const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplateElement.cloneNode(true);
  const closeButtonElement = errorElement.querySelector('.error__button');

  document.querySelector('body').append(errorElement);
  errorElement.style.zIndex = Z_INDEX;

  const escKeydownHelper = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  };

  const clickOutsideHelper = (evt) => {
    if(document.activeElement.className !== 'error') {
      evt.preventDefault();
      closeModal();
    }
  };

  closeButtonElement.addEventListener('click', () => {
    closeModal();
  });

  document.addEventListener('keydown', escKeydownHelper);

  document.addEventListener('click', clickOutsideHelper);

  function closeModal () {
    document.querySelector('body').removeChild(errorElement);
    document.removeEventListener('keydown', escKeydownHelper);
    document.removeEventListener('click', clickOutsideHelper);
  }
};

const showSuccessMessage = () => {
  const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplateElement.cloneNode(true);
  const closeButtonElement = successElement.querySelector('.success__button');

  document.querySelector('body').append(successElement);

  const escKeydownHelper = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  };

  const clickOutsideHelper = (evt) => {
    if(document.activeElement.className !== 'success') {
      evt.preventDefault();
      closeModal();
    }
  };

  closeButtonElement.addEventListener('click', () => {
    closeModal();
  });

  document.addEventListener('keydown', escKeydownHelper);

  document.addEventListener('click', clickOutsideHelper);

  function closeModal () {
    document.querySelector('body').removeChild(successElement);
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', escKeydownHelper);
    document.removeEventListener('click', clickOutsideHelper);
    resetFormValues();
  }
};

export { showErrorMessage, showSuccessMessage };
