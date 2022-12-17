import { useEffect, useState } from "react";
import { Header } from "./Header";
import { ShopBox } from "./ShopBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box } from "@chakra-ui/react";

export const HomeSection = () => {
  const [items, setItems] = useState([]);
  const [inputText, setInputText] = useState("");
  const getInputText = (text) => {
    setInputText(text);
  };
  useEffect(() => {
    fetch(
      // 'https://geolab-project.herokuapp.com/items'
      "http://localhost:3006/items"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data ", data);
        setFilteredItems(data);
        setItems(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) => item.name.toLowerCase().includes(inputText))
    );
  }, [inputText]);

  return (
    <>
      <Header getInputText={getInputText} />
      <section>
        {/* <Swiper
          navigation={true}
          modules={[Navigation]}
          loop
          className="banner"
        >
          <SwiperSlide
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: "600px",
                width: "100%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url('https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')`,
              }}
            ></div>
          </SwiperSlide>
          <SwiperSlide
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                height: "600px",
                width: "100%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url('https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')`,
              }}
            ></div>
          </SwiperSlide>
        </Swiper> */}

        <Box bg={"whiteAlpha.800"} h="75px"></Box>
        <h1 className="best-seller-heading">New Products</h1>
        <div className="best-seller">
          <div className="best-seller-box">
            <div className="best-seller-items">
              {filteredItems.map((item) => (
                <ShopBox
                  boxType={"normal"}
                  key={item.id}
                  itemId={item.id}
                  itemName={item.name}
                  itemPrice={item.price}
                  itemSalePrice={item.salePrice}
                  itemGelPrice={item.gelPrice}
                  itemSaleGelPrice={item.saleGelPrice}
                  itemImages={item.images}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
