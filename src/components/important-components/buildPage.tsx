import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Header } from "./Header";
import cartImage from "../../images/add-to-cart.svg";
import {
  Box,
  useColorMode,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useNumberInput,
  Input,
  Text,
} from "@chakra-ui/react";
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
const SwiperSlideForImages = (props: any) => {
  return (
    <Box className="my-swiper-wrapper" boxShadow="dark-lg">
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay
        navigation
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
              className="item-image"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
const getmacoptions = async (myId: number) => {
  return await axios
    .get(`http://localhost:3006/getmacoptions/${myId}`)
    .then((response) => {
      // handle success
      console.log("AXIOS RESPONSE DATA: ", response.data);
      return response.data;
    })
    .catch((error) => {
      // handle error
      console.log("AXIOS ERROR: ", error);
    });
};
const colorsDisplay = (
  colors: string[],
  activeColor: string | undefined,
  setState: any
) => {
  console.log("activeColor: ", activeColor);
  return colors.map((color, index) => {
    switch (color) {
      case "silver":
        return (
          <Box
            outline={activeColor === "silver" ? "solid" : "none"}
            key={index}
            cursor="pointer"
            w="100px"
            h="55px"
            bgColor="#C0C0C0"
            borderRadius="7px"
            boxShadow="xl"
            _hover={{
              boxShadow: "dark-lg",
              transitionDuration: ".3s",
            }}
            onClick={() => {
              setState("silver");
            }}
          />
        );
      case "gold":
        return (
          <Box
            w="100px"
            h="55px"
            outline={activeColor === "gold" ? "solid" : "none"}
            key={index}
            cursor="pointer"
            bgColor="#FFD700"
            borderRadius="7px"
            boxShadow="xl"
            _hover={{
              boxShadow: "dark-lg",
              transitionDuration: ".3s",
            }}
            onClick={() => {
              setState("gold");
            }}
          />
        );
      case "space_grey":
        return (
          <Box
            w="100px"
            h="55px"
            outline={activeColor === "space_grey" ? "solid" : "none"}
            key={index}
            cursor="pointer"
            bgColor="#808080"
            borderRadius="7px"
            boxShadow="xl"
            _hover={{
              boxShadow: "dark-lg",
              transitionDuration: ".3s",
            }}
            onClick={() => {
              setState("space_grey");
            }}
          />
        );
      default:
        return null;
    }
  });
};
const ssdsDisplay = (
  ssds: number[],
  activeSsd: number | undefined,
  setState: any,
  language: string
) => {
  return ssds.map((ssd, index) => (
    <Box
      margin="0px 15px 0px 15px"
      key={index}
      bgColor="whiteAlpha.200"
      outline={ssd === activeSsd ? "solid" : "none"}
      w="220px"
      h="75px"
      mt="12"
      borderRadius="15px"
      boxShadow="2xl"
      cursor="pointer"
      _hover={{
        boxShadow: "dark-lg",
        bgColor: "whiteAlpha.300",
        transitionDuration: ".3s",
      }}
      textAlign="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={() => {
        setState(ssd);
      }}
    >
      <Text fontSize="2xl">
        {ssd} {language === "ge" ? "გბ" : "Gb"}
      </Text>
    </Box>
  ));
};

const getMacByOptions = async (
  productType: string,
  ssdValue: number,
  color: string
) => {
  return axios
    .get(
      `http://localhost:3006/getmacbyoptions/mac/${productType}/${ssdValue}/${color}`
    )
    .then((data) => {
      console.log(data.data);
      return data.data;
    })
    .catch((err) => console.log(err));
};

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
      getmacoptions(currentProduct.id).then((data) => {
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

  console.log("generalMacs: ", generalMacs);
  console.log("productParams: ", productParams);
  console.log("currentProduct: ", currentProduct);
  console.log("options: ", options);
  console.log("activeColor: ", activeColor);
  console.log("activeSsd: ", activeSsd);
  const [itemAmount, setItemAmount] = useState(1);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      defaultValue: 1,
      min: 1,
      max: realProduct ? realProduct.inStock : 1,
      value: itemAmount,
      onChange: (e) => {
        setItemAmount(parseInt(e));
      },
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const handleAddToCartClick = () => {
    const isInCart = (
      productId: number,
      arr: { itemId: number; amount: number }[]
    ) => arr.some((el) => el.itemId === productId);
    // setCartItems([...cartItems, { itemId: currentId, amount: itemAmount }]);
    console.log("i should push");

    setButtonIsDisabled(true);
    const timer = setTimeout(() => {
      setButtonIsDisabled(false);
    }, 1500);
    return () => clearTimeout(timer);
  };

  // console.log("PRODUCT ===> ", product, " PRODUCT TYPE ===> ", productType);

  // const [colors, setColors] = useState(options?.colors[0]);

  // console.log("OPTIONS: ", options);

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
            mt="50px"
            mb="50px"
            pt="60px"
            pb="60px"
            pl="80px"
            pr="80px"
            boxShadow="dark-lg"
          >
            <Text fontSize="24px" color="whiteAlpha.800">
              Hello, fuck you
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
                  {colorsDisplay(options.colors, activeColor, setActiveColor)}
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
                  {ssdsDisplay(options.ssds, activeSsd, setActiveSsd, language)}
                </Box>
              </>
            ) : null}
          </Box>
          <Box
            mt="20"
            mb="20"
            w="80%"
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            flexDir="column"
          >
            <Box
              w="100%"
              display="flex"
              alignItems="center"
              justifyContent={{ base: "center", "2xl": "space-between" }}
              flexDir={{ base: "column", "2xl": "row" }}
            >
              <Box
                className="amount-buttons"
                maxW={{ base: "100%", "2xl": "35%" }}
              >
                <Button h="55px" {...dec}>
                  -
                </Button>
                <Input
                  h="55px"
                  // maxW={"60px"}
                  mx={"2px"}
                  {...input}
                  textAlign="center"
                />
                <Button h="55px" {...inc}>
                  +
                </Button>
              </Box>
              <Box display="flex" justifyContent="center" flexWrap="wrap">
                <Button
                  colorScheme={"green"}
                  size="lg"
                  h="55px"
                  w="230px"
                  m="5px 7px"
                  disabled={!realProduct}
                >
                  {language === "en"
                    ? `Buy now ${realProduct ? realProduct.gelPrice + "₾" : ""}`
                    : `იყიდე ახლავე ${
                        realProduct ? realProduct.gelPrice + "₾" : ""
                      }`}
                </Button>
                <Button
                  colorScheme={"blue"}
                  size="lg"
                  h="55px"
                  // w="240px"
                  m="5px 7px"
                  disabled={!realProduct}
                  onClick={() => {
                    handleAddToCartClick();
                  }}
                >
                  <img
                    src={cartImage}
                    alt="cartImage"
                    width="35px"
                    style={{ marginRight: "5px" }}
                  />
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </section>
    </>
  );
};
