import { put, call, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';

import {
  START_LOADING,
  END_LOADING,
  SET_ERROR_MESSAGE,
  FETCH_CUSTOMER_LIST,
  SET_CUSTOMER_LIST,
  FETCH_CUSTOMER_BY_ID,
  SET_CURRENT_CUSTOMER,
  DELETE_CUSTOMER,
  ADD_CUSTOMER,
  UPDATE_CUSTOMER
} from '../../constants/common-constant';
import {
  fetchCustomerListApi,
  fetchCustomerByIdApi,
  deleteCustomerApi,
  createCustomerApi,
  updateCustomerApi
} from '../../apis/customer.api';

export function* fetchCustomerList(): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(fetchCustomerListApi);

    yield put({ type: SET_CUSTOMER_LIST, payload: response.data.data });

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}

export function* fetchCustomerById({
  payload
}: {
  type: typeof FETCH_CUSTOMER_BY_ID;
  payload: any;
}): any {
  try {
    yield put({ type: SET_CURRENT_CUSTOMER, payload: {} });

    yield put({ type: START_LOADING });

    const response = yield call(fetchCustomerByIdApi, payload);

    yield put({ type: SET_CURRENT_CUSTOMER, payload: response?.data?.data });

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}

export function* deleteCustomer({
  payload
}: {
  type: typeof DELETE_CUSTOMER;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const result = yield call(deleteCustomerApi, payload);
    if (result.data) {
      yield put({ type: FETCH_CUSTOMER_LIST });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Worker delete failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

export function* createCustomer({
  payload
}: {
  type: typeof ADD_CUSTOMER;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const newWorker = yield call(createCustomerApi, payload);

    if (newWorker.data) {
      yield put({ type: FETCH_CUSTOMER_LIST });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Worker add failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

export function* updateCustomer({
  payload
}: {
  type: typeof UPDATE_CUSTOMER;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(updateCustomerApi, payload);

    yield put({ type: SET_CURRENT_CUSTOMER, payload: response.data.data });

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Customer add failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

function* customerSaga() {
  yield takeEvery(FETCH_CUSTOMER_LIST, fetchCustomerList);
  yield takeEvery(FETCH_CUSTOMER_BY_ID, fetchCustomerById);
  yield takeEvery(DELETE_CUSTOMER, deleteCustomer);
  yield takeEvery(ADD_CUSTOMER, createCustomer);
  yield takeEvery(UPDATE_CUSTOMER, updateCustomer);
}

export default customerSaga;
