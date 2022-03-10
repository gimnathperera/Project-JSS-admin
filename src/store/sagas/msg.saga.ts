import { put, call, takeEvery } from 'redux-saga/effects';

import {
  START_LOADING,
  END_LOADING,
  SET_ERROR_MESSAGE,
  SEND_MESSAGE,
  SET_SUCCESS_MESSAGE
} from '../../constants/common-constant';
import { sendMessageApi } from '../../apis/msg.api';

export function* sendMessage({
  payload
}: {
  type: typeof SEND_MESSAGE;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const newWorker = yield call(sendMessageApi, payload);

    if (newWorker.data) {
      const message = 'Message sent successfully';
      yield put({ type: SET_SUCCESS_MESSAGE, payload: message });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Message sending failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

function* msgSaga() {
  yield takeEvery(SEND_MESSAGE, sendMessage);
}

export default msgSaga;
