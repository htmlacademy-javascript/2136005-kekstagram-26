import {showPhotos} from './thumbnails.js';
import './load-form.js';
import {getData} from './api.js';
// import {showErrorMessage} from './error.js';
import {showAlert} from './util.js';
import {setUserFormSubmit} from './load-form.js';
import {modalHelper} from './modalHelper.js';

let descriptionsList;

getData((photos) => {
  showPhotos(photos);
  descriptionsList = photos;
}, () => {
  showAlert('Ошибка. Попробуйте перезагрузить страницу');
});

const getDescriptionsList = () => descriptionsList;

setUserFormSubmit(modalHelper);

export {getDescriptionsList};
