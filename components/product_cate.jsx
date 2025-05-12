import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Product_card } from ".";
import Swal from "sweetalert2";
import { fetch_innercat } from "../redux/category/inner_category/inner_catActions";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
function Product_Category() {
  const [productCategorys, setProductCategorys] = useState([]);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFillterProducts] = useState([""]);
  const [activeTab, setActiveTab] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rangeActive, setRangeActive] = useState("");
  const [rangeHeight, setRangeHeight] = useState("100%");
  const [rangeRotate, setRangeRotate] = useState(false);
  const [mainCatSlug, setMainCatSlug] = useState("");
  const innerCategory = useSelector((state) => state.innerCategory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch_innercat());
    const newData = innerCategory?.data?.innerCategories?.filter((item) => {
      return item.mainCatId._id == "65b68e0ec4eaca66abb43284";
    });
    setProductCategorys(newData);
  }, [innerCategory]);
  const range = useRef(null);
  function rangeToggle() {
    setRangeActive(rangeActive === "" ? "text-red-600" : "");
    setRangeHeight(
      rangeActive === "text-red-600" ? "0px" : `${range.current.scrollHeight}px`
    );
    setRangeRotate(!rangeRotate);
  }
  // const fetchProductCategory = async () => {
  //   const response = await axios.get(
  //     `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/category/main_category/list`
  //   );

  //   setProductCategorys(response.data.mainCategories);
  // };

  // useEffect(() => {
  //   fetchProductCategory();
  // }, []);

  const fetchProductByCat = async (productCategoryId) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/product/get-mainCat-products/${productCategoryId}`
    );
    setProducts(response.data);
  };

  const fetchProduct = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/product/list-product`
    );
    setProducts(response.data.products);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handlePriceRangeSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    let filteredProducts = [];

    if (minPrice && !maxPrice) {
      filteredProducts = products.filter(
        (product) => product.sellingPrice > minPrice
      );
    } else if (!minPrice && maxPrice) {
      filteredProducts = products.filter(
        (product) => product.sellingPrice < maxPrice
      );
    } else if (minPrice && maxPrice) {
      filteredProducts = products.filter(
        (product) =>
          product.sellingPrice > minPrice && product.sellingPrice < maxPrice
      );
    } else {
      filteredProducts = products;
    }
    // console.log(filteredProducts);
    setFillterProducts(filteredProducts);
    // setLoading(false);
  };

  // const handlePriceRangeSubmit = (e) => {
  //   e.preventDefault();
  //   // setLoading(true);
  //   if (mainCatSlug === "") {
  //     const Toast = Swal.mixin({
  //       toast: true,
  //       position: "top-end",
  //       showConfirmButton: false,
  //       timer: 4000,
  //       timerProgressBar: true,
  //       didOpen: (toast) => {
  //         toast.addEventListener("mouseenter", Swal.stopTimer);
  //         toast.addEventListener("mouseleave", Swal.resumeTimer);
  //       },
  //     });
  //     Toast.fire({
  //       icon: "info",
  //       title: "Please select category.",
  //     });
  //   } else {
  //     const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/product_filter/price_ran ge_filter/${mainCatSlug}`;
  //     const data = {
  //       minPrice: parseInt(minPrice),
  //       maxPrice: parseInt(maxPrice),
  //     };

  //     axios
  //       .post(apiEndpoint, data)
  //       .then((response) => {
  //         console.log(response);
  //         setProducts(response.data.filteredProducts);
  //         // setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error("Error posting data:", error);
  //       });
  //   }
  // };

  return (
    <div id="shownow" className="container mx-auto relative ">
      <center className="py-6">
        <h2 className="lg:text-3xl text-xl px-2 font-semibold text-orange-600">
          Shop From Our Latest Categories
        </h2>
      </center>
      <div className="flex lg:gap-4 gap-2 lg:flex-row flex-col">
        <div className="px-4 rounded lg:w-[25%] w-[100%] lg:sticky relative lg:top-[5rem] top-0 h-full lg:h-screen">
          <p className="lg:text-lg underline underline-offset-2 text-sm font-semibold mb-3 text-gray-600 ">
            Select Your Category
          </p>
          <div className="flex lg:flex-wrap flex-nowrap lg:gap-4 gap-2 lg:ml-2 ml-0 lg:overflow-hidden overflow-x-scroll">
            {productCategorys &&
              Array.isArray(productCategorys) &&
              productCategorys.map((productCategory, index) => (
                <div key={index} className="flex items-center">
                  <Link
                    passHref
                    href={`/product_category/${productCategory.slug}`}
                  >
                    <button className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-500 to-orange-400 group-hover:from-green-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 w-[15rem]">
                      <span className="relative w-full px-2 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <div
                          onClick={() => {
                            setMainCatSlug(productCategory.slug);
                            setActiveTab(index);
                          }}
                          className={`flex ${
                            activeTab === index
                              ? " text-orange-600"
                              : " text-gray-600"
                          } cursor-pointer items-center`}
                        >
                          <img
                            src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/inner_category/${productCategory.image}`}
                            alt={productCategory.title || "Image not found"}
                            className="w-10 h-10 rounded-3xl"
                            onClick={() =>
                              fetchProductByCat(productCategory._id)
                            }
                          />
                          <h1
                            className="text-lg tracking-wider font-semibold pl-4 cursor-pointer"
                            onClick={() =>
                              fetchProductByCat(productCategory._id)
                            }
                          >
                            {productCategory.title}
                          </h1>
                        </div>
                      </span>
                    </button>
                  </Link>
                  {/* <div
                    onClick={() => {
                      setMainCatSlug(productCategory.slug);
                      setActiveTab(index);
                    }}
                    className={`flex ${
                      activeTab === index
                        ? "border-orange-600 text-orange-600"
                        : "border-orange-100 text-gray-600"
                    } cursor-pointer items-center border-2 shadow mx-2 my-1 py-2 px-3 rounded lg:w-[14rem] w-[12rem] bg-gray-200`}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/main_category/${productCategory.image}`}
                      alt={productCategory.title || "Image not found"}
                      className="w-10 h-10 rounded-3xl"
                      onClick={() => fetchProductByCat(productCategory._id)}
                    />
                    <h1
                      className="text-lg tracking-wider font-semibold pl-4 cursor-pointer"
                      onClick={() => fetchProductByCat(productCategory._id)}
                    >
                      {productCategory.title}
                    </h1>
                  </div> */}
                </div>
              ))}
          </div>
          <div>
            <div>
              <div
                onClick={rangeToggle}
                className="flex flex-row justify-between cursor-pointer items-center px-4 py-2 border-b-2 border-gray-600"
              >
                <button
                  className={
                    rangeActive === ""
                      ? "dashboard-btn lg:text-sm text-sm tracking-wider"
                      : `dashboard-btn lg:text-sm text-sm tracking-wider ${rangeActive}`
                  }
                >
                  Filter Price
                </button>
                <i
                  className={
                    rangeRotate
                      ? "fas fa-caret-down transform rotate-180"
                      : "fas fa-caret-down"
                  }
                ></i>
              </div>

              <div
                ref={range}
                className="overflow-hidden shadow"
                style={{
                  maxHeight: `${rangeHeight}`,
                  transition: "max-height 0.6s ease",
                }}
              >
                <div className="px-4 py-2">
                  <form className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      id="minPrice"
                      value={minPrice}
                      onChange={handleMinPriceChange}
                      className="border-2 border-gray-600 px-2 py-2 rounded-full shadow outline-none"
                      placeholder="min price"
                    />

                    <input
                      type="number"
                      id="maxPrice"
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                      className="border px-2 py-2 rounded-full"
                      placeholder="max price"
                    />
                  </form>
                  <button
                    onClick={handlePriceRangeSubmit}
                    type="button"
                    className="text-white bg-gradient-to-r mt-4 from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow p-4 rounded lg:w-[75%] w-[100%]">
          <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-4 gap-2 py-4">
            {(filterProducts.length > 0 && filterProducts[0] !== ""
              ? filterProducts
              : products
            ).map((item, index) => (
              <Product_card
                key={index}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product_Category;
