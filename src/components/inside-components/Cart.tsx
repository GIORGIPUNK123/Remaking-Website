import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { cartState } from "../../atoms";

export const Cart = () => {
  const [myCartItems, setMyCartItems] = useRecoilState(cartState);
  console.log(myCartItems);
  return (
    <>
      {myCartItems.map((cartItem) => (
        <h1>{cartItem.itemId}</h1>
      ))}
    </>
  );
};
