const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pags.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log('Результат', data);
    // });
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        // onFail('Не удалось отправить форму. Попробуйте ещё раз');
        onFail();
      }
    })
    .catch(() => {
      // onFail('Не удалось отправить форму. Попробуйте ещё раз');
      onFail();
    });
};

export {getData, sendData};
