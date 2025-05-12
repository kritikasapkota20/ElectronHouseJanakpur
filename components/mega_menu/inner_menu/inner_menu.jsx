import React, { useEffect, useState } from "react";
import { fetch_innercat } from "../../../redux/category/inner_category/inner_catActions";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import QuickProductView from "@/components/quick_products_view/quick_product_view";

const Inner_Menu = ({ mainCatId, subCatId, position,closeMegaMenu }) => {
  const [filteredInnerCat, setFilteredInnerCat] = useState([""]);
  const [quickCatView, setQuickCatView] = useState(false);
  const [innerCatSlug, setInnerCatSlug] = useState("");
  const innerCategory = useSelector((state) => state.innerCategory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch_innercat());
    // if (innerCatList) {
    const newData = innerCategory?.data?.innerCategories?.filter((item) => {
      return item.subCatId._id == subCatId;
    });
    setFilteredInnerCat(newData);
    // }
    // fetch('http://localhost:3000/api/category/inner_category/list', {
    //   method: 'get',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data) {
    //       const newData = data?.innerCategories.filter(item => {
    //         return item.subCatId._id == subCatId
    //       })
    //       setFilteredInnerCat(newData)
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }, [mainCatId, subCatId]);
  const showQuickCategoryView = (catSlug) => {
    setInnerCatSlug(catSlug);
    setQuickCatView(true);
  };
  return (
    <div className="relative">
      {filteredInnerCat &&
        filteredInnerCat.map((item, index) => (
          <div
            key={index}
            className="relative flex items-center my-2 gap-2 border-2 shadow rounded-full hover:shadow-md transition-all duration-150"
          >
            {item.image ? (
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/inner_category/${item.image}`}
                alt=""
                className="object-cover h-[4rem] w-[4rem] rounded-l-full"
              />
            ) : (
              <img
                src="/slider2.jpg"
                alt=""
                className="object-cover h-[4rem] w-[4rem] rounded-l-full"
              />
            )}
            <Link passHref href={`/product_category/${item.slug}`}>
              <p
                onClick={closeMegaMenu}
                onMouseEnter={() => {
                  showQuickCategoryView(item.slug);
                }}
                onMouseLeave={() => setQuickCatView(false)}
                className="text-gray-800 dark:text-gray-100 text-sm cursor-pointer hover:text-red-500 transition-all duration-200 hover:text-base  tracking-wider"
              >
                {item.title}
              </p>
            </Link>
          </div>
        ))}
      {quickCatView && (
        <div
          className={`h-screen overflow-y-scroll overflow-box fixed top-[0rem] z-[999] ${
            position.x < 360
              ? "right-0 w-[68vw]"
              : position.x < 600
              ? "right-0 w-[52vw]"
              : position.x < 860
              ? "left-0 w-[36vw]"
              : position.x < 1110
              ? "left-0 w-[52vw]"
              : position.x < 1400
              ? "left-0 w-[70vw]"
              : "right-0 w-[70vw]"
          } bg-gray-800 backdrop-filter backdrop-blur-xl bg-opacity-80 rounded`}
        >
          <QuickProductView innerCatSlug={innerCatSlug} />
        </div>
      )}
    </div>
  );
};

export default Inner_Menu;
