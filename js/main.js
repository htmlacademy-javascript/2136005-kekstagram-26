import { showPhotos } from './thumbnails.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { setUserFormSubmit } from './load-form.js';
import { setModalHelper } from './modal-helper.js';
import { setFilters } from './filter.js';

let descriptionsList;

const getDescriptionsList = () => descriptionsList;

const onGetDataSuccess = (data) => {
  showPhotos(data);
  setFilters(data);
  descriptionsList = data;
};

getData(onGetDataSuccess, showAlert);

setUserFormSubmit(setModalHelper);

export { getDescriptionsList };
