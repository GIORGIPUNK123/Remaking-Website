import axios from 'axios';
import { ItemType, MacType } from '../types';
export const getMacs = async (amount?: number) => {
  return axios
    .get('http://localhost:3006/macs')
    .then((macs) => macs.data)
    .then((data: MacType[]) => data);
};
export const getGeneralItems = async () => {
  return axios
    .get(
      'https://geolab-project-backend.onrender.com/generalmacs'
      // 'http://localhost:3006/generalItems'
    )
    .then((data) => {
      console.log('Fetched GeneralItems');
      return data.data;
    })
    .catch((err) => console.error(err));
};
export const getMacByOptions = async (
  productType: string,
  ssdValue: number,
  color: string
) =>
  axios
    .get(
      `https://geolab-project-backend.onrender.com/getmacbyoptions/mac/${productType}/${ssdValue}/${color}`
    )
    .then((macs) => macs.data)
    .then((data: ItemType) => {
      console.log('Fetched GetMacByOptions: ', data);
      return data;
    });
export const getCurrentUser = async (accessToken: string) => {
  console.log('accessToken: ', accessToken);
  return axios({
    url: 'https://geolab-project-backend.onrender.com/userInfo',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
};
export const getMacOptions = async (id: number) =>
  axios
    .get(`https://geolab-project-backend.onrender.com/getmacoptions/${id}`)
    .then((response) => {
      // handle success
      console.log('getMacOptions: ', response.data);
      return response.data;
    })
    .catch((error) => {
      // handle error
      console.log('AXIOS ERROR: ', error);
    });
