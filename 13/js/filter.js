import { debounce, getRandomElements } from './util.js';
import { showPhotos } from './thumbnails.js';

const NUMBER_OF_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;
const FILTER_COLOR = 'white';
const FILTER_BACKGROUND_COLOR = '#232321';
const NEW_FILTER_COLOR = '#ff4e4e';

const removeElements = () => {
  const pictureContainerElement = document.querySelector('.pictures');
  const pictureElements = pictureContainerElement.querySelectorAll('.picture');

  const removeHelper = (node) => {
    node.remove();
  };

  for (let i = 0; i < pictureElements.length; i++) {
    removeHelper(pictureElements[i]);
  }
};

const renderFilteredPhotos = (photos) => {
  removeElements();
  showPhotos(photos);
};

const setStyles = (evt, filtersElement, filterA, filterB) => {
  filtersElement.querySelector(filterA).style.color = FILTER_COLOR;
  filtersElement.querySelector(filterA).style.backgroundColor = FILTER_BACKGROUND_COLOR;
  filtersElement.querySelector(filterB).style.color = FILTER_COLOR;
  filtersElement.querySelector(filterB).style.backgroundColor = FILTER_BACKGROUND_COLOR;
  evt.target.style.color = NEW_FILTER_COLOR;
  evt.target.style.backgroundColor = FILTER_COLOR;
};

const setPhotosHandler = (evt, filtersElement, filterA, filterB, cb) => {
  setStyles(evt, filtersElement, filterA, filterB);
  const debounsedCallBack = debounce(cb, RERENDER_DELAY);
  debounsedCallBack();
};

const sortArray = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const setFilters = (photosList) => {
  const filtersElement = document.querySelector('.img-filters');

  filtersElement.classList.remove('img-filters--inactive');

  const filterHandler = (evt) => {
    if (evt.target.id === 'filter-random') {
      const randomPhotos = getRandomElements(NUMBER_OF_RANDOM_PHOTOS, photosList);
      setPhotosHandler(evt, filtersElement, '#filter-default', '#filter-discussed', () => renderFilteredPhotos(randomPhotos));
    } else if (evt.target.id === 'filter-discussed') {
      setPhotosHandler(evt, filtersElement, '#filter-default', '#filter-random', () => renderFilteredPhotos(photosList.slice().sort(sortArray)));
    } else {
      setPhotosHandler(evt, filtersElement, '#filter-random', '#filter-discussed', () => renderFilteredPhotos(photosList));
    }
  };

  filtersElement.addEventListener('click', filterHandler);

};

export { setFilters };
