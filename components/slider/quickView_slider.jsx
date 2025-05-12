import React, {useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

const QuickViewSlider = ({ images, handleCurrentImage }) => {
  const [active, setActive] = useState(0);
  return (
    <div className="py-4">
      <Swiper
        centeredSlides={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        navigation={true}
        slidesPerView={3}
        spaceBetween={8}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 8,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 8,
          },
        }}
        modules={[Autoplay, Navigation]}
        className="quickView_slider"
      >
        {images &&
          images.map((item, i) => (
            <SwiperSlide key={i}>
              <img
                onClick={() => {
                  handleCurrentImage(
                    `${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${item.fileName}`
                  );
                  setActive(i);
                }}
                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${item.fileName}`}
                alt={item.fileName}
                className={`object-cover w-[100%] rounded h-[8rem] cursor-pointer ${
                  active == i ? "border-2 border-green-600" : null
                }`}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default QuickViewSlider;
