import { RouteProps } from 'react-router-dom';
import { Login, Register, ForgotPassword } from '@/pages';
import { paths } from './paths';

export const unauthorizedRoutes: RouteProps[] = [
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
];
