import { SET_JOB_LIST, SET_CURRENT_JOB } from '../../constants/common-constant';

const INITIAL_STATE = {
  list: [],
  currentJob: {}
};

const jobReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_JOB_LIST:
      return {
        ...state,
        list: action.payload
      };
    case SET_CURRENT_JOB:
      return {
        ...state,
        currentJob: action.payload
      };

    default:
      return state;
  }
};

export default jobReducer;
