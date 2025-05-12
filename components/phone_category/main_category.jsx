import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_innercat } from "../../redux/category/inner_category/inner_catActions";
import Link from "next/link";
import SubCategory from "./sub_category";
const MainCategory = () => {
  const [active, setActive] = useState(false);
  const [mainHeight, setmainHeight] = useState("0px");
  const [productCategories, setProductCategories] = useState([]);
  const box = useRef(null);
  const dispatch = useDispatch();
  const innerCategory = useSelector((state) => state.innerCategory);
  useEffect(() => {
    dispatch(fetch_innercat());
    const newData = innerCategory?.data?.innerCategories?.filter((item) => {
      return item.mainCatId._id == "65b68e0ec4eaca66abb43284";
    });
    setProductCategories(newData);
  }, [innerCategory]);
  const toggleOutline = () => {
    setActive((prevActive) => !prevActive);
    setmainHeight((prevHeight) =>
      prevHeight === "0px" ? `${box.current.scrollHeight}px` : "0px"
    );
  };
  return (
    <div className="lg:hidden block lg:w-[15%] w-[100%] sticky z-[2]">
      <div className="text-center">
        <div className="flex flex-col gap-2 px-4">
          {productCategories &&
            Array.isArray(productCategories) &&
            productCategories.map((productCategory, index) => (
              <div key={index} className="flex items-center justify-center py-2">
                <Link
                  passHref
                  href={`/product_category/${productCategory.slug}`}
                >
                  <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-500 to-orange-400 group-hover:from-green-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span className="relative px-2 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-[15rem]">
                      <div className="flex gap-2 justify-center items-center">
                        <img
                          src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/inner_category/${productCategory.image}`}
                          alt={productCategory.title || "Image not found"}
                          className="w-10 h-10 rounded-3xl"
                        />
                        <h1 className="text-lg tracking-wider font-semibold pl-4 cursor-pointer">
                          {productCategory.title}
                        </h1>
                      </div>
                    </span>
                  </button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainCategory;
