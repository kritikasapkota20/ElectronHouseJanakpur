import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from 'prop-types';

const defaultBanners = [
  {
    title: "Energy-Efficient Living",
    description: "Embrace the future of home living with energy-efficient, sustainable devices at Electron House.",
    image: "/products/tv1.jpg",
    link: "/collections/air-conditioners"
  },
 
  {
    title: "Smart Home Solutions",
    description: "Explore a curated range of intelligent electronics designed to elevate your lifestyle.",
    image: "/product/electronhouse.jpg",
    link: "/collections/laundry"
  },
  {
    title: "Advanced Refrigeration Systems",
    description: "Upgrade your home with innovative, top-tier refrigeration systems designed for modern living.",
    image: "/product/refrigerator.jpg",
    link: "/collections/refrigeration"
  },
  {
    title: "Comfortable Cooling Systems",
    description: "Explore smart appliances for cooling, cleaning, and cooking, offering advanced technology and effortless control.",
    image: "/product/ac.jpg",
    link: "/collections/kitchen-appliances"
  },
 


];

const Banner = ({ banners = defaultBanners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!banners || banners.length === 0 || isPaused) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners, isPaused]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  if (!banners || banners.length === 0) return null;

  return (
    <section 
      className="relative w-full  h-[500px] md:h-[700px] overflow-hidden  "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-3 backdrop-blur-sm transition-all hover:bg-black/50"
      >
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-3 backdrop-blur-sm transition-all hover:bg-black/50"
      >
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="absolute h-full w-full"
        >
          <div className="relative h-full w-full   ">
            <img
              src={banners[currentIndex].image}
              alt={banners[currentIndex].title}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="absolute inset-0 flex  ">
            <div className="container mx-auto px-16 sm:px-12 md:px-8 py-20">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative max-w-2xl space-y-6 lg:space-y-10 pl-4  md:pl-8 lg:pl-12 mt-7"
              >
                <h1 className="
                text-2xl sm:text-3xl font-bold leading-tight text-white lg:text-5xl">
                  {banners[currentIndex].title}
                </h1>
                <p className="text-base sm:text-lg text-gray-200 md:text-xl lg:max-w-[80%]">
                  {banners[currentIndex].description}
                </p>
                <div className="mt-4 md:mt-6">
                  <Link
                    href={"/products"}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primaryHover px-4 sm:px-6 lg:px-8 py-3 sm:text-sm lg:text-lg font-semibold text-white transition-all  md:py-4"
                  >
                    Explore Collection
                    <svg className="h-5 w-5" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-blue-500' : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Pause/Play Button */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute bottom-8 right-8 z-20 rounded-full bg-black/30 p-2.5 backdrop-blur-sm transition-all hover:bg-black/50"
      >
        {isPaused ? (
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>
    </section>
  );
};

Banner.propTypes = {
  banners: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })
  )
};

export default Banner;