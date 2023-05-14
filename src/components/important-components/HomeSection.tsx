import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { ShopBox } from "../ShopBox";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box, Heading, Text } from "@chakra-ui/react";
import {
  macsState,
  languageState,
  generalMacsState,
  generalItemsState,
} from "../../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { ItemTypes } from "../../types";

interface FilteredItemsProps {
  gelPrice: number;
  id: number;
  images: string[];
  inStock: number;
  name: string;
  price: number;
  saleGelPrice: number;
  salePrice: number;
  type: string;
}

export const HomeSection = () => {
  const generalMacs = useRecoilValue(generalMacsState);
  const [generalItems, setGeneralItems] = useRecoilState(generalItemsState);
  const language = useRecoilValue(languageState);
  const [inputText, setInputText] = useState("");
  const getInputText = (text: string) => {
    setInputText(text);
  };
  console.log("generalItems: ", generalItems);
  return (
    <>
      <Header
        getInputText={getInputText}
        login="./login"
        register="./register"
        profile="./profile"
      />
      <section>
        <Box bg={"whiteAlpha.800"} h="125px" />
        <Heading
          className="best-seller-heading"
          fontSize={{ base: "24px", xl: "36px" }}
          mt="80px"
          mb="80px"
          textAlign="center"
        >
          {language === "en" ? "New Products" : "ახალი პროდუქტები"}
        </Heading>
        <div className="best-seller">
          <Box
            className="best-seller-box"
            display={{ base: "none", md: "flex" }}
          >
            <div className="best-seller-items">
              {generalItems.slice(0, 6).map((item: any, index: number) => {
                console.log("item.images :", item.images);
                return <ShopBox key={index} {...item} general />;
              })}
            </div>
          </Box>
        </div>
      </section>
    </>
  );
};
