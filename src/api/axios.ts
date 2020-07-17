import axios, { AxiosInstance } from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

instance.interceptors.response.use((res) => {
  if (!res.data) {
    throw new Error('Server error.');
  }
  return res.data;
});

export default instance as AxiosInstance;
