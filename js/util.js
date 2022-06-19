function getRandomNumber (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function checkStringLength (chekingString, max) {
  if(typeof chekingString !== 'string'){
    return 'Это не строка!';
  }
  return chekingString.length <= max;
}

function createUnicNumber (array, upper, lowerBound) {
  let randomNumber = getRandomNumber(lowerBound, upper);
  if (array !== []) {
    while (array.filter((value) => value.id === randomNumber).length > 0) {
      randomNumber = getRandomNumber(lowerBound, upper);
    }
  }
  return randomNumber;
}

export{getRandomNumber, checkStringLength, createUnicNumber};
