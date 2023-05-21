import {
  Box,
  Button,
  Input,
  useNumberInput,
  useStatStyles,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import cartImage from '../../images/add-to-cart.svg';
import { useDispatch, useSelector } from 'react-redux';
import { CartItemsType, ItemType } from '../../types';
import { addToCart, changeAmountFromCart } from '../../store/slices/cartSlice';
export const BuildBuyingPart = (props: { currProduct?: ItemType }) => {
  const languageObj = useSelector(
    (state: { language: { lang: 'en' | 'ge' } }) => state.language
  );
  const [itemAmount, setItemAmount] = useState(1);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      defaultValue: 1,
      min: 1,
      max: props.currProduct ? props.currProduct.inStock : 1,
      value: itemAmount,
      onChange: (e) => {
        setItemAmount(parseInt(e));
      },
    });
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

  const cartItemsObj = useSelector(
    (state: {
      cartItems: {
        cartItems: CartItemsType[];
        error: boolean;
        loading: boolean;
      };
    }) => state.cartItems
  );
  const dispatch = useDispatch();
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  const handleAddToCartClick = (
    currProduct: ItemType,
    amount: number,
    cartItems: CartItemsType[]
  ) => {
    const isInCart = (productId: number) =>
      cartItems.some((el) => el.id === productId);
    console.log('isInCart: ', isInCart(currProduct.id));
    isInCart(currProduct.id)
      ? dispatch(changeAmountFromCart({ id: currProduct.id, amount }))
      : dispatch(addToCart({ id: currProduct.id, amount }));
  };
  console.log('props.currProduct: ', props.currProduct);
  return (
    <Box
      mt='20'
      mb='20'
      w='80%'
      display='flex'
      justifyContent='space-evenly'
      alignItems='center'
      flexDir='column'
    >
      <Box
        w='100%'
        display='flex'
        alignItems='center'
        justifyContent={{ base: 'center', '2xl': 'space-between' }}
        flexDir={{ base: 'column', '2xl': 'row' }}
      >
        <Box className='amount-buttons' maxW={{ base: '100%', '2xl': '35%' }}>
          <Button h='55px' {...dec}>
            -
          </Button>
          <Input
            h='55px'
            // maxW={"60px"}
            mx={'2px'}
            {...input}
            textAlign='center'
          />
          <Button h='55px' {...inc}>
            +
          </Button>
        </Box>
        <Box display='flex' justifyContent='center' flexWrap='wrap'>
          <Button
            colorScheme={'green'}
            size='lg'
            h='55px'
            w='230px'
            m='5px 7px'
            isDisabled={!props.currProduct}
          >
            {languageObj.lang === 'en'
              ? `Buy now ${
                  props.currProduct ? props.currProduct.gelPrice + '₾' : ''
                }`
              : `იყიდე ახლავე ${
                  props.currProduct ? props.currProduct.gelPrice + '₾' : ''
                }`}
          </Button>
          <Button
            colorScheme={'blue'}
            size='lg'
            h='55px'
            // w="240px"
            m='5px 7px'
            isDisabled={!props.currProduct}
            onClick={() => {
              handleAddToCartClick(
                props.currProduct!,
                itemAmount,
                cartItemsObj.cartItems
              );
            }}
          >
            <img
              src={cartImage}
              alt='cartImage'
              width='35px'
              style={{ marginRight: '5px' }}
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
