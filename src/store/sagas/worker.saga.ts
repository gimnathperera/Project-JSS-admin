import { put, call, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';

import {
  FETCH_WORKER_LIST,
  FETCH_WORKER_BY_ID,
  START_LOADING,
  END_LOADING,
  SET_ERROR_MESSAGE,
  SET_WORKER_LIST,
  SET_CURRENT_WORKER,
  DELETE_WORKER,
  ADD_WORKER,
  UPDATE_WORKER
} from '../../constants/common-constant';
import {
  fetchWorkerListApi,
  fetchWorkerByIdApi,
  createWokerApi,
  deleteWorkerApi,
  updateWokerApi
} from '../../apis/worker.api';

export function* fetchWorkerList(): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(fetchWorkerListApi);

    yield put({ type: SET_WORKER_LIST, payload: response.data.data });

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}

export function* fetchWorkerById({
  payload
}: {
  type: typeof FETCH_WORKER_BY_ID;
  payload: any;
}): any {
  try {
    yield put({ type: SET_CURRENT_WORKER, payload: {} });

    yield put({ type: START_LOADING });

    const response = yield call(fetchWorkerByIdApi, payload);

    yield put({ type: SET_CURRENT_WORKER, payload: response?.data?.data });

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}

export function* deleteWorker({
  payload
}: {
  type: typeof DELETE_WORKER;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const result = yield call(deleteWorkerApi, payload);
    if (result.data) {
      yield put({ type: FETCH_WORKER_LIST });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Worker delete failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

export function* createWorker({
  payload
}: {
  type: typeof ADD_WORKER;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const newWorker = yield call(createWokerApi, payload);

    if (newWorker.data) {
      yield put({ type: FETCH_WORKER_LIST });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Worker add failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

export function* updateWorker({
  payload
}: {
  type: typeof UPDATE_WORKER;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(updateWokerApi, payload);

    yield put({ type: SET_CURRENT_WORKER, payload: response.data.data });

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Worker add failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

function* workerSaga() {
  yield takeEvery(FETCH_WORKER_LIST, fetchWorkerList);
  yield takeEvery(FETCH_WORKER_BY_ID, fetchWorkerById);
  yield takeEvery(DELETE_WORKER, deleteWorker);
  yield takeEvery(ADD_WORKER, createWorker);
  yield takeEvery(UPDATE_WORKER, updateWorker);
}

export default workerSaga;
