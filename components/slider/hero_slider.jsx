// import HeroSlider, { Overlay, Slide, MenuNav, Nav } from "hero-slider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import Swal from "sweetalert2";

export default function NewSlider() {
  const [sliders, setSliders] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/slider/get_all`
      );
      setSliders(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full">
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="slider-mySwiper overflow-hidden w-full"
      >
        {sliders &&
          sliders.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="relative">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/slider/${item.image}`}
                  alt={item.title || "Image not found"}
                  className="w-full h-full"
                />
                <div className="bg-[#53535358] absolute top-0 w-full h-full z-[100]"></div>
                <div className=" absolute lg:top-[8rem] top-[2rem] py-4 z-[999] mx-auto left-0  lg:w-[40%] w-[100%]">
                  <h1 className="py-2 lg:text-4xl text-2xl font-semibold text-gray-100 tracking-widest">
                    {item.title}
                  </h1>
                  <p className="px-2 py-4 lg:text-lg text-sm text-gray-100">
                    {item.description}
                  </p>
                  <div>
                    <button
                      type="button"
                      class="text-white bg-gradient-to-br from-green-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
                    >
                     Show Now
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
