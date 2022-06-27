import {createNewPhotoDescriptionList} from './data.js';

function generatePhotoElements () {
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const descriptionList = createNewPhotoDescriptionList();
  const photosFragment = document.createDocumentFragment();
  const pictureContainer = document.querySelector('.pictures');

  for (let i = 0; i < descriptionList.length; i++) {
    const newPhoto = photoTemplate.cloneNode(true);
    newPhoto.querySelector('img').src = descriptionList[i].url;
    newPhoto.querySelector('.picture__likes').textContent = descriptionList[i].likes;
    newPhoto.querySelector('.picture__comments').textContent = descriptionList[i].comments.length;

    photosFragment.append(newPhoto);
  }
  pictureContainer.append(photosFragment);
}

export {generatePhotoElements};
