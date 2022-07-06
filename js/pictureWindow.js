import { modalHelper } from './modalHelper.js';
import { getDescriptionsList } from './main.js';

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

const showBigPicture = (evt) => {
  if (evt.target.parentNode.matches('.picture')) {
    const dataList = getDescriptionsList();
    const id = evt.target.parentNode.dataset.id;
    const photoData = dataList.find((data) => data.id === parseInt(id, 10));
    const commentsList = photoData.comments;
    const bigPictureElement = document.querySelector('.big-picture');
    const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
    const commentsElement = bigPictureElement.querySelector('.social__comments');
    const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
    const commentsLoaderButtonElement = bigPictureElement.querySelector('.comments-loader');
    const totalCommentsTemplate = bigPictureElement.querySelector('.comments-count').cloneNode(true);

    modalHelper(bigPictureElement, closeButtonElement, true);

    bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = photoData.url;
    bigPictureElement.querySelector('.likes-count').textContent = photoData.likes;
    totalCommentsTemplate.textContent = commentsList.length;
    commentCountElement.textContent = `${commentsList.length < 6 ? commentsList.length : 5} из `;
    commentCountElement.appendChild(totalCommentsTemplate);
    bigPictureElement.querySelector('.social__caption').textContent = photoData.description;

    const commentsNumber = commentsList.length < 6 ? commentsList.length : 5;
    addComments(commentsList, commentsElement, 0, commentsNumber);

    if(commentsList.length > 5) {
      commentsLoaderButtonElement.classList.remove('hidden');
      const loaderButtonClickHandler = () => {
        const commentsAmount = commentsList.length < commentsElement.childNodes.length + 5 ? commentsList.length : commentsElement.childNodes.length + 5;
        addComments(commentsList, commentsElement, commentsElement.childNodes.length, commentsAmount);
        commentCountElement.textContent = `${commentsAmount} из `;
        commentCountElement.appendChild(totalCommentsTemplate);
        if(commentsList.length === commentsElement.childNodes.length) {
          commentsLoaderButtonElement.removeEventListener('click', loaderButtonClickHandler);
          commentsLoaderButtonElement.classList.add('hidden');
        }
      };

      commentsLoaderButtonElement.addEventListener('click', loaderButtonClickHandler);
    }
  }
};

export {showBigPicture};
