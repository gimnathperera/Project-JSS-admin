import { SET_JOB_WOKER_LIST } from '../../constants/common-constant';

const INITIAL_STATE = {
  list: [],
  currentJobWorker: {}
};

const jobWorkerReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_JOB_WOKER_LIST:
      return {
        ...state,
        list: action.payload
      };

    default:
      return state;
  }
};

export default jobWorkerReducer;
