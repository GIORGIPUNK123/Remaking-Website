import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CartItemType } from '../../types';

// export const Cart = () => {
//   const cartItemsObj = useSelector(
//     (state: {
//       cartItems: {
//         cartItems: CartItemType[];
//         error: boolean;
//         loading: boolean;
//       };
//     }) => state.cartItems
//   );

//   return (
//     <>
//       {cartItemsObj.cartItems.map((cartItem) => (Cart
//         <>
//           <h1>{cartItem.generalType}</h1>
//           <h1>{cartItem.specificType}</h1>
//           <h1>{cartItem.amount}</h1>
//         </>
//       ))}
//     </>
//   );
// };
