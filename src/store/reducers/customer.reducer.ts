import {
  SET_CUSTOMER_LIST,
  SET_CURRENT_CUSTOMER
} from '../../constants/common-constant';

const INITIAL_STATE = {
  list: [],
  currentCustomer: {}
};

const customerReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_CUSTOMER_LIST:
      return {
        ...state,
        list: action.payload
      };
    case SET_CURRENT_CUSTOMER:
      return {
        ...state,
        currentWorker: action.payload
      };

    default:
      return state;
  }
};

export default customerReducer;
