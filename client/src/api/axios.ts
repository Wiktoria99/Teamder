import axios from 'axios';
import { URL } from '@/constants';

export const axiosInstance = axios.create({
  baseURL: URL.main,
});
