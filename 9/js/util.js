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

const createUnicNumber = (array, upper, lowerBound) => {
  let randomNumber = getRandomNumber(lowerBound, upper);
  if (array.length !== 0) {
    while (array.filter((value) => value.id === randomNumber).length > 0) {
      randomNumber = getRandomNumber(lowerBound, upper);
    }
  }
  return randomNumber;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

function findDuplicateElements(array) {
  for (let i = 0; i < array.length; i++) {
    for(let j = 0; j < array.length; j++) {
      if (i !== j && array[i] === array[j]){
        return true;
      }
    }
  }
}

export{getRandomNumber, checkStringLength, createUnicNumber, isEscapeKey, findDuplicateElements};
