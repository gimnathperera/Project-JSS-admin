import {
  SET_SUCCESS_MESSAGE,
  SET_ERROR_MESSAGE,
  CLEAR_REDUX_STORE,
  SET_LOADING,
  UNSET_LOADING
} from './../../constants/common-constant';

export const setSuccessMessage = (payload) => {
  return {
    type: SET_SUCCESS_MESSAGE,
    payload
  };
};

export const setErrorMessage = (payload) => {
  return {
    type: SET_ERROR_MESSAGE,
    payload
  };
};

export const clearReduxStore = () => {
  return {
    type: CLEAR_REDUX_STORE
  };
};

export function startLoading() {
  return {
    type: SET_LOADING
  };
}

export function endLoading() {
  return {
    type: UNSET_LOADING
  };
}
