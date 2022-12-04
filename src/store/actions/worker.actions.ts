import {
  FETCH_WORKER_LIST,
  FETCH_AVAILABLE_WORKER_LIST,
  FETCH_WORKER_BY_ID,
  ADD_WORKER,
  DELETE_WORKER,
  UPDATE_WORKER
} from '../../constants/common-constant';

export const fetchWorkerList = () => ({
  type: FETCH_WORKER_LIST
});

export const fetchAvailableWorkerList = ({jobId: any, plan: boolean = false}) => ({
  type: FETCH_AVAILABLE_WORKER_LIST,
  payload: {jobId:any, plan:boolean}
});

export const createWorker = (payload: any) => ({
  type: ADD_WORKER,
  payload: payload
});

export const deleteWorker = (payload: any) => ({
  type: DELETE_WORKER,
  payload: payload
});

export const updateWorker = (payload: any) => ({
  type: UPDATE_WORKER,
  payload: payload
});

export const fetchUserById = (payload: any) => ({
  type: FETCH_WORKER_BY_ID,
  payload: payload
});
