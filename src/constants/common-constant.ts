//common actions
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const SET_LOADING = 'SET_LOADING';
export const SUCCESS_OPEN = 'SUCCESS_OPEN';
export const SUCCESS_CLOSE = 'SUCCESS_CLOSE';
export const ERROR_OPEN = 'ERROR_OPEN';
export const ERROR_CLOSE = 'ERROR_CLOSE';
export const UNSET_LOADING = 'UNSET_LOADING';
export const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const CLEAR_REDUX_STORE = 'CLEAR_REDUX_STORE';
export const FETCH_DASHBOARD_DATA = 'FETCH_DASHBOARD_DATA';
export const SET_DASHBOARD_DATA = 'SET_DASHBOARD_DATA';

//auth actions
export const USER_LOGIN = 'USER_LOGIN';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

//worker actions
export const ADD_WORKER = 'ADD_WORKER';
export const FETCH_WORKER_LIST = 'FETCH_WORKER_LIST';
export const FETCH_AVAILABLE_WORKER_LIST = 'FETCH_AVAILABLE_WORKER_LIST';
export const SET_AVAILABLE_WORKER_LIST = 'SET_AVAILABLE_WORKER_LIST';
export const SET_WORKER_LIST = 'SET_WORKER_LIST';
export const FETCH_WORKER_BY_ID = 'FETCH_WORKER_BY_ID';
export const SET_CURRENT_WORKER = 'SET_CURRENT_WORKER';
export const DELETE_WORKER = 'DELETE_WORKER';
export const UPDATE_WORKER = 'UPDATE_WORKER';

//company actions
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const FETCH_CUSTOMER_LIST = 'FETCH_CUSTOMER_LIST';
export const SET_CUSTOMER_LIST = 'SET_CUSTOMER_LIST';
export const FETCH_CUSTOMER_BY_ID = 'FETCH_CUSTOMER_BY_ID';
export const SET_CURRENT_CUSTOMER = 'SET_CURRENT_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';

//company list actions
export const ADD_COMPANY_SITE = 'ADD_COMPANY_SITE';
export const FETCH_COMPANY_SITE_LIST = 'FETCH_COMPANY_SITE_LIST';
export const SET_COMPANY_SITE_LIST = 'SET_COMPANY_SITE_LIST';
export const FETCH_COMPANY_SITE_BY_ID = 'FETCH_COMPANY_SITE_BY_ID';
export const SET_CURRENT_COMPANY_SITE = 'SET_CURRENT_COMPANY_SITE';
export const DELETE_COMPANY_SITE = 'DELETE_COMPANY_SITE';
export const UPDATE_COMPANY_SITE = 'UPDATE_COMPANY_SITE';

//job actions
export const ADD_JOB = 'ADD_JOB';
export const FETCH_JOB_LIST = 'FETCH_JOB_LIST';
export const SET_JOB_LIST = 'SET_JOB_LIST';
export const FETCH_JOB_BY_ID = 'FETCH_JOB_BY_ID';
export const SET_CURRENT_JOB = 'SET_CURRENT_JOB';
export const UPDATE_JOB = 'UPDATE_JOB';

//job-worker actions
export const FETCH_JOB_WOKER_LIST = 'FETCH_JOB_WOKER_LIST';
export const SET_JOB_WOKER_LIST = 'SET_JOB_WOKER_LIST';
export const ADD_JOB_WORKER = 'ADD_JOB_WORKER';
export const FETCH_LATEST_JOBS_BY_WORKER = 'FETCH_LATEST_JOBS_BY_WORKER';
export const SET_LATEST_JOBS_BY_WORKER = 'SET_LATEST_JOBS_BY_WORKER';

// message actions
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const FETCH_WORKER_MESSAGES = 'FETCH_WORKER_MESSAGES';
export const SET_WORKER_MESSAGES = 'SET_WORKER_MESSAGES';
export const SEND_NOTIFICATION = 'SEND_NOTIFICATION';
export const SEND_TO_DO = 'SEND_TO_DO';
