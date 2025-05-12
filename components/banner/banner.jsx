import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
const Banner = () => {
  const [categorySections, setCategorySections] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/category_section/get_all`
        );
        setCategorySections(response.data);
        console.log(response);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mx-auto my-4 p-4">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 mt-[2rem]">
        {categorySections &&
          categorySections.splice(0, 4).map((item, i) => (
            <div
              data-aos="flip-down"
              key={i}
              className="relative lg:h-[18rem] h-[12rem]"
            >
              <div className="">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/category_section/${item.image}`}
                  alt={item.block}
                  className="object-cover lg:h-[18rem] h-[12rem] brightness-50 rounded w-full"
                  onClick={() => openProductPage(slug)}
                />
                <div className="overlay"></div>
              </div>
              <div className="absolute bottom-8 left-0 lg:px-8 px-4 text-green-50">
                <p className="tracking-wider py-2 lg:text-xl text-sm font-serif capitalize">
                  {item.description}
                </p>
                <button className="lg:text-base hover:px-4 text-sm border-2 border-gray-100 hover:bg-rose-600 transition-all duration-500  rounded-full px-2">
                  <Link passHref href={item.link}>
                    Shop Now
                  </Link>
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Banner;
