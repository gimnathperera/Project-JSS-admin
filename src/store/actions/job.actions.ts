import {
  FETCH_JOB_LIST,
  ADD_JOB,
  FETCH_JOB_BY_ID,
  UPDATE_JOB,
  FETCH_JOB_WOKER_LIST
} from '../../constants/common-constant';

export const fetchJobList = () => ({
  type: FETCH_JOB_LIST
});

export const createJob = (payload: any) => ({
  type: ADD_JOB,
  payload: payload
});

export const updateJob = (payload: any) => ({
  type: UPDATE_JOB,
  payload: payload
});

export const fetchJobById = (payload: any) => ({
  type: FETCH_JOB_BY_ID,
  payload: payload
});

export const fetchJobWorkerList = (payload: any) => ({
  type: FETCH_JOB_WOKER_LIST,
  payload: payload
});
