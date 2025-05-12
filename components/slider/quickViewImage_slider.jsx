import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

const QuickViewImageSlider = ({ image, product }) => {
  return (
    <div>
      <Swiper
        centeredSlides={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        navigation={true}
        // slidesPerView={3}
        spaceBetween={5}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
        }}
        modules={[Autoplay, Navigation]}
        className="quickViewImage_slider"
      >
        <SwiperSlide>
          <img src={`${image}`} alt={image} className="w-full rounded" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default QuickViewImageSlider;
