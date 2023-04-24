// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Box, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { languageState, valueState } from "../atoms";
import { useRecoilValue } from "recoil";
import React from "react";

const MoneyDisplay: React.FC<MoneyDisplayTypes> = (props) => {
  console.log("itemSaleGelPrice: ", props.itemSaleGelPrice);
  if (useRecoilValue(valueState) === "gel") {
    if (props.itemSaleGelPrice === 0 || props.itemSaleGelPrice === undefined) {
      return (
        <div className="shopbox-prices-normal">
          <h2 className="shopbox-normal-price">{props.itemGelPrice}₾</h2>
        </div>
      );
    } else {
      return (
        <div className="shopbox-prices-normal">
          <h2 className="shopbox-sale-price">{props.itemSaleGelPrice}₾</h2>
          <h2 className="shopbox-normal-price">{props.itemGelPrice}₾</h2>
        </div>
      );
    }
  } else {
    if (props.itemSalePrice === 0 || props.itemSalePrice === undefined) {
      return (
        <div className="shopbox-prices-normal">
          <h2 className="shopbox-normal-price">{props.itemPrice}$</h2>
        </div>
      );
    } else {
      return (
        <div className="shopbox-prices-normal">
          <h2 className="shopbox-sale-price">{props.itemSalePrice}$</h2>
          <h2 className="shopbox-normal-price">{props.itemPrice}$</h2>
        </div>
      );
    }
  }
};
import { ShopBoxTypes, MoneyDisplayTypes } from "../types";
import { convertTypeAcquisitionFromJson } from "typescript";

export const ShopBox: React.FC<ShopBoxTypes> = (props) => {
  console.log("props.general: ", props.general);
  const language = useRecoilValue(languageState);
  if (!props.general) {
    return (
      <Box className="shopbox shopbox-normal">
        <span className="shop-box-name">{props.itemName}</span>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="shop-box-images"
          loop={true}
          style={{
            "--swiper-navigation-color": "#000"!,
            "--swiper-navigation-size": "35px",
          }}
        >
          {props.itemImages.map((image: string, index: number) => (
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
          itemGelPrice={props.itemGelPrice}
          itemPrice={props.itemPrice}
          itemSalePrice={props.itemSalePrice}
          itemSaleGelPrice={props.itemSaleGelPrice}
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
                  `../item/${props.itemId}`
                : `/item/${props.itemId}`
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
        <span className="shop-box-name">{props.itemName}</span>
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
          {props.itemImages.map((image: string, index: number) => (
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
          itemGelPrice={props.itemGelPrice}
          itemPrice={props.itemPrice}
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
                ? `../build/${props.itemCategory}/${props.itemType}`
                : `/build/${props.itemCategory}/${props.itemType}`
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
