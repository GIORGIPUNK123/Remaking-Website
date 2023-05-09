import React from "react";
import { Box } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
export const SwiperSlideForImages = (props: { images: any }) => {
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
