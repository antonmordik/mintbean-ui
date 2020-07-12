import axios from './axios';
import User from '../interfaces/User';

export const fetchMe = async (): Promise<{ user: User }> => {
  const token = localStorage.getItem('app:token');
  return axios.get('/me', {
    headers: {
      'Authorization': token
    }
  });
};

export const login = async (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  return axios.post('/signin', {
    email,
    password
  });
};

export const register = async (
  email: string,
  password: string,
  nickname: string
): Promise<{ user: User; token: string }> => {
  return axios.post('/signup', {
    email,
    password,
    nickname
  });
};