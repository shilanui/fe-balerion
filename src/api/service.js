import axios from 'axios';

let axiosIntance = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  headers: {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 30000,
});

axiosIntance.interceptors.request.use(
  (config) => {
    if (config.overrideHeader !== null) {
      config.headers = {
        ...config.headers,
        ...config.overrideHeader,
      };
    }

    const token = sessionStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosIntance;
