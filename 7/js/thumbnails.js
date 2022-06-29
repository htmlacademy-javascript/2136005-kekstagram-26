import {showBigPicture} from './pictureWindow.js';

function thumbnailClickHandler (thumbnail, commentsList, description) {

  thumbnail.addEventListener('click', () => {
    showBigPicture(thumbnail, commentsList, description);
  });
}

function generatePhotoElements (dataList) {
  const photoTemplateElement= document.querySelector('#picture').content.querySelector('.picture');
  const photosFragmentElement = document.createDocumentFragment();
  const pictureContainerElement = document.querySelector('.pictures');

  for (let i = 0; i < dataList.length; i++) {
    const newPhotoElement = photoTemplateElement.cloneNode(true);
    newPhotoElement.querySelector('img').src = dataList[i].url;
    newPhotoElement.querySelector('.picture__likes').textContent = dataList[i].likes;
    newPhotoElement.querySelector('.picture__comments').textContent = dataList[i].comments.length;
    thumbnailClickHandler(newPhotoElement, dataList[i].comments, dataList[i].description);

    photosFragmentElement.append(newPhotoElement);
  }
  pictureContainerElement.append(photosFragmentElement);
}

export {generatePhotoElements};
