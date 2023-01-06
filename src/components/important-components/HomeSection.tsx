import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { ShopBox } from "../ShopBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box } from "@chakra-ui/react";
import { itemsState, languageState } from "../../atoms";
import { useRecoilValue } from "recoil";

export const HomeSection = () => {
  const items = useRecoilValue(itemsState);
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
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(inputText)
  );
  console.log("filteredItems :", filteredItems);
  return (
    <>
      <Header
        getInputText={getInputText}
        login="./login"
        register="./register"
      />
      <section>
        <Box bg={"whiteAlpha.800"} h="75px"></Box>
        {language === "en" ? (
          <h1 className="best-seller-heading">New Products</h1>
        ) : (
          <h1 className="best-seller-heading">ახალი პროდუქტები</h1>
        )}

        <div className="best-seller">
          <div className="best-seller-box">
            <div className="best-seller-items">
              {filteredItems.slice(0, 6).map((item) => {
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
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};