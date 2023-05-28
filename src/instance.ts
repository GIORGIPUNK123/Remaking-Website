import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://geolab-project-backend.onrender.com',
});

axiosInstance.interceptors.request.use(async (request) => {
  request.headers!.Mushaobs = 'Martla mushaobs';
  return request;
});
