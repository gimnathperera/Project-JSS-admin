import { ReactNode } from 'react';

import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import HailIcon from '@mui/icons-material/Hail';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import BuildTwoToneIcon from '@mui/icons-material/BuildTwoTone';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: '',
    items: [
      {
        name: 'Overview',
        link: '/dashboards/crypto',
        icon: DesignServicesTwoToneIcon
      }
    ]
  },
  {
    heading: 'Dashboards',
    items: [
      {
        name: 'Jobs',
        link: '/components/accordions',
        icon: BusinessCenterTwoToneIcon
      }
    ]
  },
  {
    heading: 'Management',
    items: [
      {
        name: 'Worker Requests',
        icon: WorkTwoToneIcon,
        link: '/management/transactions'
      },
      {
        name: 'Workers',
        icon: HailIcon,
        link: '/dashboards/create-worker'
      },
      {
        name: 'Customers',
        icon: SupervisedUserCircleIcon,
        link: '/management/profile/settings'
      }
    ]
  },
  {
    heading: 'Records',
    items: [
      {
        name: 'Reports',
        icon: AssessmentTwoToneIcon,
        link: '/components/modals'
      },
      {
        name: 'Inventory',
        icon: BuildTwoToneIcon,
        link: '/components/buttons'
      }
    ]
  }
];

export default menuItems;
