import axios from "axios";
import { MacType } from "../types";
export const getMacs = async (amount?: number) => {
  return axios
    .get("http://localhost:3006/macs")
    .then((macs) => macs.data)
    .then((data: MacType[]) => data);
};
export const getGeneralMacs = async () => {
  return axios
    .get(
      // "https://geolab-project-backend.onrender.com/generalmacs"
      "http://localhost:3006/generalmacs"
    )
    .then((data) => {
      console.log("Fetched GeneralMacs");
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
      `http://localhost:3006/getmacbyoptions/mac/${productType}/${ssdValue}/${color}`
    )
    .then((macs) => macs.data)
    .then((data: MacType) => {
      console.log("Fetched GetMacByOptions: ", data);
      return data;
    });

export const getCurrentUser = async (accessToken: string) => {
  console.log("accessToken: ", accessToken);
  return axios({
    url: "https://geolab-project-backend.onrender.com/userInfo",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};
export const getMacOptions = async (id: number) =>
  axios
    .get(`http://localhost:3006/getmacoptions/${id}`)
    .then((response) => {
      // handle success
      console.log("getMacOptions: ", response.data);
      return response.data;
    })
    .catch((error) => {
      // handle error
      console.log("AXIOS ERROR: ", error);
    });
