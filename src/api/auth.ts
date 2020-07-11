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