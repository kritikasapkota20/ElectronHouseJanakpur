import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product_card } from "..";
const Products = ({ innerCatId }) => {
  const [products, setProducts] = useState([""]);
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/product_section/product/${innerCatId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="px-2">
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
        {products &&
          products.map((item, index) => (
            <div key={index} className="flex-none w-[200px] snap-center">
              <Product_card
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
