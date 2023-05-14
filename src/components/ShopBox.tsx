// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Box, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { languageState, valueState } from "../atoms";
import { useRecoilValue } from "recoil";
import React from "react";

const MoneyDisplay: React.FC<MoneyDisplayTypes> = (props) => {
  console.log("saleGelPrice: ", props.saleGelPrice);
  if (useRecoilValue(valueState) === "gel") {
    if (props.saleGelPrice === 0 || props.saleGelPrice === undefined) {
      return (
        <div className="shopbox-prices-normal">
          <h2 className="shopbox-normal-price">{props.gelPrice}₾</h2>
        </div>
      );
    } else {
      return (
        <div className="shopbox-prices-normal">
          <h2 className="shopbox-sale-price">{props.saleGelPrice}₾</h2>
          <h2 className="shopbox-normal-price">{props.gelPrice}₾</h2>
        </div>
      );
    }
  } else {
    if (props.salePrice === 0 || props.salePrice === undefined) {
      return (
        <div className="shopbox-prices-normal">
          <h2 className="shopbox-normal-price">{props.price}$</h2>
        </div>
      );
    } else {
      return (
        <div className="shopbox-prices-normal">
          <h2 className="shopbox-sale-price">{props.salePrice}$</h2>
          <h2 className="shopbox-normal-price">{props.price}$</h2>
        </div>
      );
    }
  }
};
import { ShopBoxTypes, MoneyDisplayTypes } from "../types";
import { convertTypeAcquisitionFromJson } from "typescript";
import { SwiperSlideForImages } from "./helper-components/SwiperSlideForImages";

export const ShopBox: React.FC<ShopBoxTypes> = (props) => {
  console.log("props: ", props);
  const language = useRecoilValue(languageState);
  if (!props.general) {
    return (
      <Box className="shopbox shopbox-normal">
        <span className="shop-box-name">{props.name}</span>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="shop-box-images"
          loop={true}
          style={{
            "--swiper-navigation-color": "#000",
            "--swiper-navigation-size": "35px",
          }}
        >
          {props.images.map((image: string, index: number) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                className="shop-box-image"
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
          variant="solid"
          colorScheme="blue"
          bg="blue.400"
          className="shop-box-button"
          color="white"
        >
          <Link
            style={{
              width: "100%",
              height: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            to={
              props.shop === true
                ? // {props}
                  `../item/${props.id}`
                : `/item/${props.id}`
            }
          >
            {language === "en" ? (
              <Text className="shop-box-button-text">View</Text>
            ) : (
              <Text className="shop-box-button-text">ნახე ვრცლად</Text>
            )}
          </Link>
        </Button>
      </Box>
    );
  } else {
    return (
      <Box className="shopbox shopbox-normal">
        <span className="shop-box-name">{props.name}</span>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="shop-box-images"
          loop={true}
          style={{
            "--swiper-navigation-color": "#000",
            "--swiper-navigation-size": "35px",
          }}
        >
          {props.images.map((image: string, index: number) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                className="shop-box-image"
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
          variant="solid"
          colorScheme="blue"
          bg="blue.400"
          className="shop-box-button"
          color={"white"}
        >
          <Link
            style={{
              width: "100%",
              height: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            to={
              props.shop === true
                ? `../build/${props.category}/${props.type}`
                : `/build/${props.category}/${props.type}`
            }
          >
            {language === "en" ? (
              <Text className="shop-box-button-text">View</Text>
            ) : (
              <Text className="shop-box-button-text">ნახე ვრცლად</Text>
            )}
          </Link>
        </Button>
      </Box>
    );
  }
};
