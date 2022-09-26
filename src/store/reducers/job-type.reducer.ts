import {
    SET_JOBTYPE_LIST,
    SET_CURRENT_JOBTYPE_SITE
  } from '../../constants/common-constant';
  
  const INITIAL_STATE = {
    list: [],
    currentJobType: {}
  };
  
  const JobTypeReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
      case SET_JOBTYPE_LIST:
        return {
          ...state,
          list: action.payload
        };
      case SET_CURRENT_JOBTYPE_SITE:
        return {
          ...state,
          currentJobType: action.payload
        };
  
      default:
        return state;
    }
  };
  
  export default JobTypeReducer;
  