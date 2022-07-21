import { showBigPictureHandler } from './picture-window.js';

const showPhotos = (dataList) => {
  const photoTemplateElement= document.querySelector('#picture').content.querySelector('.picture');
  const photosFragmentElement = document.createDocumentFragment();
  const pictureContainerElement = document.querySelector('.pictures');

  dataList.forEach((data) => {
    const newPhotoElement = photoTemplateElement.cloneNode(true);
    newPhotoElement.dataset.id = data.id;
    newPhotoElement.querySelector('img').src = data.url;
    newPhotoElement.querySelector('.picture__likes').textContent = data.likes;
    newPhotoElement.querySelector('.picture__comments').textContent = data.comments.length;

    photosFragmentElement.append(newPhotoElement);
  });
  pictureContainerElement.append(photosFragmentElement);

  pictureContainerElement.addEventListener('click', showBigPictureHandler);
};

export { showPhotos };
