import React, { useEffect, useState, useRef } from "react";
import { fetch_innercat } from "../../redux/category/inner_category/inner_catActions";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import axios from "axios";

const InnerCategory = ({ mainCatId, subCatId, subCatTitle }) => {
  const [filteredInnerCat, setFilteredInnerCat] = useState([""]);
  const [active, setActive] = useState(false);
  const [menuHeight, setMenuHeight] = useState("0px");
  const innerCategory = useSelector((state) => state.innerCategory);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetch_innercat());
    const fetchCategories = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/category/inner_category/list`
      );
      const newData = response?.data?.innerCategories?.filter((item) => {
        return item.subCatId._id == subCatId;
      });
      setFilteredInnerCat(newData);
    };

    fetchCategories();
  }, [mainCatId, subCatId]);

  const bar = useRef(null);
  const toggleOutline = () => {
    setActive((prevActive) => !prevActive);
    setMenuHeight((prevHeight) =>
      prevHeight === "0px" ? `${bar.current.scrollHeight}px` : "0px"
    );
  };
  return (
    <div>
      <div onClick={toggleOutline}>
        <p className="font-medium text-base text-gray-100 cursor-pointer bg-gray-600 py-1 mx-12 rounded">
          {subCatTitle}
        </p>
        <p className="absolute right-16 top-0 text-white text-xl font-bold">
          {active ? "-" : "+"}
        </p>
      </div>
      <div
        ref={bar}
        style={{
          maxHeight: `${menuHeight}`,
          transition: "max-height 0.6s ease",
        }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-4 gap-2 mt-4">
          {filteredInnerCat &&
            filteredInnerCat.map((item, index) => (
              <div
                className="flex flex-col justify-center items-center"
                key={index}
              >
                <div>
                  {item.image ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/inner_category/${item.image}`}
                      alt=""
                      className="object-cover h-[4rem] w-[5rem]"
                      style={{
                        clipPath:
                          "polygon(50% 0, 83% 25%, 83% 75%, 50% 100%, 17% 75%, 17% 25%)",
                      }}
                    />
                  ) : (
                    <img
                      src="/slider2.jpg"
                      alt=""
                      className="object-cover h-[4rem] w-[5rem]"
                      style={{
                        clipPath:
                          "polygon(50% 0, 83% 25%, 83% 75%, 50% 100%, 17% 75%, 17% 25%)",
                      }}
                    />
                  )}
                </div>
                <Link passHref href={`/product_category/${item.slug}`}>
                  <p className="font-medium w-full text-sm text-gray-100 cursor-pointer py-1 rounded">
                    {item.title}
                  </p>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default InnerCategory;
