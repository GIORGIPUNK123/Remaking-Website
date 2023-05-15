import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GeneralItemType } from "../../types";

export const getCurrentUser = createAsyncThunk(
  "getCurrentUser/get",
  async (accessToken: string) => {
    console.log("accessToken FROM REDUX: ", accessToken);
    return axios({
      url: "http://localhost:3006/userinfo",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        console.log("res_DATA: ", res.data);
        return res.data;
      })
      .catch((err) => {
        console.log("Error from getCurrentUser: ", err);
      });
  }
);
export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    currentUser: {},
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      console.log("action.payload: ", action.payload);
      state.loading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      console.log("action.payload: ", action.payload);
      state.loading = false;
      state.error = true;
    });
  },
});
