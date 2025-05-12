import React from "react";
import Banner from "../components/new/Banner";
import Categories from "../components/new/Categories";
import FeaturedProducts from "../components/new/FeaturedProducts";
import Testimonials from "../components/new/Testimonials";
import About from "../components/new/About";

// import Banners from "../public/img.jpg";



export default function Home() {
  return (
    // max-w-7xl mx-auto px-4 md:px-8 py-8
    <div className="">
      <Banner />
      <About />
      {/* <Categories /> */}
      <FeaturedProducts />
      <Testimonials/>
    </div>
  );
}


