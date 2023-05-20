import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Loading } from '../Loading';
import { ShopBox } from '../ShopBox';
import { Header } from './Header';
import { GeneralItemType, GeneralMacTypes, ItemType } from '../../types';
import { CheckBoxes } from '../inside-components/CheckBoxes';
import { PriceRangeSlider } from '../inside-components/PriceRangeSlider';
import { useSelector } from 'react-redux';
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
  const [filterTypes, setFilterTypes] = useState<string[]>([]);

  const [maxPrice, setMaxPrice] = useState(0);

  console.log('maxPrice: ', maxPrice);
  const [minSliderValue, setMinSliderValue] = useState(0);
  const [maxSliderValue, setMaxSliderValue] = useState(() => maxPrice);
  console.log('maxSliderValue: ', maxSliderValue);

  useEffect(() => {
    setMaxPrice(() =>
      Math.max(
        ...itemsObj.items.map((item) => {
          return currencyObj.currency === 'usd' ? item.price : item.gelPrice;
        })
      )
    );
    setMaxSliderValue(maxPrice);
  }, [itemsObj.items, currencyObj, maxPrice]);
  const filteredItems = generalItemsObj.generalItems.filter((item) => {
    const priceField =
      currencyObj.currency === 'usd' ? 'startingPrice' : 'startingGelPrice';
    const containsInputText = item.name.toLowerCase().includes(inputText);
    return (
      (filterTypes.length === 0 || filterTypes.includes(item.type)) &&
      containsInputText &&
      item[priceField] > minSliderValue &&
      item[priceField] <= maxSliderValue
    );
  });
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
