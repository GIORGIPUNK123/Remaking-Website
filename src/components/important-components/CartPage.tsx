import React, { useState } from 'react';
import { Header } from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { CartItemType, ItemType } from '../../types';
import { Box, Button, Select, Text } from '@chakra-ui/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SelectInput } from '../../atoms/SelectInput';
import {
  changeAmountFromCart,
  removeFromCart,
} from '../../store/slices/cartSlice';
import { CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
export const CartPage = () => {
  const DisplayCartItems: React.FC<{
    itemsArr: ItemType[];
    cartItems: CartItemType[];
  }> = ({ itemsArr, cartItems }) => {
    const dispatch = useDispatch();
    const currencyObj = useSelector(
      (state: { currency: { currency: 'usd' | 'gel' } }) => state.currency
    );

    cartItems.forEach((cartItemObj) => {
      const item = itemsArr.find((item) => item.id === cartItemObj.id);
      return itemsArr.find((item) => item.id === cartItemObj.id);
    });
    return (
      <>
        {cartItems.map((cartItemObj, i) => {
          const item = itemsArr.find((item) => item.id === cartItemObj.id);
          return (
            <>
              <Box display='flex' alignItems='center' w='80%' key={i}>
                <Box
                  mt='5'
                  mb='5'
                  w='100%'
                  key={item!.id}
                  h='36'
                  bgColor='white'
                  display='flex'
                  alignItems='center'
                  rounded='xl'
                  justifyContent='space-between'
                >
                  <Box w='64' mr='14' ml='5'>
                    <Swiper
                      navigation={true}
                      modules={[Navigation]}
                      className='shop-box-images'
                      loop={true}
                      style={{
                        //@ts-ignore
                        '--swiper-navigation-color': '#000',
                        '--swiper-navigation-size': '35px',
                      }}
                    >
                      {item!.images.map((image: string, index: number) => (
                        <SwiperSlide
                          key={index}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <div
                            className='shop-box-image'
                            style={{ backgroundImage: `url(${image})` }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Box>
                  <Text w='80' textAlign='center' color='#1976d2' fontSize='xl'>
                    {item!.name}
                  </Text>
                  <Text
                    w='24'
                    textAlign='center'
                    fontSize='xl'
                    style={{ color: 'green' }}
                  >
                    {currencyObj.currency === 'gel'
                      ? `${item!.gelPrice * cartItemObj.amount} ₾`
                      : `${item!.price * cartItemObj.amount}$`}
                  </Text>
                  <Box width='36' color='#1976d2' mr='6'>
                    <SelectInput
                      inputValue={cartItemObj.amount}
                      handleChange={(e: any) => {
                        dispatch(
                          changeAmountFromCart({
                            id: cartItemObj.id,
                            amount: e.target.value,
                          })
                        );
                      }}
                      optionsArr={Array.from(
                        { length: item!.inStock },
                        (_, index) => index + 1
                      )}
                    />
                  </Box>
                </Box>
                <Button
                  size='lg'
                  ml='5'
                  colorScheme='red'
                  onClick={() => {
                    dispatch(removeFromCart(cartItemObj.id));
                  }}
                >
                  <CloseIcon />
                </Button>
              </Box>
            </>
          );
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
  const navigate = useNavigate();
  return (
    <>
      <Header
        login='./login'
        register='./register'
        profile='./profile'
        cartPage='./cartpage'
      />
      <Box bg='whiteAlpha.800' h='75px' mb='28' />
      <Box w='100%' display='flex' justifyContent='center' flexWrap='wrap'>
        {!itemsObj.loading &&
        !cartItemsObj.loading &&
        cartItemsObj.cartItems.length !== 0 ? (
          <DisplayCartItems
            itemsArr={itemsObj.items}
            cartItems={cartItemsObj.cartItems}
          />
        ) : (
          <>
            <Text fontSize='2xl'>You don't have anything added in cart</Text>
            <Button
              onClick={() => {
                navigate('../shop');
              }}
              ml='5'
              colorScheme='blue'
            >
              Shop
            </Button>
          </>
        )}
      </Box>
    </>
  );
};
