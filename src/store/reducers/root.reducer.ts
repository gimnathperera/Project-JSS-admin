import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { CLEAR_REDUX_STORE } from '../../constants/common-constant';

import commonReducer from './common.reducer';
import authReducer from './auth.reducer';
import workerReducer from './worker.reducer';
import customerReducer from './customer.reducer';
import companySiteReducer from './company-site.reducer';
import jobReducer from './job.reducer';
import jobWorkerReducer from './job-worker.reducer';
import workerPlanReducer from './worker-plan.reducer';
import dashboardReducer from './dashboard.reducer';
import dailyJobReducer from './daily-job.reducer';
import msgReducer from './msg.reducer';
import reportReducer from './report.reducer';
import jobTypeReducer from "./job-type.reducer";

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [
    'common',
    'worker',
    'customer',
    'companySite',
    'job',
    'jobWorker',
    'jobType',
    'dashboard',
    'dailyJob',
    'msg',
    'report'
  ]
};

const appReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
  worker: workerReducer,
  customer: customerReducer,
  companySite: companySiteReducer,
  job: jobReducer,
  jobType: jobTypeReducer,
  jobWorker: jobWorkerReducer,
  workerPlan: workerPlanReducer,
  dashboard: dashboardReducer,
  dailyJob: dailyJobReducer,
  msg: msgReducer,
  report: reportReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === CLEAR_REDUX_STORE) {
    state = undefined;
    storage.removeItem('persist:root');
  }

  return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);
