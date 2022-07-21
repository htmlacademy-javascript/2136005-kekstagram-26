const ALERT_SHOW_TIME = 5000;
const LOWER_ID_BOUND = 1;
const UPPER_PHOTO_ID_BOUND = 24;

const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const checkStringLength = (chekingString, max) => {
  if(typeof chekingString !== 'string'){
    return 'Это не строка!';
  }
  return chekingString.length <= max;
};

const createUnicNumber = (numbers, upper, lowerBound) => {
  let randomNumber = getRandomNumber(lowerBound, upper);
  if (numbers.length !== 0) {
    while (numbers.filter((value) => value.id === randomNumber).length > 0) {
      randomNumber = getRandomNumber(lowerBound, upper);
    }
  }
  return randomNumber;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const hasDuplicateElements = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    for(let j = 0; j < elements.length; j++) {
      if (i !== j && elements[i] === elements[j]){
        return true;
      }
    }
  }
  return false;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getRandomElements = (number, array) => {
  const randomArray = [];
  for (let i = 0; i < number; i++) {
    randomArray[i] = array[createUnicNumber(randomArray, UPPER_PHOTO_ID_BOUND, LOWER_ID_BOUND)];
  }
  return randomArray;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export{ getRandomNumber, checkStringLength, createUnicNumber, isEscapeKey, hasDuplicateElements, showAlert, getRandomElements, debounce };
