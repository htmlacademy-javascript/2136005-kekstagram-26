import { isEscapeKey } from './util.js';
import { resetFormValues } from './load-form.js';
import { loaderButtonClickHandler } from './picture-window.js';

const modalHelper = (modalElement, closeButtonElement, isOpening) => {
  const pictureEscKeydownHelper = (evt) => {
    if (document.activeElement.className !== 'text__hashtags' && document.activeElement.className !== 'text__description' &&
        document.querySelector('body').lastChild.nodeName !== 'SECTION' && isEscapeKey(evt)) {
      evt.preventDefault();
      closePictureModal();
    }
  };

  const buttonCloseHelper = (evt) => {
    evt.preventDefault();
    closePictureModal();
  };

  if (isOpening) {
    modalElement.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', pictureEscKeydownHelper);
    closeButtonElement.addEventListener('click', buttonCloseHelper);
  }

  if(!isOpening) {
    closePictureModal();
  }

  function closePictureModal () {
    if (modalElement.classList.contains('big-picture')) {
      modalElement.querySelector('.comments-loader').removeEventListener('click', loaderButtonClickHandler);
    }
    modalElement.classList.add('hidden');
    closeButtonElement.removeEventListener('click', buttonCloseHelper);
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', pictureEscKeydownHelper);
    resetFormValues();
  }
};
export { modalHelper };
