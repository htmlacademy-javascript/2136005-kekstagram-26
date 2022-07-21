import { debounce, getRandomElements } from './util.js';
import { showPhotos } from './thumbnails.js';

const NUMBER_OF_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;

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
  filtersElement.querySelector(filterA).classList.remove('img-filters__button--active');
  filtersElement.querySelector(filterB).classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const setPhotosHandler = (evt, filtersElement, filterA, filterB, cb) => {
  if (!evt.target.classList.contains('img-filters__button--active')) {
    setStyles(evt, filtersElement, filterA, filterB);
    const debounsedCallBack = debounce(cb, RERENDER_DELAY);
    debounsedCallBack();
  }

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
