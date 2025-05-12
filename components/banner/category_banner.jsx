import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const InnerCategories = ({ subCatId }) => {
  const [filteredInnerCat, setFilteredInnerCat] = useState([""]);
  useEffect(() => {
    fetchInnerCat();
  }, [subCatId]);
  const fetchInnerCat = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/category/inner_category/list`
    );
    const newData = response?.data?.innerCategories?.filter((item) => {
      return item.subCatId._id == subCatId;
    });
    setFilteredInnerCat(newData);
  };
  return (
    <div className="grid grid-cols-2 gap-2">
      {filteredInnerCat &&
        filteredInnerCat.map((item, i) => (
          <Link key={i} passHref href={`/product_category/${item.slug}`}>
            <div
              data-aos="flip-left"
              className="flex gap-3 items-center shadow-sm border-2 rounded-full bg-gray-600 backdrop-filter backdrop-blur-lg bg-opacity-25 border-slate-500 overflow-hidden hover:-translate-y-1 transition-all duration-200"
            >
              {item.image ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/inner_category/${item.image}`}
                  alt={item.title}
                  className="object-cover h-[4rem] w-[4rem] rounded"
                />
              ) : (
                <img
                  src="/slider2.jpg"
                  alt={item.title}
                  className="object-cover h-[4rem] w-[4rem] rounded"
                />
              )}
              <p className="text-gray-600 dark:text-gray-200 lg:text-sm text-xs capitalize">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
};

const CategoryBanner = () => {
  const [categorySections, setCategorySections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/banner_category/get-all`
        );
        setCategorySections(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <h3 className="text-xl font-normal text-gray-600 dark:text-gray-200 py-2 px-3 capitalize">
        Our top Categories
      </h3>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        {categorySections &&
          categorySections.map((item, i) => (
            <div className=" shadow rounded p-2" key={i}>
              <p className="text-base font-normal text-gray-600 dark:text-gray-200 py-2 capitalize">
                {item.title}
              </p>
              <InnerCategories subCatId={item.subCatId?._id} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryBanner;
