import { RouteProps } from 'react-router-dom';
import {
  Login,
  Register,
  ForgotPassword,
  CreateTeam,
  Notifications,
  MyProfile,
  MyTeams,
} from '@/pages';
import { paths } from './paths';

export const routes: RouteProps[] = [
  {
    path: paths.LOGIN,
    component: Login,
  },
  {
    path: paths.REGISTER,
    component: Register,
  },
  {
    path: paths.FORGOT_PASSWORD,
    component: ForgotPassword,
  },
  {
    path: paths.CREATE_TEAM,
    component: CreateTeam,
  },
  {
    path: paths.NOTIFICATIONS,
    component: Notifications,
  },
  {
    path: paths.MY_TEAMS,
    component: MyTeams,
  },
  {
    path: paths.MY_PROFILE,
    component: MyProfile,
  },
];
