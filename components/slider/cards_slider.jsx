import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BannerCard } from "..";
import { EffectCards } from "swiper";
import { Autoplay } from "swiper";
export default function CardSlider({ delay, products }) {

  return (
    <>
      <Swiper
        autoplay={{
          delay: delay,
          disableOnInteraction: true,
        }}
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Autoplay]}
        className="bannerCardSwiper"
      >
        {products &&
          products.map((item, i) => (
            <SwiperSlide key={i}>
              <div>
                <BannerCard
                  title={item.title}
                  slug={item.slug}
                  price={item.sellingPrice}
                  _id={item._id}
                  image={item.featureImage}
                  description={item.description}
                  markPrice={item.markPrice}
                  discount={item.discount}
                  adminId={item.adminId}
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
