/* eslint-disable no-console */
import {modalHelper} from './modalHelper.js';
import { findDuplicateElements } from './util.js';
import {resetEffects} from './effect.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const regularExpression = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const scaleIncrement = 25;
const firstScaleValue = '100%';

const uploadFormElement = document.querySelector('.img-upload__form');
const fileChooserElement = uploadFormElement.querySelector('#upload-file');
const uploadFieldElement = uploadFormElement.querySelector('.img-upload__overlay');
const preview = uploadFieldElement.querySelector('.img-upload__preview img');
const hashtagsElement = uploadFormElement.querySelector('.text__hashtags');
const commentElement = uploadFormElement.querySelector('.text__description');
const closeButtonElement = uploadFieldElement.querySelector('#upload-cancel');
const scaleSmallerElement = uploadFieldElement.querySelector('.scale__control--smaller');
const scaleBiggerElement = uploadFieldElement.querySelector('.scale__control--bigger');
const scaleValueElement = uploadFieldElement.querySelector('.scale__control--value');
const sliderElement = uploadFormElement.querySelector('.effect-level__slider');

scaleValueElement.value = firstScaleValue;

scaleSmallerElement.addEventListener('click', () => {
  let currentScaleValue = parseInt(scaleValueElement.value, 10);
  if(currentScaleValue >= 50) {
    scaleValueElement.value = `${currentScaleValue - scaleIncrement}%`;
    currentScaleValue -= 25;
    preview.style.transform = `scale(0.${currentScaleValue})`;
  }
});

scaleBiggerElement.addEventListener('click', () => {
  let currentScaleValue = parseInt(scaleValueElement.value, 10);
  if(currentScaleValue < 75) {
    scaleValueElement.value = `${currentScaleValue + scaleIncrement}%`;
    currentScaleValue += 25;
    preview.style.transform = `scale(0.${currentScaleValue})`;
  } else {
    scaleValueElement.value = `${currentScaleValue + scaleIncrement}%`;
    preview.style.transform = 'scale(1)';
  }
});

sliderElement.classList.add('hidden');
resetEffects();

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__invalid',
  successClass: 'img-upload__valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error-text'
});


fileChooserElement.addEventListener('change', () => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }

  modalHelper(uploadFieldElement, closeButtonElement, true);
  fileChooserElement.value = '';
});


const getHashtagErrorMessage = () => {
  const array = hashtagsElement.value.split(' ').map((element) => element.toLowerCase());
  if (hashtagsElement.value && !array.every((element) => regularExpression.test(element))) {
    return 'Упс! Неверный формат!';
  }
  if(findDuplicateElements(array)){
    return 'Упс, такой хэштег уже есть!';
  }
  if (array.length > 5) {
    return 'Максимум 5 хэштегов!';
  }
};

const validateHashtags = (value) => {
  const arrayOfHashtags = value.split(' ').map((element) => element.toLowerCase());
  const checkValidation = arrayOfHashtags.every((hashtag) => regularExpression.test(hashtag) &&
                                                              !findDuplicateElements(arrayOfHashtags));
  return arrayOfHashtags.length <= 5 && checkValidation;
};

pristine.addValidator(hashtagsElement, validateHashtags, getHashtagErrorMessage);

pristine.addValidator(commentElement, (value) => value.length <= 140, 'Длина комментария не может составлять больше 140 символов.');

uploadFormElement.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
    hashtagsElement.value = '';
    commentElement.value = '';
    scaleValueElement.value = firstScaleValue;
    preview.style.transform = 'scale(1)';
    modalHelper(uploadFieldElement, closeButtonElement, false);
  }
});