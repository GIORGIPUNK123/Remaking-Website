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
    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (id) => id === action.payload
      );
      state.cartItems.splice(itemIndex, 1);
    },
    changeAmountFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (id) => id === action.payload
      );
      state.cartItems[itemIndex].amount = action.payload;
    },
  },
});
export const { addToCart, removeFromCart, changeAmountFromCart } =
  cartSlice.actions;
