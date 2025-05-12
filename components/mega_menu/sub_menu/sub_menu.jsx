import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetch_subcat } from "../../../redux/category/sub_category/sub_catActions";
import Inner_Menu from "../inner_menu/inner_menu";

const Sub_Menu = ({ setDisplayMenu, mainCatId, closeMegaMenu }) => {
  const [filteredSubCat, setFilteredSubCat] = useState([""]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const subCatList = useSelector((state) => state.subCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_subcat());
    if (subCatList) {
      const newData = subCatList?.data?.subCategories.filter(
        (item) => item.mainCatId?._id === mainCatId
      );
      setFilteredSubCat(newData);
    }
  }, []);

  const handleMouseMove = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <>
      <div
        onMouseMove={handleMouseMove}
        className="flex justify-center items-center h-[100%] "
      >
        <div className="absolute top-[1.8rem] w-[90%] mx-auto z-[990] h-[100vh] mb-10 overflow-y-scroll overflow-box">
          <section className="bg-gray-600 rounded backdrop-filter backdrop-blur-xl bg-opacity-70 shadow">
            <div className="max-w-screen-xl px-4 py-4 mx-auto sm:px-6 lg:px-8">
              <div className="">
                <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-5">
                  {subCatList &&
                    filteredSubCat?.map((item, index) => (
                      <div key={index}>
                        <p className="font-semibold text-xs text-gray-800 dark:text-gray-100 cursor-pointer uppercase tracking-wider">
                          {item.title}
                        </p>
                        <Inner_Menu
                          mainCatId={mainCatId}
                          subCatId={item._id}
                          position={position}
                          closeMegaMenu={closeMegaMenu}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Sub_Menu;
