import { RouteProps } from 'react-router-dom';
import {
  Login,
  Register,
  ForgotPassword,
  CreateTeam,
  Notifications,
  MyProfile,
  MyTeams,
  MyArchivedTeams,
  SuggestionsAll,
  JoinTeam,
  TeamPage,
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
    path: paths.MY_TEAM,
    component: TeamPage,
  },
  {
    path: paths.MY_ARCHIVED_TEAMS,
    component: MyArchivedTeams,
  },
  {
    path: paths.MY_PROFILE,
    component: MyProfile,
  },
  {
    path: paths.SUGGESTIONS,
    component: SuggestionsAll,
  },
  {
    path: paths.JOINTEAM,
    component: JoinTeam,
  },
];
