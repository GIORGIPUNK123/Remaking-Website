import { createSlice } from '@reduxjs/toolkit';

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currency: <'usd' | 'gel'>'usd',
    loading: false,
    error: false,
  },
  reducers: {
    changeCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { changeCurrency } = currencySlice.actions;
