import { modalHelper } from './modalHelper.js';

const addComments = (list, element, firstIndex, maxIndex) => {
  const commentsFragmentElement = document.createDocumentFragment();
  for (let i = firstIndex; i < maxIndex; i++) {
    const commentTemplateElement = element.querySelector('.social__comment').cloneNode(true);

    commentTemplateElement.querySelector('img').src = list[i].avatar;
    commentTemplateElement.querySelector('img').alt = list[i].name;
    commentTemplateElement.querySelector('.social__text').textContent = list[i].message;

    commentsFragmentElement.append(commentTemplateElement);
  }
  if(firstIndex === 0) {
    element.replaceChildren(commentsFragmentElement);
  } else {
    element.appendChild(commentsFragmentElement);
  }
};

const showBigPicture = (picture, list, text) => {

  const bigPictureElement = document.querySelector('.big-picture');
  const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
  const commentsElement = bigPictureElement.querySelector('.social__comments');
  const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
  const commentsLoaderButtonElement = bigPictureElement.querySelector('.comments-loader');
  const totalCommentsTemplate = bigPictureElement.querySelector('.comments-count').cloneNode(true);

  modalHelper(bigPictureElement, closeButtonElement, true);

  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = picture.querySelector('img').src;
  bigPictureElement.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
  totalCommentsTemplate.textContent = picture.querySelector('.picture__comments').textContent;
  commentCountElement.textContent = `${list.length < 6 ? list.length : 5} из `;
  commentCountElement.appendChild(totalCommentsTemplate);
  bigPictureElement.querySelector('.social__caption').textContent = text;
  commentsLoaderButtonElement.classList.remove('hidden');

  const commentsNumber = list.length < 6 ? list.length : 5;
  addComments(list, commentsElement, 0, commentsNumber);

  const loaderButtonClickHandler = () => {
    const commentsAmount = list.length < commentsElement.childNodes.length + 5 ? list.length : commentsElement.childNodes.length + 5;
    addComments(list, commentsElement, commentsElement.childNodes.length, commentsAmount);
    commentCountElement.textContent = `${commentsAmount} из `;
    commentCountElement.appendChild(totalCommentsTemplate);
    if(list.length === commentsElement.childNodes.length) {
      commentsLoaderButtonElement.removeEventListener('click', loaderButtonClickHandler);
      commentsLoaderButtonElement.classList.add('hidden');
    }
  };

  commentsLoaderButtonElement.addEventListener('click', loaderButtonClickHandler);
};

export {showBigPicture};
