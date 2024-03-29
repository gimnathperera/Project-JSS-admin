import { put, call, takeEvery } from 'redux-saga/effects';

import {
  START_LOADING,
  END_LOADING,
  SET_ERROR_MESSAGE,
  SEND_MESSAGE,
  FETCH_WORKER_MESSAGES,
  SET_WORKER_MESSAGES,
  SEND_NOTIFICATION,
  SEND_TO_DO,
  SET_SUCCESS_MESSAGE
} from '../../constants/common-constant';
import {
  sendMessageApi,
  fetchWorkerMessagesApi,
  sendNotificationApi,
  sendToDoApi
} from '../../apis/msg.api';

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
export function* sendToDo({
  payload
}: {
  type: typeof SEND_TO_DO;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const newWorker = yield call(sendToDoApi, payload);

    if (newWorker.data) {
      const message = 'To-Do sent successfully';
      yield put({ type: SET_SUCCESS_MESSAGE, payload: message });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'To-Do sending failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}
export function* sendNotification({
  payload
}: {
  type: typeof SEND_NOTIFICATION;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const newWorker = yield call(sendNotificationApi, payload);

    if (newWorker.data) {
      const message = 'Notification sent successfully';
      yield put({ type: SET_SUCCESS_MESSAGE, payload: message });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Notification sending failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}
export function* fetchWorkerMessages({
  payload
}: {
  type: typeof FETCH_WORKER_MESSAGES;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(fetchWorkerMessagesApi, payload);
    if (response?.data) {
      yield put({
        type: SET_WORKER_MESSAGES,
        payload: response?.data?.data
      });
    } else {
      yield put({
        type: SET_WORKER_MESSAGES,
        payload: []
      });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}
function* msgSaga() {
  yield takeEvery(SEND_MESSAGE, sendMessage);
  yield takeEvery(SEND_TO_DO, sendToDo);
  yield takeEvery(SEND_NOTIFICATION, sendNotification);
  yield takeEvery(FETCH_WORKER_MESSAGES, fetchWorkerMessages);
}

export default msgSaga;
