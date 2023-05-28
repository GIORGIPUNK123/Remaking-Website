import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GeneralItemType } from '../../types';
import { axiosInstance } from '../../instance';

export const getGeneralItems = createAsyncThunk(
  'getGeneralItems/get',
  async () => {
    const { data } = await axiosInstance.get('/generalItems');
    return data;
  }
);
const generalItemsSlice = createSlice({
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
export const generalItemsReducer = generalItemsSlice.reducer;
