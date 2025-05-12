import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Product_card, Banner, Banner2 } from "..";
import ProductLoaderOne from "../loaders/productLoader";
import TabComponent from "./product_tab";
const Feature_product = ({ products }) => {
  return (
    <div className="">
      <div className="">
        <div className="container mx-auto">
          {/* <TabComponent products={products} /> */}
          <div className="grid lg:grid-cols-5 grid-cols-2 lg:gap-4 gap-2 py-4">
            {products &&
              products.map((item, index) => (
                <Product_card
                  key={index}
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
                  product={item}
                />
              ))}
          </div>
        </div>
      </div>
      <Banner />
      <div className="px-2">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-5 grid-cols-2 lg:gap-4 gap-2 py-4">
            {products &&
              products.map((item, index) => (
                <Product_card
                  key={index}
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
                  product={item}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature_product;
