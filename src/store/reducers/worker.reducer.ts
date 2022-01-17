import { SET_WORKER_LIST } from '../../constants/common-constant';

const INITIAL_STATE = {
  list: []
};

const workerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_WORKER_LIST:
      return {
        ...state,
        list: action.payload
      };

    default:
      return state;
  }
};

export default workerReducer;
