import { axiosInstance as axios } from '@/api';
import { AxiosResponse } from 'axios';
import {
  EditI,
  EditResponseI,
  MyTeamProfilesRequestI,
  ProfileI,
} from '@/interfaces';
import { axiosAuthorizedConfig } from '@/api';
import { axiosUnauthorizedConfig } from './config';

export const getMyProfile = () => {
  const token = localStorage.getItem('token');
  const response: Promise<AxiosResponse<ProfileI>> = axios.get(
    '/my_profile',
    axiosAuthorizedConfig(token!) || axiosUnauthorizedConfig,
  );
  return response;
};

export const getMyTeamProfiles = (data: MyTeamProfilesRequestI) => {
  const token = localStorage.getItem('token');
  const response: Promise<AxiosResponse<{ users_info: ProfileI[] }>> =
    axios.post(
      '/get_infos_by_list_of_usersID',
      data,
      axiosAuthorizedConfig(token!) || axiosUnauthorizedConfig,
    );
  return response;
};

export const editMyProfile = (data: EditI) => {
  const token = localStorage.getItem('token');
  const response: Promise<AxiosResponse<EditResponseI>> = axios.post(
    '/my_profile',
    data,
    axiosAuthorizedConfig(token!) || axiosUnauthorizedConfig,
  );
  return response;
};
