import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
const Slider = ({ sliderData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(null);
  const mouseStartX = useRef(null);
  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === sliderData.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? sliderData.length - 1 : prevSlide - 1
    );
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 5000);
  //   currentSlide > sliderData.length && setCurrentSlide(0);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <div className="slider-container">
      {sliderData.map((slide, index) => (
        <div
          key={index}
          className={`slider-slide ${index == currentSlide ? "active" : ""}`}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/slider/${slide.image}`}
            alt={slide.title}
            className="slider-image brightness-50"
          />
          <div className="slider-content">
            <h3 className="text-gray-100 lg:text-3xl text-xl tracking-wider capitalize font-serif">
              {slide.title}
            </h3>
            <p className="lg:py-6 py-2 tracking-wider capitalize  lg:text-xl text-gray-100">
              {slide.description}
            </p>
            <button className="lg:text-base text-white hover:px-4 text-sm border-2 border-gray-100 hover:bg-red-600 transition-all duration-500  rounded-full px-4 py-1">
              <Link passHref href={slide.link}>
                Shop Now
              </Link>
              <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
      ))}
      <div className="slider-bullets">
        {sliderData.map((_, index) => (
          <div
            key={index}
            className={`slider-bullet ${
              index == currentSlide ? "active" : ""
            }`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
      <button className="slider-prev" onClick={prevSlide}>
        <i className="fas fa-arrow-alt-left text-2xl"></i>
      </button>
      <button className="slider-next" onClick={nextSlide}>
        <i className="fas fa-arrow-alt-right text-2xl"></i>
      </button>
    </div>
  );
};
const BannerSlider = () => {
  const [sliders, setSliders] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/slider/get_all`
      );
      setSliders(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Slider sliderData={sliders} />
    </div>
  );
};

export default BannerSlider;
