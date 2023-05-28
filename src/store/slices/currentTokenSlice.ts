import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const refreshTokenThunk = createAsyncThunk(
  'refresh/get',
  async (refreshToken: string) => {
    return axios({
      url: 'https://geolab-project-backend.onrender.com/refresh',
      method: 'POST',
      data: { refreshToken },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log('Error: ', err);
        console.log('Error Status: ', err.response.status);
        throw err; // Rethrow the error to be handled by the rejected action
      });
  }
);

export const getTokenByLogin = createAsyncThunk(
  'login/get',
  async ({ email, password }: { email: string; password: string }) => {
    return axios({
      url: 'https://geolab-project-backend.onrender.com/login',
      method: 'POST',
      data: { email, password },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.data.accessToken;
      })
      .catch((err) => {
        console.log('Error: ', err);
        console.log('Error Status: ', err.response.status);
        throw err;
      });
  }
);

export const currentTokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: '',
    refreshToken: '',
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTokenByLogin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTokenByLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
    });
    builder.addCase(refreshTokenThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    });
  },
});
