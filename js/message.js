import { resetFormValues } from './load-form.js';
import { isEscapeKey } from './util.js';

const Z_INDEX = '5';

const bodyElement = document.querySelector('body');

const showErrorMessage = () => {
  const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplateElement.cloneNode(true);
  const closeButtonElement = errorElement.querySelector('.error__button');

  bodyElement.append(errorElement);
  errorElement.style.zIndex = Z_INDEX;

  const escKeydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModalHandler();
    }
  };

  const clickOutsideHandler = (evt) => {
    if(document.activeElement.className !== 'error') {
      evt.preventDefault();
      closeModalHandler();
    }
  };

  closeButtonElement.addEventListener('click', closeModalHandler, {once: true});

  document.addEventListener('keydown', escKeydownHandler);

  document.addEventListener('click', clickOutsideHandler);

  function closeModalHandler () {
    if (bodyElement.lastChild.className === errorElement.className) {
      bodyElement.removeChild(errorElement);
    }
    document.removeEventListener('keydown', escKeydownHandler);
    document.removeEventListener('click', clickOutsideHandler);
  }
};

const showSuccessMessage = () => {
  const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplateElement.cloneNode(true);
  const closeButtonElement = successElement.querySelector('.success__button');

  bodyElement.append(successElement);

  const escKeydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModalHandler();
    }
  };

  const clickOutsideHandler = (evt) => {
    if(document.activeElement.className !== 'success') {
      evt.preventDefault();
      closeModalHandler();
    }
  };

  closeButtonElement.addEventListener('click', closeModalHandler, {once: true});

  document.addEventListener('keydown', escKeydownHandler);

  document.addEventListener('click', clickOutsideHandler);

  function closeModalHandler () {
    if (bodyElement.lastChild.className === successElement.className) {
      bodyElement.removeChild(successElement);
    }
    bodyElement.classList.remove('modal-open');
    document.removeEventListener('keydown', escKeydownHandler);
    document.removeEventListener('click', clickOutsideHandler);
    resetFormValues();
  }
};

export { showErrorMessage, showSuccessMessage };
