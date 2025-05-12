import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetch_subcat } from "../../redux/category/sub_category/sub_catActions";
import InnerCategory from "./inner_category";

const SubCategory = ({ mainCatId }) => {
  const [filteredSubCat, setFilteredSubCat] = useState([""]);
  const subCatList = useSelector((state) => state.subCategory);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetch_subcat());

    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/category/sub_category/list`
    );
    const newData = response?.data?.subCategories.filter(
      (item) => item.mainCatId?._id === mainCatId
    );
    setFilteredSubCat(newData);
  };
  return (
    <div>
      <div className="flex flex-col gap-4 overflow-hidden">
        {subCatList &&
          filteredSubCat?.map((item, index) => (
            <div key={index} className="relative">
              <div>
                <InnerCategory
                  subCatTitle={item.title}
                  mainCatId={mainCatId}
                  subCatId={item._id}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SubCategory;
