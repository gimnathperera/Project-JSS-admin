import { put, call, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';

import {
  FETCH_WORKER_LIST,
  START_LOADING,
  END_LOADING,
  SET_ERROR_MESSAGE,
  SET_WORKER_LIST,
  DELETE_WORKER,
  ADD_WORKER
} from '../../constants/common-constant';
import { fetchWorkerListApi, createWokerApi } from '../../apis/worker.api';

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

export function* deleteWorker({
  payload
}: {
  type: typeof DELETE_WORKER;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    // const Sprint = yield call(deleteSprintApi, payload);

    // if(Sprint?.id === undefined){
    //   const message = 'Project succesfully deleted';
    //   yield put({ type: SET_SUCCESS_MESSAGE, payload: message });

    //   const projects = yield call(fetchProjectBreakdownApi);
    //   yield put({ type: SET_PROJECTS, payload: projects });
    // }else {
    //   const message = 'there is an error when deleting the Project';
    //   yield put({ type: SET_ERROR_MESSAGE, payload: message });
    // }

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
function* workerSaga() {
  yield takeEvery(FETCH_WORKER_LIST, fetchWorkerList);
  yield takeEvery(DELETE_WORKER, deleteWorker);
  yield takeEvery(ADD_WORKER, createWorker);
}

export default workerSaga;
