import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    lang: <'en' | 'ge'>'en',
    loading: false,
    error: false,
  },
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload;
    },
    decrement: (state) => {
      state.lang;
    },
  },
});
export const { changeLang } = languageSlice.actions;
