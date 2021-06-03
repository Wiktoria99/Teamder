import { axiosInstance as axios } from '@/api';
import { AxiosResponse } from 'axios';
import { CreateTeamI, CreateTeamResponseI, TeamI } from '@/interfaces';
import { axiosAuthorizedConfig } from '@/api';
import { axiosUnauthorizedConfig } from './config';

export const getTeams = () => {
  const token = localStorage.getItem('token');
  const response: Promise<AxiosResponse<TeamI[]>> = axios.get(
    '/teams',
    axiosAuthorizedConfig(token!) || axiosUnauthorizedConfig,
  );
  return response;
};

export const getTeamToJoin = (id: string) => {
  const token = localStorage.getItem('token');
  const response: Promise<AxiosResponse<TeamI>> = axios.get(
    '/team_by_ID/' + id,
    axiosAuthorizedConfig(token!) || axiosUnauthorizedConfig,
  );
  return response;
};

export const createNewTeam = (data: CreateTeamI) => {
  const token = localStorage.getItem('token');
  const response: Promise<AxiosResponse<CreateTeamResponseI>> = axios.post(
    '/teams',
    data,
    axiosAuthorizedConfig(token!) || axiosUnauthorizedConfig,
  );
  return response;
};
