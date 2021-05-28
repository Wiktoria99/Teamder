import { axiosInstance as axios } from '@/api';
import { AxiosResponse } from 'axios';
import { TeamI } from '@/interfaces';
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
