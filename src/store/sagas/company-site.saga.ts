import { put, call, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';

import {
  START_LOADING,
  END_LOADING,
  SET_ERROR_MESSAGE,
  FETCH_COMPANY_SITE_LIST,
  SET_COMPANY_SITE_LIST,
  FETCH_COMPANY_SITE_BY_ID,
  SET_CURRENT_COMPANY_SITE,
  DELETE_COMPANY_SITE,
  ADD_COMPANY_SITE,
  UPDATE_COMPANY_SITE
} from '../../constants/common-constant';
import {
  fetchCompanySiteListApi,
  fetchCompanySiteByIdApi,
  deleteCompanySiteApi,
  createCompanySiteApi,
  updateCompanySiteApi
} from '../../apis/company-site.api';

export function* fetchCompanySite(): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(fetchCompanySiteListApi);

    yield put({ type: SET_COMPANY_SITE_LIST, payload: response.data.data });

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}

export function* fetchCompanySiteById({
  payload
}: {
  type: typeof FETCH_COMPANY_SITE_BY_ID;
  payload: any;
}): any {
  try {
    yield put({ type: SET_CURRENT_COMPANY_SITE, payload: {} });

    yield put({ type: START_LOADING });

    const response = yield call(fetchCompanySiteByIdApi, payload);

    yield put({
      type: SET_CURRENT_COMPANY_SITE,
      payload: response?.data?.data
    });

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}

export function* deleteCompanySite({
  payload
}: {
  type: typeof DELETE_COMPANY_SITE;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const result = yield call(deleteCompanySiteApi, payload);
    if (result.data) {
      yield put({ type: FETCH_COMPANY_SITE_LIST });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Worker delete failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

export function* createCompanySite({
  payload
}: {
  type: typeof ADD_COMPANY_SITE;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const newWorker = yield call(createCompanySiteApi, payload);

    if (newWorker.data) {
      yield put({ type: FETCH_COMPANY_SITE_LIST });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Worker add failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

export function* updateCompanySite({
  payload
}: {
  type: typeof UPDATE_COMPANY_SITE;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(updateCompanySiteApi, payload);

    yield put({ type: SET_CURRENT_COMPANY_SITE, payload: response.data.data });

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Customer add failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

function* companySiteSaga() {
  yield takeEvery(FETCH_COMPANY_SITE_LIST, fetchCompanySite);
  yield takeEvery(FETCH_COMPANY_SITE_BY_ID, fetchCompanySiteById);
  yield takeEvery(DELETE_COMPANY_SITE, deleteCompanySite);
  yield takeEvery(ADD_COMPANY_SITE, createCompanySite);
  yield takeEvery(UPDATE_COMPANY_SITE, updateCompanySite);
}

export default companySiteSaga;
