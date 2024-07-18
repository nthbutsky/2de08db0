import axios from 'axios';

export const apiHttpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
