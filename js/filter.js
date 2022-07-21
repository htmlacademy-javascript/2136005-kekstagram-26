import { debounce, getRandomElements } from './util.js';
import { showPhotos } from './thumbnails.js';

const NUMBER_OF_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;

const filtersElement = document.querySelector('.img-filters');
const filterDefaultElement = filtersElement.querySelector('#filter-default');
const filterRandomElement = filtersElement.querySelector('#filter-random');
const filterDiscussedElement = filtersElement.querySelector('#filter-discussed');

const removeElements = () => {
  const pictureContainerElement = document.querySelector('.pictures');
  const pictureElements = pictureContainerElement.querySelectorAll('.picture');

  const removeHelper = (node) => {
    node.remove();
  };

  pictureElements.forEach((pictureElement) => removeHelper(pictureElement));
};

const renderFilteredPhotos = (photos) => {
  removeElements();
  showPhotos(photos);
};

const setStyles = (evt, filterA, filterB) => {
  filterA.classList.remove('img-filters__button--active');
  filterB.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const setPhotosHandler = (evt, filterA, filterB, cb) => {
  if (!evt.target.classList.contains('img-filters__button--active')) {
    setStyles(evt, filterA, filterB);
    const debounsedCallBack = debounce(cb, RERENDER_DELAY);
    debounsedCallBack();
  }

};

const sortPhotosPredicate = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const setFilters = (photosList) => {

  filtersElement.classList.remove('img-filters--inactive');

  const filterHandler = (evt) => {
    if (evt.target.id === 'filter-random') {
      const randomPhotos = getRandomElements(NUMBER_OF_RANDOM_PHOTOS, photosList);
      setPhotosHandler(evt, filterDefaultElement, filterDiscussedElement, () => renderFilteredPhotos(randomPhotos));
    } else if (evt.target.id === 'filter-discussed') {
      setPhotosHandler(evt, filterDefaultElement, filterRandomElement, () => renderFilteredPhotos(photosList.slice().sort(sortPhotosPredicate)));
    } else if (evt.target.id === 'filter-default'){
      setPhotosHandler(evt, filterRandomElement, filterDiscussedElement, () => renderFilteredPhotos(photosList));
    }
  };

  filtersElement.addEventListener('click', filterHandler);

};

export { setFilters };
