const SCALE_INCREMENT = 25;
const SMALLER_MAX = 50;
const BIGGER_MAX = 75;
const TRANSFORM_SETUP = 'scale(1)';

const scale = (preview, scaleValueElement, scaleSmallerElement, scaleBiggerElement, firstScaleValue) => {
  scaleValueElement.value = firstScaleValue;

  scaleSmallerElement.addEventListener('click', () => {
    let currentScaleValue = parseInt(scaleValueElement.value, 10);
    if(currentScaleValue >= SMALLER_MAX) {
      scaleValueElement.value = `${currentScaleValue - SCALE_INCREMENT}%`;
      currentScaleValue -= SCALE_INCREMENT;
      preview.style.transform = `scale(0.${currentScaleValue})`;
    }
  });

  scaleBiggerElement.addEventListener('click', () => {
    let currentScaleValue = parseInt(scaleValueElement.value, 10);
    if(currentScaleValue < BIGGER_MAX) {
      scaleValueElement.value = `${currentScaleValue + SCALE_INCREMENT}%`;
      currentScaleValue += SCALE_INCREMENT;
      preview.style.transform = `scale(0.${currentScaleValue})`;
    } else {
      scaleValueElement.value = firstScaleValue;
      preview.style.transform = TRANSFORM_SETUP;
    }
  });
};

export { scale };
