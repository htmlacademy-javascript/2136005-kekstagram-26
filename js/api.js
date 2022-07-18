const GET_REMOTE_WEBSERVER = 'https://26.javascript.pages.academy/kekstagram/data';
const POST_REMOTE_WEBSERVER = 'https://26.javascript.pages.academy/kekstagram';
const ERROR_MESSAGE = 'Не удалось загрузить фотографии';

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(GET_REMOTE_WEBSERVER);
    if (!response.ok) {
      throw new Error(ERROR_MESSAGE);
    }

    const offers = await response.json();
    onSuccess(offers);
  } catch (e) {
    onFail(ERROR_MESSAGE);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      POST_REMOTE_WEBSERVER,
      {
        method: 'POST',
        body,
      },
    );
    if (!response.ok) {
      throw new Error();
    }
    onSuccess();
  } catch (error) {
    onFail();
  }
};

export {getData, sendData};
