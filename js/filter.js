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

const sortArray = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const setFilters = (photosList) => {
  const filtersElement = document.querySelector('.img-filters');

  filtersElement.classList.remove('img-filters--inactive');

  const setStyles = (evt, filterA, filterB) => {
    filtersElement.querySelector(filterA).style.color = 'white';
    filtersElement.querySelector(filterA).style.backgroundColor = '#232321';
    filtersElement.querySelector(filterB).style.color = 'white';
    filtersElement.querySelector(filterB).style.backgroundColor = '#232321';
    evt.target.style.color = '#ff4e4e';
    evt.target.style.backgroundColor = 'white';
  };

  const filterHandler = (evt) => {
    if (evt.target.id === 'filter-random') {
      const randomPhotos = getRandomElements(NUMBER_OF_RANDOM_PHOTOS, photosList);

      setStyles(evt, '#filter-default', '#filter-discussed');
      debounce(() => renderFilteredPhotos(randomPhotos), RERENDER_DELAY)();

    } else if (evt.target.id === 'filter-discussed') {
      setStyles(evt, '#filter-default', '#filter-random');
      debounce(() => renderFilteredPhotos(photosList.slice().sort(sortArray)), RERENDER_DELAY)();

    } else if (evt.target.id === 'filter-default') {
      setStyles(evt, '#filter-random', '#filter-discussed');
      debounce(() => renderFilteredPhotos(photosList), RERENDER_DELAY)();
    }
  };

  filtersElement.addEventListener('click', filterHandler);

};

export {setFilters};
