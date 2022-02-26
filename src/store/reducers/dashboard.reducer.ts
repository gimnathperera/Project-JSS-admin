import { SET_DASHBOARD_DATA } from '../../constants/common-constant';

const INITIAL_STATE = {
  jobsCount: null,
  todayJobsCount: null,
  completedJobsCount: null,
  companySiteCount: null,
  workersCount: null,
  activeWorkersCount: null
};

const dashboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DASHBOARD_DATA:
      return {
        ...state,
        jobsCount: action?.payload?.jobsCount,
        todayJobsCount: action?.payload?.todayJobsCount,
        completedJobsCount: action?.payload?.completedJobsCount,
        companySiteCount: action?.payload?.companySiteCount,
        workersCount: action?.payload?.workersCount,
        activeWorkersCount: action?.payload?.activeWorkersCount
      };

    default:
      return state;
  }
};

export default dashboardReducer;
