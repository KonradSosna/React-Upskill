import axios from 'axios';

const baseURL = 'http://localhost:3001';

export const newAxios = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
