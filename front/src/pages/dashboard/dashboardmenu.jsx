import { RiDashboard2Fill } from 'react-icons/ri';
import { FaClipboardList } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";


import Profile from './dashboardPages/profile/profile';
import Cards from './dashboardPages/cards/cards';

export const DashboardMenu = [
    {
        title: 'profile',
        path: '/dashboard/profile',
        icon: <RiDashboard2Fill/>,
        page: <Profile/>,
    },
    {
        title: 'Cards',
        path: '/dashboard/cards',
        icon: <FaTasks/>,
        page: <Cards/>,
    },
];
