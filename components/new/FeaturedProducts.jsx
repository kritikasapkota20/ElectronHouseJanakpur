"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar, FaRegStar } from 'react-icons/fa';

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});
const SwiperSlide = dynamic(
  () => import("swiper/react").then((mod) => mod.SwiperSlide),
  {
    ssr: false,
  }
);
import { Navigation, Pagination } from "swiper";

const FeaturedProducts = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [wishlistItems, setWishlistItems] = useState([]);

  const featuredProducts = [
    {
      id: 1,
      name: "Samsung 55-inch QLED 4K Smart TV",
      brand: "Samsung",
      slug: "samsung-55-inch-qled-4k-smart-tv",
      description: "Experience stunning visuals with Samsung's QLED technology. This 4K Smart TV features Quantum Dot technology for vibrant colors, HDR support for enhanced contrast, and a powerful processor for smooth performance.",
      image: "/products/tv1.jpg",
      rating: 4.5,
      reviewCount: 128,
      category: "Televisions"
    },
    {
      id: 2,
      name: "LG Inverter Split AC",
      brand: "LG",
      slug: "lg-inverter-split-ac",
      description: "Energy-efficient cooling with advanced inverter technology. Features dual cooling, anti-virus protection, and smart connectivity for optimal comfort.",
      image: "/product/ac.jpg",
      rating: 4.3,
      reviewCount: 95,
      category: "Air Conditioners"
    },
    {
      id: 3,
      name: "Samsung Side by Side Refrigerator",
      brand: "Samsung",
      slug: "samsung-side-by-side-refrigerator",
      description: "Spacious side-by-side refrigerator with Twin Cooling Plus technology. Features digital inverter compressor, deodorizer, and smart connectivity.",
      image: "/product/refrigerator.jpg",
      rating: 4.7,
      reviewCount: 156,
      category: "Refrigerators"
    },
    {
      id: 4,
      name: "Crompton Ceiling Fan",
      brand: "Crompton",
      slug: "crompton-ceiling-fan",
      description: "Energy-efficient ceiling fan with powerful air delivery. Features anti-dust technology and silent operation for enhanced comfort.",
      image: "/product/fan.jpg",
      rating: 4.4,
      reviewCount: 112,
      category: "Fans"
    }
  ];

  // Function to toggle wishlist status
  const toggleWishlist = (productId) => {
    setWishlistItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-8 bg-white" data-aos="fade-up">
      <div className="">
        <div className="flex flex-col ">
          <div className="flex items-center text-center  justify-center mb-8">
            <h2 className="text-2xl md:text-3xl  font-bold text-gray-800 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-24 after:h-1 after:bg-primary">
              Featured Products
            </h2>
          </div>

          {/* Sort and View Options */}
          <div className="flex justify-between items-center mb-6">
            <p className="mt-2 text-base text-gray-500">Explore our latest and best-selling products!</p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'text-primary' : 'text-gray-400'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zm-12 6h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zm-12 6h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'text-primary' : 'text-gray-400'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div
            className={`grid ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full h-h-full'
                : 'grid-cols-1'
            } gap-4`}
          >
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className={`group bg-white px-2 rounded-lg overflow-hidden shadow-md hover:mt-[-12px] transition-all duration-300 ${
                  viewMode === 'list' ? 'flex items-start border p-4 gap-12 w-full' : ''
                }`}
              >
                {/* Product Image */}
                <div className={`relative ${viewMode === 'list' ? 'w-72 h-full' : 'w-full h-56'} flex-shrink-0 p-2 `}>
                  <div className="relative h-full w-full cursor-pointer overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="space-y-2 pt-4 pb-4">
                    {/* Product Name */}
                    <h3 className={`text-base ${viewMode==='list'? "" :"text-center"}  font-medium text-gray-900 cursor-pointer hover:text-primary transition-colors duration-300`}>
                      {product.brand} {product.name}
                    </h3>

                    {/* Rating and Sold */}
                    <div className={` ${viewMode==='list'? "" :"justify-center"} flex items-center space-x-2`}>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`${
                              i < product.rating ? 'text-yellow-400' : 'text-gray-300'
                            } text-sm`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({product.reviewCount})</span>
                    </div>

                    {/* Description (Only in List View) */}
                    {viewMode === 'list' && (
                      <p className="text-sm text-gray-600">
                        {product.description}
                      </p>
                    )}

                    {/* View Details Button */}
                    <div className={`mt-4 ${viewMode === 'grid' ? 'flex flex-col items-center' : 'flex items-center justify-between pr-6'}`}>
                      <Link
                        href={`/products/${product.slug}`}
                        className={`flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-primary text-white hover:bg-primaryHover transition-all duration-300 ${
                          viewMode === 'grid' ? 'w-full' : 'w-[150px]'
                        }`}
                      >
                        <span className="text-base font-medium">View Details</span>
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
