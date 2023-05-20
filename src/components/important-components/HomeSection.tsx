import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { ShopBox } from '../ShopBox';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Box, Heading, Text } from '@chakra-ui/react';
import { GeneralItemType, ItemType } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
export const HomeSection = () => {
  const languageObj = useSelector(
    (state: { language: { lang: 'en' | 'ge' } }) => state.language
  );
  const dispatch = useDispatch();
  const generalItemsObj = useSelector(
    (state: {
      generalItems: { generalItems: GeneralItemType[] };
      error: boolean;
      loading: boolean;
    }) => state.generalItems
  );
  const [inputText, setInputText] = useState('');
  const getInputText = (text: string) => {
    setInputText(text);
  };
  console.log('generalItems: ', generalItemsObj);
  return (
    <>
      <Header
        getInputText={getInputText}
        login='./login'
        register='./register'
        profile='./profile'
      />
      <section>
        <Box bg={'whiteAlpha.800'} h='125px' />
        <Heading
          className='best-seller-heading'
          fontSize={{ base: '24px', xl: '36px' }}
          mt='80px'
          mb='80px'
          textAlign='center'
        >
          {languageObj.lang === 'en' ? 'New Products' : 'ახალი პროდუქტები'}
        </Heading>
        <div className='best-seller'>
          <Box
            className='best-seller-box'
            display={{ base: 'none', md: 'flex' }}
          >
            <div className='best-seller-items'>
              {generalItemsObj.generalItems
                .slice(0, 6)
                .map((item: any, index: number) => {
                  console.log('item.images :', item.images);
                  return <ShopBox key={index} {...item} general />;
                })}
            </div>
          </Box>
        </div>
      </section>
    </>
  );
};
