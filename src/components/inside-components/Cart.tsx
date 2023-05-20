import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CartItemsType } from '../../types';

export const Cart = () => {
  const cartItemsObj = useSelector(
    (state: {
      cartItems: {
        cartItems: CartItemsType[];
        error: boolean;
        loading: boolean;
      };
    }) => state.cartItems
  );

  return (
    <>
      {cartItemsObj.cartItems.map((cartItem) => (
        <>
          <h1>{cartItem.generalType}</h1>
          <h1>{cartItem.specificType}</h1>
          <h1>{cartItem.amount}</h1>
        </>
      ))}
    </>
  );
};
