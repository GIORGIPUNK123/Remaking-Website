// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Box, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';

const MoneyDisplay: React.FC<MoneyDisplayTypes> = (props) => {
  const currencyObj = useSelector(
    (state: { currency: { currency: 'usd' | 'gel' } }) => state.currency
  );
  if (props.salePrice === undefined) {
    return (
      <div className='shopbox-prices-normal'>
        <h2 className='shopbox-normal-price'>
          {currencyObj.currency === 'gel'
            ? `${props.gelPrice} ₾`
            : `${props.price}$`}
        </h2>
      </div>
    );
  } else {
    return (
      <div className='shopbox-prices-normal'>
        <h2 className='shopbox-sale-price'>
          {currencyObj.currency === 'gel'
            ? `${props.saleGelPrice} ₾`
            : `${props.salePrice}$`}
        </h2>
        <h2 className='shopbox-normal-price'>
          {currencyObj.currency === 'gel'
            ? `${props.gelPrice} ₾`
            : `${props.price}$`}
        </h2>
      </div>
    );
  }
};
import { ShopBoxTypes, MoneyDisplayTypes } from '../types';
import { convertTypeAcquisitionFromJson } from 'typescript';
import { SwiperSlideForImages } from './helper-components/SwiperSlideForImages';
import { useSelector } from 'react-redux';

export const ShopBox: React.FC<ShopBoxTypes> = (props) => {
  const languageObj = useSelector(
    (state: { language: { lang: 'en' | 'ge' } }) => state.language
  );
  console.log('props: ', props);
  if (!props.general) {
    return (
      <Box className='shopbox shopbox-normal'>
        <span className='shop-box-name'>{props.name}</span>
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
          {props.images.map((image: string, index: number) => (
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
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
        <MoneyDisplay
          gelPrice={props.startingGelPrice}
          price={props.startingPrice}
          salePrice={props.salePrice}
          saleGelPrice={props.saleGelPrice}
        />
        <Button
          variant='solid'
          colorScheme='blue'
          bg='blue.400'
          className='shop-box-button'
          color='white'
        >
          <Link
            style={{
              width: '100%',
              height: '100%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            to={
              props.shop === true
                ? // {props}
                  `../item/${props.id}`
                : `/item/${props.id}`
            }
          >
            {languageObj.lang === 'en' ? (
              <Text className='shop-box-button-text'>View</Text>
            ) : (
              <Text className='shop-box-button-text'>ნახე ვრცლად</Text>
            )}
          </Link>
        </Button>
      </Box>
    );
  } else {
    return (
      <Box className='shopbox shopbox-normal'>
        <span className='shop-box-name'>{props.name}</span>
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
          {props.images.map((image: string, index: number) => (
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
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
        <MoneyDisplay
          gelPrice={props.startingGelPrice}
          price={props.startingPrice}
        />
        <Button
          variant='solid'
          colorScheme='blue'
          bg='blue.400'
          className='shop-box-button'
          color={'white'}
        >
          <Link
            style={{
              width: '100%',
              height: '100%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            to={
              props.shop === true
                ? `../build/${props.category}/${props.type}`
                : `/build/${props.category}/${props.type}`
            }
          >
            {languageObj.lang === 'en' ? (
              <Text className='shop-box-button-text'>View</Text>
            ) : (
              <Text className='shop-box-button-text'>ნახე ვრცლად</Text>
            )}
          </Link>
        </Button>
      </Box>
    );
  }
};
