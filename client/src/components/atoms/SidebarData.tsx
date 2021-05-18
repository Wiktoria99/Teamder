import React from 'react';
import {
    HomeOutlined,
    GroupOutlined,
    EmailOutlined,
    PersonOutlined,
  } from '@material-ui/icons';
import { paths } from '@/routing';

export const SidebarData = [
    {
        title: 'Strona główna',
        path: paths.DASHBOARD,
        icon: <HomeOutlined fontSize="small"/>
    }, 
    {
        title: 'Moje zespoły',
        path: paths.MY_TEAMS,
        icon: <GroupOutlined fontSize="small"/>
    },
    {
        title: 'Powiadomienia',
        path: paths.NOTIFICATIONS,
        icon: <EmailOutlined fontSize="small"/>
    }, {
        title: 'Profil',
        path: paths.MY_PROFILE,
        icon: <PersonOutlined fontSize="small"/>
    }
]