
const scale = (preview, scaleValueElement,scaleSmallerElement, scaleBiggerElement, firstScaleValue) => {
  const scaleIncrement = 25;
  scaleValueElement.value = firstScaleValue;

  scaleSmallerElement.addEventListener('click', () => {
    let currentScaleValue = parseInt(scaleValueElement.value, 10);
    if(currentScaleValue >= 50) {
      scaleValueElement.value = `${currentScaleValue - scaleIncrement}%`;
      currentScaleValue -= 25;
      preview.style.transform = `scale(0.${currentScaleValue})`;
    }
  });

  scaleBiggerElement.addEventListener('click', () => {
    let currentScaleValue = parseInt(scaleValueElement.value, 10);
    if(currentScaleValue < 75) {
      scaleValueElement.value = `${currentScaleValue + scaleIncrement}%`;
      currentScaleValue += 25;
      preview.style.transform = `scale(0.${currentScaleValue})`;
    } else {
      scaleValueElement.value = firstScaleValue;
      preview.style.transform = 'scale(1)';
    }
  });
};

export {scale};
