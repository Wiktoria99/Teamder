import { axiosInstance as axios } from '@/api';
import { AxiosResponse } from 'axios';
import { InterestI } from '@/interfaces';
import { axiosAuthorizedConfig } from '@/api';
import { axiosUnauthorizedConfig } from './config';

export const getInterests = () => {
  const token = localStorage.getItem('token');
  const response: Promise<AxiosResponse<InterestI[]>> = axios.get(
    '/interests',
    axiosAuthorizedConfig(token!) || axiosUnauthorizedConfig,
  );
  return response;
};
