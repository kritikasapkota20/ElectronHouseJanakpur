import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import axios from "axios";
import CarouselCard from "../product_card/carousel_card";

export default function CarouselSlider({ innerCatslug }) {
  const [products, setProducts] = useState([""]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/product_filter/inner_category/${innerCatslug}`
      );
      setProducts(response.data.filteredProducts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [innerCatslug]);

  return (
    <>
      <Swiper
        centeredSlides={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        navigation={true}
        // slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="carousel_slider"
      >
        {products &&
          products.map((item, i) => (
            <SwiperSlide key={i}>
              <CarouselCard
                key={i}
                title={item.title}
                slug={item.slug}
                price={item.sellingPrice}
                _id={item._id}
                image={item.featureImage}
                description={item.description}
                markPrice={item.markPrice}
                discount={item.discount}
                adminId={item.adminId}
                innerCatslug={item?.innerCatId?.slug}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
