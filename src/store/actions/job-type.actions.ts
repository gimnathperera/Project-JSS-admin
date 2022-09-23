import {
    FETCH_JOBTYPE_LIST,
    FETCH_JOBTYPE_BY_ID
    
  } from '../../constants/common-constant';

  export const fetchJobTypeList = (payload: any) => ({
    type: FETCH_JOBTYPE_LIST,
    payload: payload
  });

  export const fetchJobTypeById = (payload: any) => ({
    type: FETCH_JOBTYPE_BY_ID,
    payload: payload
  });