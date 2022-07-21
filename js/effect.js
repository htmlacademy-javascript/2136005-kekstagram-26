const uploadFormElement = document.querySelector('.img-upload__form');
const previewElement = uploadFormElement.querySelector('.img-upload__preview img');
const sliderContainerElement = uploadFormElement.querySelector('.img-upload__effect-level');
const sliderElement = uploadFormElement.querySelector('.effect-level__slider');
const effectLevelElement = uploadFormElement.querySelector('.effect-level__value');

const EFFECTS = [
  {
    id: 'effect-none',
    min: 0,
    max: 0,
    step: 0
  },
  {
    id: 'effect-chrome',
    filterName: 'grayscale',
    claccName: 'effects__preview--chrome',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    id: 'effect-sepia',
    filterName: 'sepia',
    claccName: 'effects__preview--sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    id: 'effect-marvin',
    filterName: 'invert',
    claccName: 'effects__preview--marvin',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    id: 'effect-phobos',
    filterName: 'blur',
    claccName: 'effects__preview--phobos',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    id: 'effect-heat',
    filterName: 'brightness',
    claccName: 'effects__preview--heat',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  },
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const updateSlider = () => {
  sliderElement.classList.remove('hidden');
  sliderContainerElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max
    },
    start: chosenEffect.max,
    step: chosenEffect.step
  });
};

if (chosenEffect === DEFAULT_EFFECT) {
  sliderElement.classList.add('hidden');
  sliderContainerElement.classList.add('hidden');
}

const formChangeHandler = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.id === evt.target.id);
  updateSlider();
};

const sliderUpdateHandler = () => {
  previewElement.style.filter = 'none';
  previewElement.className = '';
  effectLevelElement.value ='';
  if (chosenEffect === DEFAULT_EFFECT) {
    sliderElement.classList.add('hidden');
    sliderContainerElement.classList.add('hidden');
    return;
  }
  const sliderValue = sliderElement.noUiSlider.get();
  previewElement.style.filter = `${chosenEffect.filterName}(${sliderValue}${chosenEffect.unit})`;
  previewElement.className = `${chosenEffect.className}`;
  effectLevelElement.value = sliderValue;
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

updateSlider();

uploadFormElement.addEventListener('change', formChangeHandler);
sliderElement.noUiSlider.on('update', sliderUpdateHandler);

export { resetEffects };
