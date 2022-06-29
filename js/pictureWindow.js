function addComments (list, element) {
  const commentsFragmentElement = document.createDocumentFragment();
  for (let i = 0; i < list.length; i++) {
    const commentTemplateElement = element.querySelector('.social__comment').cloneNode(true);

    commentTemplateElement.querySelector('img').src = list[i].avatar;
    commentTemplateElement.querySelector('img').alt = list[i].name;
    commentTemplateElement.querySelector('.social__text').textContent = list[i].message;

    commentsFragmentElement.append(commentTemplateElement);
  }
  element.replaceChildren(commentsFragmentElement);
}

function showBigPicture (picture, list, text) {

  const bigPictureElement = document.querySelector('.big-picture');
  const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
  const commentsElement = bigPictureElement.querySelector('.social__comments');
  const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
  const commentsLoaderButtonElement = bigPictureElement.querySelector('.comments-loader');

  bigPictureElement.classList.remove('hidden');
  commentCountElement.classList.add('hidden');
  commentsLoaderButtonElement.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = picture.querySelector('img').src;
  bigPictureElement.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
  bigPictureElement.querySelector('.comments-count').textContent = picture.querySelector('.picture__comments').textContent;
  bigPictureElement.querySelector('.social__caption').textContent = text;

  addComments(list, commentsElement);

  closeButtonElement.addEventListener('click', () => {
    bigPictureElement.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
      bigPictureElement.classList.add('hidden');
    }
  });
}

export {showBigPicture};
