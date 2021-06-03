import { axiosInstance as axios } from '@/api';
import { AxiosResponse } from 'axios';
import { ProfileI } from '@/interfaces';
import { axiosAuthorizedConfig } from '@/api';
import { axiosUnauthorizedConfig } from './config';

export const getUserInfo = () => {
  const token = localStorage.getItem('token');
  const response: Promise<AxiosResponse<ProfileI>> = axios.get(
    '/my_profile',
    axiosAuthorizedConfig(token!) || axiosUnauthorizedConfig,
  );
  return response;
};

