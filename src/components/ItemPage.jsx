import { useState } from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
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
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { cartState, itemsState } from "../atoms";

const SwiperSlideForImages = (props) => {
  console.log("test");
  console.log("props.image ", props.images);
  return (
    <Box className="my-swiper-wrapper">
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay
        navigation
      >
        {props.images.map((image, index) => (
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
  const { id: currentId } = useParams();
  const { colorMode, toggleColorMode } = useColorMode();
  // console.log(colorMode);
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [items, setItems] = useRecoilState(itemsState);
  const currentItem = items.find(({ id }) => id == currentId);
  console.log("currentItem ", currentItem);
  const inStock = currentItem.inStock;
  const [itemAmount, setItemAmount] = useState(1);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      defaultValue: 1,
      min: 1,
      max: inStock,
      value: itemAmount,
      onChange: (e) => {
        setItemAmount(e);
      },
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  return (
    <>
      <section className="item-page" key={currentItem.id}>
        <Box bg={"whiteAlpha.100"} className="item-left">
          <h1 className="item-page-name" key={currentItem.id}>
            {currentItem.name}
          </h1>
          <SwiperSlideForImages images={currentItem.images} />
          <Box className="item-page-stuff-wrapper">
            <Box className="amount-buttons" maxW={"50%"} pr="25px" pl="25px">
              <Button {...dec}>-</Button>
              <Input
                // maxW={"60px"}
                mx={"2px"}
                {...input}
                textAlign="center"
              />
              <Button {...inc}>+</Button>
            </Box>
            <Box className="item-page-buttons">
              <Button
                colorScheme={"blue"}
                size="lg"
                onClick={() => {
                  let temp = [...cartItems];
                  temp.push(currentItem);
                  setCartItems(temp);
                  console.log(cartItems);
                }}
              >
                Add To Cart
              </Button>
              <Button colorScheme={"green"} size="lg">
                Buy Now
              </Button>
            </Box>
          </Box>
        </Box>
        <Box bg={"whiteAlpha.100"} className="item-right"></Box>
      </section>
    </>
  );
};
