import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const Login = Loader(lazy(() => import('src/content/Login')));

// Dashboards
const Dashboard = Loader(lazy(() => import('src/content/Dashboard')));

// Applications
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const Jobs = Loader(lazy(() => import('src/content/applications/Jobs')));
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);
const Worker = Loader(lazy(() => import('src/content/applications/Workers')));
const WorkerDetailed = Loader(
  lazy(() => import('src/content/applications/Workers/WorkerDetailedPage'))
);
const CustomerCreate = Loader(
  lazy(() => import('src/content/applications/Customers'))
);
const JobCreate = Loader(
  lazy(() => import('src/content/applications/Jobs/CreateJob'))
);

// Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes: any = (isAuthenticated) => [
  {
    path: '/',
    element: !isAuthenticated ? (
      <BaseLayout />
    ) : (
      <Navigate to="/app/dashboard" />
    ),
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '/',
        element: <Navigate to="/login" />
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: '/app',
    element: isAuthenticated ? <SidebarLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: '/',
        element: <Navigate to="/app/dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'worker',
        element: <Worker />
      },
      {
        path: 'worker/:id',
        element: <WorkerDetailed />
      },
      {
        path: 'create-customer',
        element: <CustomerCreate />
      },
      {
        path: 'create-job',
        element: <JobCreate />
      },
      {
        path: 'woker-requests',
        element: <Transactions />
      },
      {
        path: 'jobs',
        element: <Jobs />
      },
      {
        path: 'profile',
        children: [
          {
            path: '/',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  }
];
export default routes;
