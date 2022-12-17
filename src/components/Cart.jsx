import { useState } from "react";
import { useRecoilState } from "recoil";
import { cartState } from "../atoms";

export const Cart = () => {
  const [myCartItems, setMyCartItems] = useRecoilState(cartState);
  console.log(myCartItems);
  myCartItems.map((cartItem) => {
    return <h1>{cartItem.name}</h1>;
  });
};
