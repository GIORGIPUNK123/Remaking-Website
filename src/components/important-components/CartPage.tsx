import React from 'react';
import { Header } from './Header';
import { useSelector } from 'react-redux';
import { CartItemType, ItemType } from '../../types';
import { Box } from '@chakra-ui/react';
export const CartPage = () => {
  const DisplayCartItems: React.FC<{
    itemsArr: ItemType[];
    cartItems: CartItemType[];
  }> = ({ itemsArr, cartItems }) => {
    return (
      <>
        {cartItems.map((cartItemObj) => {
          const item = itemsArr.find((item) => item.id === cartItemObj.id);
          console.log(item);
          return <Box key={item!.id}>{item!.name}</Box>;
        })}
      </>
    );
  };

  const itemsObj = useSelector(
    (state: {
      items: { items: ItemType[]; error: boolean; loading: boolean };
    }) => state.items
  );
  const cartItemsObj = useSelector(
    (state: {
      cartItems: {
        cartItems: CartItemType[];
        error: boolean;
        loading: boolean;
      };
    }) => state.cartItems
  );

  return (
    <>
      <Header
        login='./login'
        register='./register'
        profile='./profile'
        cartPage='./cartpage'
      />
      {!itemsObj.loading && !cartItemsObj.loading && (
        <DisplayCartItems
          itemsArr={itemsObj.items}
          cartItems={cartItemsObj.cartItems}
        />
      )}
    </>
  );
};
