import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserType } from '../../types';
import { useDispatch } from 'react-redux';

export const getCurrentUser = createAsyncThunk(
  'getCurrentUser/get',
  async (accessToken: string) => {
    console.log('accessToken from getCurrUser: ', accessToken);
    return axios({
      url: 'https://geolab-project-backend.onrender.com/userinfo',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err.response.status === 401) {
        }
        console.error('Error from getCurrentUser: ', err.message);
      });
  }
);

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    currentUser: {} as UserType,
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      getCurrentUser.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        state.loading = false;
        state.currentUser = action.payload;
      }
    );
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});
