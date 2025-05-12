import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Product_card } from "@/components";

const Keyword = () => {
  const router = useRouter();
  const { keywords } = router.query;
  const [products, setProducts] = useState([""]);
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/product/search/${keywords}`
      );
      setProducts(response.data);
    };
    fetchProduct();
  }, [keywords]);
  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-5 grid-cols-2 gap-2">
        {products &&
          products.map((item, index) => (
            <Product_card
              key={index}
              // loading={loading}
              title={item.title}
              slug={item.slug}
              price={item.sellingPrice}
              _id={item._id}
              images={item.images}
              description={item.description}
              markPrice={item.markPrice}
              discount={item.discount}
            />
          ))}
      </div>
    </div>
  );
};

export default Keyword;
