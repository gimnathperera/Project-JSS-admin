import {
  FETCH_JOB_LIST,
  ADD_JOB,
  FETCH_JOB_BY_ID,
  UPDATE_JOB,
  FETCH_JOB_WOKER_LIST,
  ADD_JOB_WORKER,
  FETCH_LATEST_JOBS_BY_WORKER,
  FETCH_WORKERPLAN_LIST,
  ADD_WORKER_PLAN,
    DELETE_JOB
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

export const deleteJob = (payload: any) => ({
  type: DELETE_JOB,
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

export const createJobWorkers = (payload: any) => ({
  type: ADD_JOB_WORKER,
  payload: payload
});

export const fetchLatestJobsByWorker = (payload: any) => ({
  type: FETCH_LATEST_JOBS_BY_WORKER,
  payload: payload
});

export const fetchWorkerPlanList = (payload: any) => ({
  type: FETCH_WORKERPLAN_LIST,
  payload: payload
});

export const createWorkerPlan = (payload: any) => ({
  type: ADD_WORKER_PLAN,
  payload: payload
});
