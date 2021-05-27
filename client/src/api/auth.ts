import { axiosInstance as axios } from '@/api';
import { AxiosResponse } from 'axios';
import {
  LoginRequestI,
  LoginResponseI,
  LogoutRequestI,
  RegisterRequestI,
  RegisterResponseI,
} from '@/interfaces';
import { axiosUnauthorizedConfig, axiosAuthorizedConfig } from '@/api';

export const login = (data: LoginRequestI) => {
  const response: Promise<AxiosResponse<LoginResponseI>> = axios.post(
    '/login',
    data,
    axiosUnauthorizedConfig,
  );
  return response;
};

export const logout = (data: LogoutRequestI, idToken: string) => {
  const response: Promise<AxiosResponse> = axios.post(
    '/accounts/signout/',
    data,
    axiosAuthorizedConfig(idToken),
  );
  return response;
};

export const register = (data: RegisterRequestI) => {
  const response: Promise<AxiosResponse<RegisterResponseI>> = axios.post(
    '/register',
    data,
  );
  return response;
};

export const forgotPassword = (data: { username: string; email: string }) => {
  const response: Promise<AxiosResponse<{ message: string }>> = axios.post(
    `/accounts/forgot_password`,
    data,
    axiosUnauthorizedConfig,
  );
  return response;
};
