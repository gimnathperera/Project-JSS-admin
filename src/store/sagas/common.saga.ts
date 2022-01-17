import { put, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';

import {
  SET_LOADING,
  UNSET_LOADING,
  START_LOADING,
  END_LOADING,
} from '../../constants/common-constant';

export function* startLoading() {
  try {
    yield put({ type: START_LOADING });
  } catch (error) {}
}
export function* stopLoading() {
  try {
    yield put({ type: END_LOADING });
  } catch (error) {}
}

function* commonSaga() {
  yield takeEvery(SET_LOADING, startLoading);
  yield takeEvery(UNSET_LOADING, stopLoading);
}

export default commonSaga;
