import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { ShopBox } from '../ShopBox';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { GeneralItemType, ItemType } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { filterBoxes } from '../../functions/filterBoxes';
import { useNavigate } from 'react-router-dom';
export const HomeSection = () => {
  const languageObj = useSelector(
    (state: { language: { lang: 'en' | 'ge' } }) => state.language
  );
  const dispatch = useDispatch();
  const generalItemsObj = useSelector(
    (state: {
      generalItems: {
        generalItems: GeneralItemType[];
        error: boolean;
        loading: boolean;
      };
    }) => state.generalItems
  );
  const itemsObj = useSelector(
    (state: {
      items: { items: ItemType[]; error: boolean; loading: boolean };
    }) => state.items
  );
  const [inputText, setInputText] = useState('');
  const getInputText = (text: string) => {
    setInputText(text);
  };
  const navigate = useNavigate();
  const filteredItems = filterBoxes(generalItemsObj.generalItems, inputText);
  return (
    <>
      <Header
        getInputText={getInputText}
        login='./login'
        register='./register'
        profile='./profile'
        cartPage='./cartpage'
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
              {filteredItems.slice(0, 6).map((item: any, index: number) => {
                return <ShopBox key={index} {...item} general />;
              })}
            </div>
          </Box>
        </div>
        <Button
          colorScheme='blue'
          variant='solid'
          size='lg'
          bg='blue.400'
          color='white'
          style={{
            position: 'absolute',
            top: '70px',
            right: '10%',
          }}
          isLoading={itemsObj.loading}
          onClick={() => {
            navigate('/adminpanel');
          }}
        >
          Admin Panel
        </Button>
      </section>
    </>
  );
};
