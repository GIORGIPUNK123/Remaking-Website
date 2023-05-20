import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CartItemsType } from '../../types';
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [] as CartItemsType[],
    loading: false,
    error: false,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state) => {
      state.cartItems;
    },
  },
});
export const { addToCart } = cartSlice.actions;
