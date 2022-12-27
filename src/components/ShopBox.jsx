// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { languageState, valueState } from "../atoms";
import { useRecoilValue } from "recoil";

const MoneyDisplay = (props) => {
  if (useRecoilValue(valueState) === "gel") {
    if (props.itemSaleGelPrice === 0) {
      return (
        <div className="shopbox-prices-normal">
          <h2 className="shopbox-normal-price">{props.itemGelPrice}₾</h2>
        </div>
      );
    } else
      <div className="shopbox-prices-normal">
        <h2 className="shopbox-sale-price">{props.itemSaleGelPrice}₾</h2>
        <h2 className="shopbox-normal-price">{props.itemGelPrice}₾</h2>
      </div>;
  } else {
    if (props.itemSalePrice === 0) {
      return (
        <div className="shopbox-prices-normal">
          <h2 className="shopbox-normal-price">{props.itemPrice}$</h2>
        </div>
      );
    } else
      <div className="shopbox-prices-normal">
        <h2 className="shopbox-sale-price">{props.itemSalePrice}$</h2>
        <h2 className="shopbox-normal-price">{props.itemPrice}$</h2>
      </div>;
  }
};
export const ShopBox = (props) => {
  const language = useRecoilValue(languageState);
  return (
    <div className="shopbox shopbox-normal">
      <span className="shop-box-name">{props.itemName}</span>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="shop-box-images"
        loop={true}
      >
        {props.itemImages.map((image, index) => (
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
      <MoneyDisplay {...props} />
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
              ? `../item/${props.itemId}`
              : `/item/${props.itemId}`
          }
        >
          {language === "en" ? "View" : "ნახე ვრცლად"}
        </Link>
      </Button>
    </div>
  );
};
