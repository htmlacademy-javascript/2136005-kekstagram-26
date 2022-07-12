import {isEscapeKey} from './util.js';
import { resetFormValues } from './load-form.js';

const modalHelper = (modalElement, closeButtonElement, isOpening) => {
  const pictureEscKeydownHelper = (evt) => {
    if (document.activeElement.className !== 'text__hashtags' && document.activeElement.className !== 'text__description' && isEscapeKey(evt)) {
      evt.preventDefault();
      closePictureModal();
    }
  };

  if (isOpening) {
    modalElement.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', pictureEscKeydownHelper);
    closeButtonElement.addEventListener('click', () => {
      closePictureModal();
    }, {once: true});
  }

  if(!isOpening) {
    closePictureModal();
    resetFormValues();
  }

  function closePictureModal () {
    modalElement.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', pictureEscKeydownHelper);
  }
};

export {modalHelper};
