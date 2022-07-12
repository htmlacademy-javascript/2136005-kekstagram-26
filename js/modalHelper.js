import {isEscapeKey} from './util.js';
import { resetFormValues } from './load-form.js';

const modalHelper = (modalElement, closeButtonElement, isOpening) => {
  const pictureEscKeydownHelper = (evt) => {
    if (document.activeElement.className !== 'text__hashtags' && document.activeElement.className !== 'text__description' && isEscapeKey(evt)) {
      evt.preventDefault();
      closePictureModal();
      if (modalElement.className !== 'error') {
        resetFormValues();
      }
    }
  };

  const closeErrorHelper = () => {
    if (document.activeElement.className !== 'error') {
      closePictureModal();
      document.querySelector('.img-upload__overlay').classList.remove('hidden');
    }
  };

  if (isOpening) {
    modalElement.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', pictureEscKeydownHelper);
    closeButtonElement.addEventListener('click', () => {
      closePictureModal();
    }, {once: true});
    if (modalElement.className === 'error') {
      document.addEventListener('click', closeErrorHelper);
    }
  }

  if(!isOpening) {
    closePictureModal();
    if (modalElement.className !== 'error') {
      resetFormValues();
    }

  }

  function closePictureModal () {
    modalElement.classList.add('hidden');
    if (modalElement.className !== 'error') {
      document.querySelector('body').classList.remove('modal-open');
    }
    document.removeEventListener('keydown', pictureEscKeydownHelper);
  }
};

export {modalHelper};
