import { all } from 'redux-saga/effects';

import AuthSaga from './auth.saga';
import CommonSaga from './common.saga';
import WorkerSaga from './worker.saga';
import CustomererSaga from './customer.saga';
import CompanySiteSaga from './company-site.saga';
import JobSaga from './job.saga';

export default function* rootSaga() {
  yield all([
    AuthSaga(),
    CommonSaga(),
    WorkerSaga(),
    CustomererSaga(),
    CompanySiteSaga(),
    JobSaga()
  ]);
}
