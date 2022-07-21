import { modalHelper } from './modal-helper.js';
import { getDescriptionsList } from './main.js';

const MAX_COMMENTS = 5;

const bigPictureElement = document.querySelector('.big-picture');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsElement = bigPictureElement.querySelector('.social__comments');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderButtonElement = bigPictureElement.querySelector('.comments-loader');
const totalCommentsTemplateElement = bigPictureElement.querySelector('.comments-count').cloneNode(true);

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

const loaderButtonClickHandler = () => {
  const dataList = getDescriptionsList();
  const id = bigPictureElement.dataset.id;
  const photoData = dataList.find((data) => data.id === parseInt(id, 10));
  const commentsList = photoData.comments;
  const commentsAmount = commentsList.length < commentsElement.childNodes.length + MAX_COMMENTS ? commentsList.length : commentsElement.childNodes.length + MAX_COMMENTS;
  addComments(commentsList, commentsElement, commentsElement.childNodes.length, commentsAmount);
  commentCountElement.textContent = `${commentsAmount} из `;
  commentCountElement.append(totalCommentsTemplateElement);
  commentCountElement.append(document.createTextNode(' комментариев'));
  if(commentsList.length === commentsElement.childNodes.length) {
    commentsLoaderButtonElement.removeEventListener('click', loaderButtonClickHandler);
    commentsLoaderButtonElement.classList.add('hidden');
  }
};

const showBigPicture = (evt) => {
  if (evt.target.parentNode.matches('.picture')) {
    const dataList = getDescriptionsList();
    const id = evt.target.parentNode.dataset.id;
    const photoData = dataList.find((data) => data.id === parseInt(id, 10));
    const commentsList = photoData.comments;

    bigPictureElement.dataset.id = id;
    modalHelper(bigPictureElement, closeButtonElement, true);

    bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = photoData.url;
    bigPictureElement.querySelector('.likes-count').textContent = photoData.likes;
    totalCommentsTemplateElement.textContent = commentsList.length;
    commentCountElement.textContent = `${commentsList.length < MAX_COMMENTS + 1 ? commentsList.length : MAX_COMMENTS} из `;
    commentCountElement.append(totalCommentsTemplateElement);
    commentCountElement.append(document.createTextNode(' комментариев'));
    bigPictureElement.querySelector('.social__caption').textContent = photoData.description;

    const commentsNumber = commentsList.length < MAX_COMMENTS + 1 ? commentsList.length : MAX_COMMENTS;
    addComments(commentsList, commentsElement, 0, commentsNumber);

    if(commentsList.length > MAX_COMMENTS) {
      commentsLoaderButtonElement.classList.remove('hidden');
      commentsLoaderButtonElement.addEventListener('click', loaderButtonClickHandler);
    }else {
      commentsLoaderButtonElement.classList.add('hidden');
    }
  }
};

export { showBigPicture, loaderButtonClickHandler };
