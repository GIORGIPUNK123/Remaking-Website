import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CartItemType } from '../../types';
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [] as CartItemType[],
    loading: false,
    error: false,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => {
        return item.id === action.payload.id;
      });
      state.cartItems.splice(itemIndex, 1);
    },
    changeAmountFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => {
        return item.id === action.payload.id;
      });
      console.log('ITEM INDEX:', itemIndex);
      state.cartItems[itemIndex].amount = action.payload.amount;
    },
  },
});

export const { addToCart, removeFromCart, changeAmountFromCart } =
  cartSlice.actions;
