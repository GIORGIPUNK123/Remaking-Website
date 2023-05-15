import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GeneralItemType } from '../../types';

export const getGeneralItems = createAsyncThunk(
  'getGeneralItems/get',
  async () => {
    const { data } = await axios.get('http://localhost:3006/generalItems');
    return data;
  }
);
export const generalItemsSlice = createSlice({
  name: 'generalItems',
  initialState: {
    generalItems: [] as GeneralItemType[],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGeneralItems.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getGeneralItems.fulfilled, (state, action) => {
      state.loading = false;
      state.generalItems = action.payload;
    });
  },
});
