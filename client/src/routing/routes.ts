import { RouteProps } from 'react-router-dom';
import {
  Login,
  Register,
  ForgotPassword,
  CreateTeam,
  Notifications,
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
];