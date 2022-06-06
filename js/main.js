const getRandomNumber = (min, max) => {
  if((min < 0 && max < 0) || (min >= max) || ((min ^ 0) * (max ^ 0) !== min * max)){
    return 'Диапазон задан неверно!';
  }
  if(min < 0){
    min = 0;
  }
  return Math.round(Math.random() * (max - min) + min);
};

const checkStringLength = (chekingString, max) => {
  if(typeof chekingString !== 'string'){
    return 'Это не строка!';
  }
  if (chekingString.length > max) {
    return false;
  }
  return true;
};

checkStringLength('chekingString', 3);
getRandomNumber(1, 2);
