import { put, takeEvery, call } from 'redux-saga/effects';

import _ from 'lodash';

import {
  SET_LOADING,
  UNSET_LOADING,
  SET_ERROR_MESSAGE,
  START_LOADING,
  END_LOADING,
  SET_DASHBOARD_DATA,
  FETCH_DASHBOARD_DATA
} from '../../constants/common-constant';
import { fetchDashboardDataApi } from 'src/apis/job.api';

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

export function* fetchDashboardData(): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(fetchDashboardDataApi);

    if (response?.data) {
      const {
        activeWorkersCount,
        companySiteCount,
        completedJobsCount,
        jobsCount,
        todayJobsCount,
        workersCount
      } = response?.data?.data;
      yield put({
        type: SET_DASHBOARD_DATA,
        payload: {
          activeWorkersCount,
          companySiteCount,
          completedJobsCount,
          jobsCount,
          todayJobsCount,
          workersCount
        }
      });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}

function* commonSaga() {
  yield takeEvery(SET_LOADING, startLoading);
  yield takeEvery(UNSET_LOADING, stopLoading);
  yield takeEvery(FETCH_DASHBOARD_DATA, fetchDashboardData);
}

export default commonSaga;
