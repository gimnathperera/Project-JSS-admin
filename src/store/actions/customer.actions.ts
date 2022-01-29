import {
  FETCH_CUSTOMER_LIST,
  ADD_CUSTOMER,
  FETCH_CUSTOMER_BY_ID,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER
} from '../../constants/common-constant';

export const fetchCustomerList = () => ({
  type: FETCH_CUSTOMER_LIST
});

export const createCustomer = (payload: any) => ({
  type: ADD_CUSTOMER,
  payload: payload
});

export const deleteCustomer = (payload: any) => ({
  type: DELETE_CUSTOMER,
  payload: payload
});

export const updateCustomer = (payload: any) => ({
  type: UPDATE_CUSTOMER,
  payload: payload
});

export const fetchCustomerById = (payload: any) => ({
  type: FETCH_CUSTOMER_BY_ID,
  payload: payload
});
