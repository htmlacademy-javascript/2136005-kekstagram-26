import {isEscapeKey} from './util.js';
import { resetFormValues } from './load-form.js';
const modalHelper = (modalElement, closeButtonElement, isOpening) => {
  const pictureEscKeydownHelper = (evt) => {
    if (document.activeElement.className !== 'text__hashtags' && document.activeElement.className !== 'text__description' &&
        document.querySelector('body').lastChild.nodeName !== 'SECTION' && isEscapeKey(evt)) {
      evt.preventDefault();
      closePictureModal();
    }
  };

  if (isOpening) {
    modalElement.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', pictureEscKeydownHelper);
    closeButtonElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      closePictureModal();
    }, {once: true});
  }

  if(!isOpening) {
    closePictureModal();
  }

  function closePictureModal () {
    modalElement.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', pictureEscKeydownHelper);
    resetFormValues();
  }
};

export {modalHelper};
