import { showBigPicture } from './picture-window.js';

const showPhotos = (dataList) => {
  const photoTemplateElement= document.querySelector('#picture').content.querySelector('.picture');
  const photosFragmentElement = document.createDocumentFragment();
  const pictureContainerElement = document.querySelector('.pictures');

  for (let i = 0; i < dataList.length; i++) {
    const newPhotoElement = photoTemplateElement.cloneNode(true);
    newPhotoElement.dataset.id = dataList[i].id;
    newPhotoElement.querySelector('img').src = dataList[i].url;
    newPhotoElement.querySelector('.picture__likes').textContent = dataList[i].likes;
    newPhotoElement.querySelector('.picture__comments').textContent = dataList[i].comments.length;

    photosFragmentElement.append(newPhotoElement);
  }
  pictureContainerElement.append(photosFragmentElement);

  pictureContainerElement.addEventListener('click', showBigPicture);
};

export { showPhotos };
