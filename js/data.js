import { getRandomNumber, createUnicNumber } from './util.js';

const names = [
  'Анна',
  'Алексей',
  'Виталий',
  'Гоша',
  'Дарина',
  'Олег'
];
const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const descriptions = [
  'Я не везунчик, я просто талантливый.',
  'Что бы мне написать?)))',
  'Я полагаю, что европейцы опасны и волосаты. (с) Джейсон Стейтэм',
  'Обожаю тот момент на работе, когда нужно уходить домой. (с) Мой начальник',
  'На тот случай, если вы забыли, как я выгляжу',
  'Грустить лучше в мерседесе…',
  'Если тебе где-то не рады в рваных носках, то и в целых туда идти не стоит. (с) Джейсон стейтем'
];

const LOWER_ARRAY_BOUND = 0;
const LOWER_ID_BOUND = 1;
const LOWER_AVATAR_BOUND = 1;
const UPPER_AVATAR_BOUND = 6;
const UPPER_PHOTO_ID_BOUND = 25;
const UPPER_COMMENTS_BOUND = 20;
const MIN_LIKES = 15;
const MAX_LIKES = 200;

const createcommentsList = () => {
  const commentsList = [];
  const commentsAmount = getRandomNumber(LOWER_ID_BOUND, UPPER_COMMENTS_BOUND);
  for(let i = LOWER_ID_BOUND; i <= commentsAmount; i++) {
    const comment = {
      id: createUnicNumber(commentsList, UPPER_COMMENTS_BOUND, LOWER_ID_BOUND),
      avatar: `img/avatar-${getRandomNumber(LOWER_AVATAR_BOUND, UPPER_AVATAR_BOUND)}.svg`,
      message: comments[getRandomNumber(LOWER_ARRAY_BOUND, comments.length - 1)],
      name: names[getRandomNumber(LOWER_ARRAY_BOUND, names.length - 1)]
    };
    commentsList.push(comment);
  }
  return commentsList;
};

const createNewPhotoDescriptionsList = () => {
  const photosList =[];
  for(let i = LOWER_ARRAY_BOUND+1; i <= UPPER_PHOTO_ID_BOUND; i++) {
    const photo = {
      id: createUnicNumber(photosList, UPPER_PHOTO_ID_BOUND, LOWER_ID_BOUND),
      url: `photos/${i}.jpg`,
      description: descriptions[getRandomNumber(LOWER_ARRAY_BOUND, descriptions.length - 1)],
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: createcommentsList()
    };
    photosList.push(photo);
  }

  return photosList;
};

export { createNewPhotoDescriptionsList };
