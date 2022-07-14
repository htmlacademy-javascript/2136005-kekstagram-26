const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch('https://26.javascript.pages.academy/kekstagram/data');
    if (!response.ok) {
      throw new Error('Не удалось загрузить фотографии');
    }

    const offers = await response.json();
    onSuccess(offers);
  } catch (e) {
    onFail('Не удалось загрузить фотографии');
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://26.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body,
      },
    );
    if (!response.ok) {
      throw new Error('Не удалось отправить форму. Попробуйте еще раз');
    }
    onSuccess();
  } catch (error) {
    onFail('Не удалось отправить форму. Попробуйте еще раз');
  }
};

export {getData, sendData};
