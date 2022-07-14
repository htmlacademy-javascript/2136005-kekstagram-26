import { getRandomElements } from './util.js';
import { getDescriptionsList } from './main.js';
import { showPhotos } from './thumbnails.js';

const NUMBER_OF_RANDOM_PHOTOS = 10;

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

const sortArray = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const setFilters = () => {
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
      const randomPhotos = getRandomElements(NUMBER_OF_RANDOM_PHOTOS, getDescriptionsList());

      setStyles(evt, '#filter-default', '#filter-discussed');
      removeElements();
      showPhotos(randomPhotos);

    } else if (evt.target.id === 'filter-discussed') {
      setStyles(evt, '#filter-default', '#filter-random');
      removeElements();
      showPhotos(getDescriptionsList().slice().sort(sortArray));

    } else if (evt.target.id === 'filter-default') {
      setStyles(evt, '#filter-random', '#filter-discussed');
      removeElements();
      showPhotos(getDescriptionsList());
    }
  };

  filtersElement.addEventListener('click', filterHandler);

};

export {setFilters};
