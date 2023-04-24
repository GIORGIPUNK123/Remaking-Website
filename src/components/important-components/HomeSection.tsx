import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { ShopBox } from "../ShopBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box, Heading, Text } from "@chakra-ui/react";
import { macsState, languageState, generalMacsState } from "../../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { ItemTypes } from "../../types";

export const HomeSection = () => {
  const generalMacs = useRecoilValue(generalMacsState);
  const [items, setItems] = useState<any>([]);
  const language = useRecoilValue(languageState);
  const [inputText, setInputText] = useState("");
  const getInputText = (text: string) => {
    setInputText(text);
  };
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
  useEffect(() => {
    setItems([...generalMacs]);
  }, [generalMacs]);

  console.log("items: ", items);
  // console.log("macs: ", macs);
  // const filteredItems = items.filter((item) =>
  //   item.name.toLowerCase().includes(inputText)
  // );
  // console.log("filteredItems :", filteredItems);
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
        {language === "en" ? (
          <Heading
            className="best-seller-heading"
            fontSize={{ base: "24px", xl: "36px" }}
            mt="80px"
            mb="80px"
            textAlign="center"
          >
            New Products
          </Heading>
        ) : (
          <Heading
            className="best-seller-heading"
            fontSize={{ base: "24px", sm: "28px", md: "32px", xl: "36px" }}
            mt="80px"
            mb="80px"
            textAlign="center"
          >
            ახალი პროდუქტები
          </Heading>
        )}

        <div className="best-seller">
          <Box
            className="best-seller-box"
            display={{ base: "none", md: "flex" }}
          >
            <div className="best-seller-items">
              {items.slice(0, 6).map((item: any) => {
                console.log("item.images :", item.images);
                return (
                  <ShopBox
                    key={item.id}
                    itemId={item.id}
                    itemName={item.name}
                    itemPrice={item.startingPrice}
                    itemGelPrice={item.startingGelPrice}
                    itemImages={item.images}
                    itemType={item.type}
                    itemCategory={item.category}
                    general
                  />
                );
              })}

              {/* {filteredItems.slice(0, 6).map((item) => {
                console.log("item.images :", item.images);
                return (
                  <ShopBox
                    key={item.id}
                    itemId={item.id}
                    itemName={item.name}
                    itemPrice={item.price}
                    itemSalePrice={item.salePrice}
                    itemGelPrice={item.gelPrice}
                    itemSaleGelPrice={item.saleGelPrice}
                    itemImages={item.images}
                  />
                );
              })} */}
            </div>
          </Box>
          <Box
            className="best-seller-items"
            display={{ base: "flex", md: "none" }}
          >
            {/* {filteredItems.slice(0, 6).map((item) => {
              console.log("item.images :", item.images);
              return (
                <ShopBox
                  key={item.id}
                  itemId={item.id}
                  itemName={item.name}
                  itemPrice={item.price}
                  itemSalePrice={item.salePrice}
                  itemGelPrice={item.gelPrice}
                  itemSaleGelPrice={item.saleGelPrice}
                  itemImages={item.images}
                />
              );
            })} */}
          </Box>
        </div>
      </section>
    </>
  );
};
