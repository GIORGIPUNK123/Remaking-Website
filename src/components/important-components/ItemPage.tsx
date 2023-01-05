import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Header } from "./Header";
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
import { cartState, itemsState, languageState } from "../../atoms";
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

export const ItemPage = () => {
  const { id: tempId } = useParams();
  const currentId = parseInt(tempId!);
  const [items, setItems] = useRecoilState(itemsState);
  const currentItem = items.find(({ id }) => id === currentId);
  if (currentItem === undefined) {
    return null;
  } else {
    const [cartItems, setCartItems] = useRecoilState(cartState);
    const language = useRecoilValue(languageState);
    console.log("currentId ", currentId);
    const inStock = currentItem.inStock;
    const [itemAmount, setItemAmount] = useState(1);

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
      useNumberInput({
        defaultValue: 1,
        min: 1,
        max: inStock,
        value: itemAmount,
        onChange: (e) => {
          setItemAmount(parseInt(e));
        },
      });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();
    console.log("cartItems :", cartItems);

    const [arrayOfIds, setArrayOfIds] = useState([]);
    console.log("arrayOfIds", arrayOfIds);
    const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
    const findExistingItem = (
      arr: { itemId: number; amount: number }[],
      myId: number
    ): { itemId: number; amount: number } =>
      arr.find((item: { itemId: number }) => item.itemId === myId)!;

    const handleAddToCartClick = () => {
      const isInCart = (
        productId: number,
        arr: { itemId: number; amount: number }[]
      ) => arr.some((el) => el.itemId === productId);
      if (isInCart(currentId, cartItems)) {
        console.log("it already is in the array");

        const tempItem: { itemId: number; amount: number } = findExistingItem(
          cartItems,
          currentId
        );
        const updatedItem: { itemId: number; amount: number } = {
          ...tempItem,
          amount: itemAmount,
        };
        const tempArr = [...cartItems];
        tempArr[cartItems.indexOf(findExistingItem(cartItems, currentId))] =
          updatedItem;
        setCartItems(tempArr);
      } else {
        setCartItems([...cartItems, { itemId: currentId, amount: itemAmount }]);
        console.log("i should push");
      }
      setButtonIsDisabled(true);
      const timer = setTimeout(() => {
        setButtonIsDisabled(false);
      }, 1500);
      return () => clearTimeout(timer);
    };
    return (
      <>
        <Header />
        <section className="item-page" key={currentItem.id}>
          <Box
            boxShadow="dark-lg"
            mt="50px"
            bg="whiteAlpha.100"
            w="60%"
            display="flex"
            flexDir="column"
            alignItems="center"
            borderRadius="25px"
          >
            <Text
              className="item-page-name"
              key={currentItem.id}
              fontSize="34px"
              mt="75px"
              mb="45px"
            >
              {currentItem.name}
            </Text>
            <SwiperSlideForImages images={currentItem.images} />
            <Box
              w="80%"
              bgColor="whiteAlpha.100"
              borderRadius="15px"
              mt="50px"
              pt="60px"
              pb="60px"
              pl="80px"
              pr="80px"
              boxShadow="dark-lg"
            >
              <Text fontSize="24px" color="whiteAlpha.800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                eligendi nemo dignissimos repellendus beatae vitae laudantium
                asperiores dolor debitis iusto ipsa ea architecto incidunt, ad
                quas. Accusantium nemo iusto eligendi. Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Laborum eligendi nemo
                dignissimos repellendus beatae vitae laudantium asperiores dolor
                debitis iusto ipsa ea architecto incidunt, ad quas. Accusantium
                nemo iusto eligendi.
              </Text>
            </Box>
            <Box
              h="75px"
              className="item-page-stuff-wrapper"
              mb="25px"
              boxShadow="dark-lg"
              borderRadius="15px"
            >
              <Box className="amount-buttons" maxW={"50%"} pr="25px" pl="25px">
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
              <Box className="item-page-buttons" pl="25px" pr="25px">
                <Button
                  colorScheme={"green"}
                  size="lg"
                  h="55px"
                  w="45%"
                  disabled={buttonIsDisabled}
                >
                  {language === "en" ? "Buy Now" : "იყიდე ახლავე"}
                </Button>
                {findExistingItem(cartItems, currentId) !== undefined ? (
                  <Button
                    colorScheme={"blue"}
                    size="lg"
                    h="55px"
                    w="45%"
                    disabled={buttonIsDisabled}
                    onClick={() => {
                      handleAddToCartClick();
                    }}
                  >
                    {language === "en"
                      ? findExistingItem(cartItems, currentId).amount
                      : findExistingItem(cartItems, currentId).amount}
                  </Button>
                ) : (
                  <Button
                    colorScheme={"blue"}
                    size="lg"
                    h="55px"
                    w="45%"
                    disabled={buttonIsDisabled}
                    onClick={() => {
                      handleAddToCartClick();
                    }}
                  >
                    {language === "en" ? `Add To Cart` : `დაამატე კალათაში`}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </section>
      </>
    );
  }
};
