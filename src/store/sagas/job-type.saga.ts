import { put, call, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';

import {
  START_LOADING,
  END_LOADING,
  SET_ERROR_MESSAGE,
  FETCH_JOBTYPE_LIST,
  SET_JOBTYPE_LIST,
  FETCH_JOBTYPE_BY_ID,
  SET_CURRENT_JOBTYPE_SITE,
  SET_SUCCESS_MESSAGE
} from '../../constants/common-constant';
import {
  fetchJobTypeListApi,
  fetchJobTypeByIdApi,
} from '../../apis/job-type.api';

export function* fetchJobType({
  payload
}: {
  type: typeof FETCH_JOBTYPE_LIST;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(fetchJobTypeListApi, payload);

    yield put({ type: SET_JOBTYPE_LIST, payload: response.data.data });

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}

export function* fetchJobTypeId({
  payload
}: {
  type: typeof FETCH_JOBTYPE_BY_ID;
  payload: any;
}): any {
  try {
    yield put({ type: SET_CURRENT_JOBTYPE_SITE, payload: {} });

    yield put({ type: START_LOADING });

    const response = yield call(fetchJobTypeByIdApi, payload);

    yield put({
      type: SET_CURRENT_JOBTYPE_SITE,
      payload: response?.data?.data
    });

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}