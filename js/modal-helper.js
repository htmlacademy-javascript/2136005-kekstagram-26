import { isEscapeKey } from './util.js';
import { resetFormValues } from './load-form.js';
import { loaderButtonClickHandler } from './picture-window.js';

const setModalHelper = (modalElement, closeButtonElement, isOpening) => {
  const bodyElement = document.querySelector('body');
  const escKeydownHandler = (evt) => {
    if (document.activeElement.className !== 'text__hashtags' && document.activeElement.className !== 'text__description' &&
        bodyElement.lastChild.nodeName !== 'SECTION' && isEscapeKey(evt)) {
      evt.preventDefault();
      closePictureModalHandler();
    }
  };

  const buttonCloseHandler = (evt) => {
    evt.preventDefault();
    closePictureModalHandler();
  };

  if (isOpening) {
    modalElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    document.addEventListener('keydown', escKeydownHandler);
    closeButtonElement.addEventListener('click', buttonCloseHandler);
  }

  if(!isOpening) {
    closePictureModalHandler();
  }

  function closePictureModalHandler () {
    if (modalElement.classList.contains('big-picture')) {
      modalElement.querySelector('.comments-loader').removeEventListener('click', loaderButtonClickHandler);
    }
    modalElement.classList.add('hidden');
    closeButtonElement.removeEventListener('click', buttonCloseHandler);
    bodyElement.classList.remove('modal-open');
    document.removeEventListener('keydown', escKeydownHandler);
    resetFormValues();
  }
};
export { setModalHelper };
