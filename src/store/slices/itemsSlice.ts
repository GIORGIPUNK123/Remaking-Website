import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GeneralItemType, ItemType } from '../../types';

export const getItems = createAsyncThunk('getItems/get', async () => {
  const { data } = await axios.get('http://localhost:3006/items');
  console.log('getItems: ', data);
  return data;
});
export const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [] as ItemType[],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getItems.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(getItems.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = true;
    });
  },
});
