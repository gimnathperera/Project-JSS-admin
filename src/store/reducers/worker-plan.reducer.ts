import {
  SET_WORKERPLAN_LIST,
  } from '../../constants/common-constant';
  
  const INITIAL_STATE = {
    list: [],
    currentWorkerPlan: {},
    availableList: []
  };
  
  const workerPlanReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
      case SET_WORKERPLAN_LIST:
        return {
          ...state,
          list: action.payload
        };
      default:
        return state;
    }
  };
  
  export default workerPlanReducer;
  