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
        link: '/app/overview',
        icon: DesignServicesTwoToneIcon
      }
    ]
  },
  {
    heading: 'Dashboard',
    items: [
      {
        name: 'Jobs',
        link: '/app/job',
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
        link: '/app/woker-requests'
      },
      {
        name: 'Workers',
        icon: HailIcon,
        link: '/app/worker'
      },
      {
        name: 'Customers',
        icon: SupervisedUserCircleIcon,
        link: '/app/customer'
      }
    ]
  },
  {
    heading: 'Records',
    items: [
      {
        name: 'Reports',
        icon: AssessmentTwoToneIcon,
        link: '/app/report'
      },
      {
        name: 'Inventory',
        icon: BuildTwoToneIcon,
        link: '/app/inventory'
      }
    ]
  }
];

export default menuItems;
