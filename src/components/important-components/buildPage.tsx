import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Header } from "./Header";
import cartImage from "../../images/add-to-cart.svg";
import { Box, Button, useNumberInput, Input, Text } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cartState,
  macsState,
  languageState,
  valueState,
  generalMacsState,
} from "../../atoms";
import { Loading } from "../Loading";
import axios from "axios";
import { getMacByOptions, getMacOptions } from "../../functions/fetchFuncions";
import { SwiperSlideForImages } from "../helper-components/SwiperSlideForImages";
import { SsdsDisplay } from "../helper-components/SsdsDisplay";
import { ColorsDisplay } from "../helper-components/ColorsDisplay";
import { BuildBuyingPart } from "../helper-components/BuildBuyingPart";
export const BuildPage = () => {
  const { type: productType, product: productParams } = useParams();
  const generalMacs = useRecoilValue(generalMacsState);
  const language = useRecoilValue(languageState);
  const currency = useRecoilValue(valueState);

  const currentProduct = generalMacs.find(
    (product) => product.type === productParams
  );

  const [options, setOptions] = useState<{
    colors: string[];
    ssds: number[];
  }>();
  const [activeColor, setActiveColor] = useState(options?.colors[0]);
  const [activeSsd, setActiveSsd] = useState(options?.ssds[0]);
  // const [isBuyDissabled, setIsBuyDissabled] = useState(true);
  const [realProduct, setRealProduct] = useState<{
    price: number;
    gelPrice: number;
    inStock: number;
  }>();
  useEffect(() => {
    if (currentProduct) {
      getMacOptions(currentProduct.id).then((data) => {
        setOptions(data);
        setActiveColor(data.colors[0]);
        setActiveSsd(data.ssds[0]);
      });
    }
  }, [currentProduct]);

  useEffect(() => {
    setRealProduct(undefined);
    console.log("from fetch: ", currentProduct, activeSsd, activeColor);
    if (currentProduct && activeSsd && activeColor) {
      getMacByOptions(currentProduct.type, activeSsd, activeColor)
        .then((data) => setRealProduct(data))
        .catch((err) => console.log("err: ", err));
    }
  }, [activeColor, activeSsd]);

  return !options || !activeColor ? (
    <Loading />
  ) : (
    <>
      <Header login="../login" register="../register" profile="../profile" />
      <section className="item-page">
        <Box
          ml="2.5%"
          boxShadow="dark-lg"
          mt="50px"
          bg="whiteAlpha.100"
          w="45%"
          display="flex"
          flexDir="column"
          alignItems="center"
          borderRadius="25px"
        >
          <Text className="item-page-name" fontSize="34px" mt="75px" mb="45px">
            {currentProduct?.name}
          </Text>
          <SwiperSlideForImages images={currentProduct?.images} />
          <Box
            w="80%"
            bgColor="whiteAlpha.100"
            borderRadius="15px"
            my="50px"
            py="60px"
            px="80px"
            boxShadow="dark-lg"
          >
            <Text fontSize="24px" color="whiteAlpha.800">
              Hello
            </Text>
          </Box>
        </Box>
        <Box
          w="45%"
          mr="2.5%"
          boxShadow="dark-lg"
          mt="50px"
          bg="whiteAlpha.100"
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          alignItems="center"
          borderRadius="25px"
        >
          <Box display="flex" flexDir="column" alignItems="center">
            {options.colors.length !== 0 && !undefined ? (
              <>
                <Text mt="12" fontSize="2xl">
                  {language === "ge" ? "აირჩიე შენი ფერი" : "Choose Your Color"}
                </Text>
                <Box
                  display="flex"
                  w="100%"
                  alignItems="center"
                  justifyContent="space-evenly"
                  flexWrap="wrap"
                  mt="10"
                >
                  {ColorsDisplay(options.colors, activeColor, setActiveColor)}
                </Box>
              </>
            ) : null}
            {options.ssds.length !== 0 && !undefined ? (
              <>
                <Text mt="12" fontSize="2xl">
                  {language === "ge" ? "აირჩიე შენი სსდ" : "Choose Your Ssd"}
                </Text>
                <Box
                  display="flex"
                  w="100%"
                  alignItems="center"
                  justifyContent="space-evenly"
                  flexWrap="wrap"
                >
                  {SsdsDisplay(options.ssds, activeSsd, setActiveSsd, language)}
                </Box>
              </>
            ) : null}
          </Box>
          <BuildBuyingPart realProduct={realProduct} />
        </Box>
      </section>
    </>
  );
};