function generatePhotoElements (dataList) {
  const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const photosFragment = document.createDocumentFragment();
  const pictureContainer = document.querySelector('.pictures');

  for (let i = 0; i < dataList.length; i++) {
    const newPhoto = photoTemplate.cloneNode(true);
    newPhoto.querySelector('img').src = dataList[i].url;
    newPhoto.querySelector('.picture__likes').textContent = dataList[i].likes;
    newPhoto.querySelector('.picture__comments').textContent = dataList[i].comments.length;

    photosFragment.append(newPhoto);
  }
  pictureContainer.append(photosFragment);
}

export {generatePhotoElements};
