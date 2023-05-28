import { Box, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Loading } from '../Loading';
import { ShopBox } from '../ShopBox';
import { Header } from './Header';
import { GeneralItemType, GeneralMacTypes, ItemType } from '../../types';
import { CheckBoxes } from '../inside-components/CheckBoxes';
import { PriceRangeSlider } from '../inside-components/PriceRangeSlider';
import { useSelector } from 'react-redux';
import { filterBoxes } from '../../functions/filterBoxes';
const DisplayGeneralShopBoxes = (props: {
  items: any[];
  sliceValue: number;
}) => {
  return (
    <>
      {props.items.map((item, index) => (
        <ShopBox key={index} {...item} shop general />
      ))}
    </>
  );
};

export const ShopSection = () => {
  const generalItemsObj = useSelector(
    (state: {
      generalItems: { generalItems: GeneralItemType[] };
      error: boolean;
      loading: boolean;
    }) => state.generalItems
  );
  const currencyObj = useSelector(
    (state: { currency: { currency: 'usd' | 'gel' } }) => state.currency
  );
  const itemsObj = useSelector(
    (state: {
      items: { items: ItemType[]; error: boolean; loading: boolean };
    }) => state.items
  );
  const getInputText = (text: string) => {
    setInputText(text);
  };

  const [isMac, setIsMac] = useState(false);
  const [isIphone, setIsIphone] = useState(false);
  const [isAirpods, setIsAirpods] = useState(false);
  const [inputText, setInputText] = useState('');

  const checkBoxesArr = [
    isMac ? 'mac' : undefined,
    isIphone ? 'iphone' : undefined,
    isAirpods ? 'airpods' : undefined,
  ].filter(Boolean) as string[];

  const maxPrice = Math.max(
    ...itemsObj.items.map((item) => {
      return currencyObj.currency === 'usd' ? item.price : item.gelPrice;
    })
  );

  const [minSliderValue, setMinSliderValue] = useState(0);
  const [maxSliderValue, setMaxSliderValue] = useState(() => maxPrice);

  useEffect(() => {
    setMaxSliderValue(maxPrice);
  }, [itemsObj.items, currencyObj, maxPrice]);
  const filteredItems = filterBoxes(
    generalItemsObj.generalItems,
    inputText,
    currencyObj.currency,
    minSliderValue,
    maxSliderValue,
    checkBoxesArr
  );
  const [sliceValue, setSliceValue] = useState(6);
  if (
    !itemsObj.loading
    // filteredItems !== undefined
  ) {
    return (
      <>
        <Header
          getInputText={getInputText}
          login='../login'
          register='../register'
          profile='../profile'
          cartPage='../cartpage'
        />

        <Box bg='whiteAlpha.800' h='75px' />
        <Box
          display='flex'
          flexDir={{ base: 'column', xl: 'row' }}
          alignItems={{ base: 'center', xl: 'unset' }}
          ml='5%'
          mr='5%'
        >
          <Box
            boxShadow='dark-lg'
            display='flex'
            bg='whiteAlpha.100'
            mt='50px'
            w={{ base: '80%', xl: '30%' }}
            borderRadius='15px'
            flexDir='column'
            alignItems='center'
            minH='fit-content'
          >
            <PriceRangeSlider
              minSliderValue={minSliderValue}
              setMinSliderValue={setMinSliderValue}
              maxSliderValue={maxSliderValue}
              setMaxSliderValue={setMaxSliderValue}
              maxPrice={maxPrice}
            />
            <Box
              boxShadow='2xl'
              display='flex'
              bg='whiteAlpha.100'
              mt='30px'
              mb='30px'
              w='90%'
              borderRadius='15px'
              flexDir='column'
            >
              <Box
                mt='30px'
                mb='30px'
                ml='5%'
                mr='5%'
                display='flex'
                flexDir='column'
                justifyContent='space-evenly'
                align-items='center'
              >
                <CheckBoxes
                  isMac={isMac}
                  setIsMac={setIsMac}
                  isIphone={isIphone}
                  setIsIphone={setIsIphone}
                  isAirpods={isAirpods}
                  setIsAirpods={setIsAirpods}
                />
              </Box>
            </Box>
          </Box>
          <Box
            mt={{ base: '40px', xl: '0' }}
            pl={{ base: '0', xl: '35px' }}
            w={{ base: 'unset', xl: '70%' }}
            display='flex'
            justifyContent='center'
            flexWrap='wrap'
          >
            {/* <DisplayShopBoxes
        // items={generalMacs}
        items={filteredItems}
        sliceValue={sliceValue}
      /> */}
            <DisplayGeneralShopBoxes
              // items={generalItems}
              items={filteredItems}
              sliceValue={sliceValue}
            />
          </Box>
        </Box>
      </>
    );
  } else return <Loading />;
};
