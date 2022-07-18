import { modalHelper } from './modal-helper.js';
import { findDuplicateElements } from './util.js';
import { resetEffects } from './effect.js';
import { sendData } from './api.js';
import { scale } from './scale.js';
import { showErrorMessage, showSuccessMessage } from './message.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const MAX_HASHTAGS = 5;
const COMMENT_LENGTH = 140;
const regularExpression = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const SETUP_SCALE_VALUE = '100%';
const TRANSFORM_SETUP = 'scale(1)';
const COMMENT_ERROR_MESSAGE = 'Длина комментария не может составлять больше 140 символов.';
const FORMAT_ERROR_MESSAGE = 'Упс! Неверный формат!';
const DUPLICATE_ERROR_MESSAGE = 'Упс, такой хэштег уже есть!';
const AMOUNT_ERROR_MESSAGE = 'Максимум 5 хэштегов!';

const uploadFormElement = document.querySelector('.img-upload__form');
const fileChooserElement = uploadFormElement.querySelector('#upload-file');
const uploadFieldElement = uploadFormElement.querySelector('.img-upload__overlay');
const previewElement = uploadFieldElement.querySelector('.img-upload__preview img');
const hashtagsElement = uploadFormElement.querySelector('.text__hashtags');
const commentElement = uploadFormElement.querySelector('.text__description');
const closeButtonElement = uploadFieldElement.querySelector('#upload-cancel');
const scaleSmallerElement = uploadFieldElement.querySelector('.scale__control--smaller');
const scaleBiggerElement = uploadFieldElement.querySelector('.scale__control--bigger');
const scaleValueElement = uploadFieldElement.querySelector('.scale__control--value');
const sliderElement = uploadFormElement.querySelector('.effect-level__slider');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');
const effectsElements = uploadFormElement.querySelectorAll('.effects__radio');

scale(previewElement, scaleValueElement,scaleSmallerElement, scaleBiggerElement, SETUP_SCALE_VALUE);
sliderElement.classList.add('hidden');
resetEffects();

fileChooserElement.addEventListener('change', () => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewElement.src = URL.createObjectURL(file);
  }

  modalHelper(uploadFieldElement, closeButtonElement, true);
});

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__invalid',
  successClass: 'img-upload__valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error-text'
});

const getHashtagErrorMessage = () => {
  const array = hashtagsElement.value.split(' ').map((element) => element.toLowerCase());
  if (hashtagsElement.value && !array.every((element) => regularExpression.test(element))) {
    return FORMAT_ERROR_MESSAGE;
  }
  if(findDuplicateElements(array)){
    return DUPLICATE_ERROR_MESSAGE;
  }
  if (array.length > MAX_HASHTAGS) {
    return AMOUNT_ERROR_MESSAGE;
  }
};

const validateHashtags = (value) => {
  if (value === '') {
    return true;
  } else {
    const arrayOfHashtags = value.split(' ').map((element) => element.toLowerCase());
    const checkValidation = arrayOfHashtags.length === 0 ? true :
      arrayOfHashtags.every((hashtag) => regularExpression.test(hashtag) && !findDuplicateElements(arrayOfHashtags));
    return arrayOfHashtags.length <= MAX_HASHTAGS && checkValidation;
  }
};

pristine.addValidator(hashtagsElement, validateHashtags, getHashtagErrorMessage);

pristine.addValidator(commentElement, (value) => value.length <= COMMENT_LENGTH, COMMENT_ERROR_MESSAGE);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Сохраняем...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const resetFormValues = () => {
  hashtagsElement.value = '';
  commentElement.value = '';
  scaleValueElement.value = SETUP_SCALE_VALUE;
  previewElement.style.transform = TRANSFORM_SETUP;
  fileChooserElement.value = '';
  resetEffects();
  effectsElements.forEach((element) => {
    element.checked = false;
  });
  effectsElements[0].checked = true;
};

const setUserFormSubmit = (onSuccess) => {
  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess(uploadFieldElement, closeButtonElement, false);
          showSuccessMessage();
          unblockSubmitButton();
          resetFormValues();
        },
        () => {
          showErrorMessage();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export { setUserFormSubmit, resetFormValues };
