import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const Login = Loader(lazy(() => import('src/content/Login')));
const Dashboard = Loader(lazy(() => import('src/content/Dashboard')));
const Reports = Loader(lazy(() => import('src/content/applications/Reports')));
const Jobs = Loader(lazy(() => import('src/content/applications/Jobs')));
const JobDetailed = Loader(
  lazy(() => import('src/content/applications/Jobs/JobDetailedPage'))
);

const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const Customer = Loader(
  lazy(() => import('src/content/applications/Customers'))
);
const CustomerDetailed = Loader(
  lazy(() => import('src/content/applications/Customers/CustomerDetailedPage'))
);
const Worker = Loader(lazy(() => import('src/content/applications/Workers')));
const WorkerDetailed = Loader(
  lazy(() => import('src/content/applications/Workers/WorkerDetailedPage'))
);

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
        path: 'customer/:id',
        element: <CustomerDetailed />
      },
      {
        path: 'job',
        element: <Jobs />
      },
      {
        path: 'job/:id',
        element: <JobDetailed />
      },
      {
        path: 'profile',
        children: [
          {
            path: '/',
            // element: <Navigate to="details" replace />  untill the funcionlity is implemented
            element: <StatusComingSoon />
          },
          {
            path: 'details',
            element: <UserProfile />
          }
        ]
      },
      {
        path: 'customer',
        element: <Customer />
      },
      {
        path: 'woker-requests',
        // element: <Transactions /> untill the funcionlity is implemented
        element: <StatusComingSoon />
      },
      {
        path: 'report',
        // element: <Transactions /> untill the funcionlity is implemented
        element: <Reports />
      },
      {
        path: 'inventory',
        // element: <Transactions /> untill the funcionlity is implemented
        element: <StatusComingSoon />
      }
    ]
  }
];
export default routes;
