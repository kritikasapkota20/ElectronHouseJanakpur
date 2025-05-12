"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rebecca Davidson",
      position: "MBBS Doctor",
      avatar: "",
      rating: 5,
      text: "Excellent products and incredible customer service! I ordered a pair of wireless headphones that arrived quickly and exceeded my expectations. Will definitely shop here again.",
    },
    {
      id: 2,
      name: "Jason Powell",
      position: "Teacher",
      avatar: "https://picsum.photos/400/400?random=2",
      rating: 4,
      text: "I've been a customer for years and have always had great experiences. The website is easy to navigate and the delivery is consistently fast and reliable.",
    },
    {
      id: 3,
      name: "Sarah Newman",
      position: "Digital Creator",
      avatar: "",
      rating: 5,
      text: "The pricing is competitive and the selection is amazing. I found a laptop that was out of stock everywhere else. Customer support was helpful when I had questions about my order.",
    },
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className=" ">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold  text-gray-800 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-24 after:h-1 after:bg-primary ">
          What Our Clients Say
        </h2>
</div>
        {/* Swiper Component */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="py-5 px-2.5 pb-16"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* Rating */}
                <div className="text-yellow-400 text-xl mb-4">
                  {"★".repeat(testimonial.rating)}
                  {"☆".repeat(5 - testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 text-base leading-relaxed mb-6 flex-grow">
                  {testimonial.text}
                </p>

                {/* User Info */}
                <div className="flex items-center mt-auto">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-gray-200">
                    <img
                      src={
                        testimonial.avatar
                          ? testimonial.avatar
                          : `https://picsum.photos/400/400?random=${index + 1}`
                      }
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-1">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;