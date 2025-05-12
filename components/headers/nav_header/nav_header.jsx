import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sub_Menu } from "../../mega_menu";
import { fetchRootcat } from "../../../redux/category/main_category/root_catActions";

const Nav_header = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [mainCatId, setMainCatId] = useState("");
  const dispatch = useDispatch();
  const mainCatList = useSelector((state) => state.rootCategory);

  useEffect(() => {
    dispatch(fetchRootcat());
  }, []);
  const closeMegaMenu = () => {
    setDisplayMenu(false);
  };
  return (
    <div
      // onMouseEnter={e => {
      //   setDisplayMenu(true)
      // }}

      className="bg-rose-600 dark:bg-slate-800 border-2 border-slate-400 text-gray-50 dark:text-gray-400 sticky top-[4.2rem] z-[950] w-full lg:block hidden"
    >
      <div className="text-center py-1">
        <ul className="w-[100%]">
          {mainCatList?.data?.mainCategories?.map((item, index) => (
            <li key={index} className="inline-block ml-4">
              <p
                onMouseEnter={(e) => {
                  setMainCatId(item._id);
                  setDisplayMenu(true);
                }}
                // onClick={(e) => {
                //   setMainCatId(item._id);
                //   setDisplayMenu(true);
                // }}
                onMouseLeave={(e) => {
                  setDisplayMenu(false);
                }}
                className="tracking-wider cursor-pointer text-sm uppercase"
              >
                {item.title}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {displayMenu && (
        <div
          onMouseEnter={(e) => {
            setDisplayMenu(true);
          }}
          onMouseLeave={(e) => {
            setDisplayMenu(false);
          }}
        >
          <Sub_Menu
            setDisplayMenu={setDisplayMenu}
            mainCatId={mainCatId}
            closeMegaMenu={closeMegaMenu}
          />
        </div>
      )}
    </div>
  );
};

export default Nav_header;
