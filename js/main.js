import { showPhotos } from './thumbnails.js';
import './load-form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { setUserFormSubmit } from './load-form.js';
import { modalHelper } from './modalHelper.js';
import { setFilters } from './filter.js';

let descriptionsList;

const onGetDataSuccess = (data) => {
  showPhotos(data);
  setFilters();
  descriptionsList = data;
};

const getDescriptionsList = () => descriptionsList;

getData(onGetDataSuccess, showAlert);

setUserFormSubmit(modalHelper);

export {getDescriptionsList};
