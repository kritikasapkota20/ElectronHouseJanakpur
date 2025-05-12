import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";
import {
  addToCart,
  decreseCartItem,
  fetchAddToCart,
  fetchDecreaseCartItem,
  fetchRemoveItem,
  fetchUpdateCart,
  removeItem,
} from "../../redux/cart/cartActions";
import MainCategory from "../phone_category/main_category";
const ItemLoader = () => {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900 rounded">
        <div className="container px-2 py-2 mx-auto animate-pulse">
          <div className="">
            <div className="w-full flex items-center justify-between gap-3">
              <div className="w-[4rem] h-[3rem] bg-gray-300 rounded-full dark:bg-gray-600"></div>

              <h1 className="w-full h-4 bg-gray-200 rounded-lg dark:bg-gray-700">
                <br />
                <span>
                  {" "}
                  <p className="w-[25%] h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </span>
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
const PhoneHeader = () => {
  const [searchProduct, setSearchProducts] = useState([""]);
  const [searchModal, setSearchModal] = useState(false);
  const [searchText, setSearchText] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [viewSearchBar, setSearchBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartView, setCartView] = useState(false);
  const [Cart, setCart] = useState([""]);
  const [active, setActive] = useState(false);
  const [CartTotal, setCartTotal] = useState("");
  const cartState = useSelector((state) => state.cartState.stateData);
  const cartState1 = useSelector((state) => state.cartState1?.stateData);
  const dispatch = useDispatch();
  useEffect(() => {
    var cart = JSON.parse(localStorage.getItem("myCart"))
      ? JSON.parse(localStorage.getItem("myCart"))
      : [];
    let cartTotal = 0;
    setCart(cart);
    cart.map((item) => {
      cartTotal += item.price * item.quantity;
    });
    setCartTotal(cartTotal);
  }, [cartState]);

  const openMenu = () => {
    setActive(true);
    document.getElementById("my-category").style.height = "85%";
  };

  const closeMenu = () => {
    setActive(false);
    document.getElementById("my-category").style.height = "0";
  };
  const router = useRouter();
  const userDetail = Cookies.get("user-detail")
    ? JSON.parse(Cookies.get("user-detail"))
    : null;
  const logout = () => {
    Cookies.remove("user-detail");
    Cookies.remove("user-token");
    router.push("/");
  };
  const darkMode = useSelector((state) => state.darkMode?.mode);
  const performSearch = async (keywords) => {
    if (keywords) {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/product/search/${keywords}`
      );
      if (response.data.length > 0) {
        setSearchProducts(response.data);
        setLoading(false);
        setSearchModal(true);
      } else {
        setLoading(true);
        setSearchModal(true);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchModal(false);
    router.push(`/search/${searchText}`);
  };

  const handleNavigation = (path) => {
    const token = Cookies.get("user-token") || null;
    if (!token) {
      Swal.fire({
        icon: "info",
        title: "Please login first for a better experience",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      router.push("/login");
    } else {
      router.push(path);
    }
  };

  return (
    <>
      <div className="sticky top-0 w-full px-4 py-4 z-[990] bg-gray-100 lg:hidden dark:bg-slate-800 block backdrop-filter backdrop-blur-lg bg-opacity-25 overflow-y-auto">
        <div className="flex flex-row justify-between">
          <div className="flex gap-2 justify-center items-center">
            <button onClick={active ? closeMenu : openMenu} className="px-3">
              {active ? (
                <p className="text-lg font-semibold">
                  <i className="far fa-times"></i>
                </p>
              ) : (
                <i className="fas fa-th"></i>
              )}
            </button>
            <Link passHref href="/">
              <p className="text-lg  text-gray-50 font-semibold cursor-pointer">
                <span className="text-green-600">Himalayan</span>{" "}
                <span className="text-orange-600">Wears</span>
              </p>
              {/* <img src="/logo.png" alt="the thrill mart logo" className="w-[15rem]" /> */}
            </Link>
          </div>
          <button onClick={() => handleNavigation("/wishlist")}>
            <i className="fal fa-heart"></i>
          </button>
          <button
            onClick={() => {
              setCartView(true);
            }}
          >
            <i className="fal fa-cart-plus"></i>
          </button>

          <div className="flex gap-4 text-xl">
            {userDetail && (
              <div className="relative">
                <img
                  onClick={() => setDisplayMenu(!displayMenu)}
                  onMouseOver={() => setDisplayMenu(true)}
                  src={userDetail.picture}
                  alt={userDetail.firstName + " " + userDetail.lastName}
                  className={`w-[1.8rem] h-[1.8rem] rounded-full cursor-pointer ${
                    displayMenu && "ring-offset-2 ring-2 ring-red-500"
                  }`}
                />
                {displayMenu && (
                  <div
                    onMouseLeave={() => setDisplayMenu(false)}
                    className="bg-gray-800 bg-opacity-40 text-white absolute top-[3rem] w-[9rem] left-[-5rem] px-2 py-3 rounded backdrop-filter backdrop-blur-lg"
                  >
                    <Link href="/user-profile">
                      <button className="bg-gray-500 px-2 rounded py-1 text-sm backdrop-filter backdrop-blur-lg bg-opacity-25">
                        {userDetail.firstName + " " + userDetail.lastName}
                      </button>
                    </Link>
                    <button
                      onClick={logout}
                      className="bg-gray-500 px-2 rounded py-1 mt-2 text-sm backdrop-filter backdrop-blur-lg bg-opacity-25"
                    >
                      logout
                    </button>
                  </div>
                )}
              </div>
            )}
            {viewSearchBar ? (
              <span
                className="text-red-500"
                onClick={() => setSearchBar(!viewSearchBar)}
              >
                <i className="far fa-times"></i>
              </span>
            ) : (
              <span onClick={() => setSearchBar(!viewSearchBar)}>
                <i className="far fa-search text-gray-600 mt-2"></i>
              </span>
            )}
          </div>
        </div>
      </div>
      {viewSearchBar && (
        <div
          id="search-modal"
          className="bg-slate-200 mb-2 w-full top-0 z-[999] py-2 px-2 flex justify-between fixed transition-all duration-300 backdrop-filter backdrop-blur-lg bg-opacity-25"
        >
          <input
            onChange={(e) => performSearch(e.target.value)}
            placeholder="search products here..."
            type="text"
            className="bg-gray-100 dark:bg-slate-900 px-3 placeholder:text-sm py-1 rounded-full dark:placeholder:text-gray-400  placeholder:text-gray-100 shadow w-[100%] focus:outline-none focus:shadow-lg border-2 border-rose-600 tracking-widest"
          />
          {viewSearchBar && (
            <button
              className="text-rose-600 text-center m-2 border-2 rounded px-2 border-rose-600"
              onClick={() => setSearchBar(!viewSearchBar)}
            >
              <i className="far fa-times"></i>
            </button>
          )}
          {searchModal && (
            <div className="w-[100%] absolute top-[4.2rem] z-[999] rounded inset-0 h-[100vh] overflow-y-scroll mb-[1.8rem]">
              <div className="">
                <div className="flex justify-center">
                  <div className="w-full p-2">
                    <div className="bg-gray-800 shadow-md rounded-lg px-3 py-2 mb-4 backdrop-filter backdrop-blur-lg bg-opacity-90">
                      {loading && <ItemLoader />}
                      <div className="max-w-2xl mx-auto">
                        <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                          {/* <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-normal leading-none text-gray-900 dark:text-white">
                              Latest Products
                            </h3>
                            <a
                              href="#"
                              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                            >
                              View all
                            </a>
                          </div> */}
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="divide-y divide-gray-200 dark:divide-gray-700"
                            >
                              {searchProduct &&
                                searchProduct.map((item, index) => (
                                  <li key={index} className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4">
                                      <div className="flex-shrink-0">
                                        <img
                                          className="w-[3rem] h-[3rem] rounded-full object-cover"
                                          src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${item?.featureImage}`}
                                          alt={item.title}
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <Link href={`/product/${item.slug}`}>
                                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {item.title}
                                          </p>
                                        </Link>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                          Rs. {item.sellingPrice}
                                        </p>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="bg-gray-800 " id="my-category">
        {cartView && (
          <div className="relative">
            <div className="w-[100%] py-2 shadow rounded overflow-y-scroll overflow-box">
              <div className="overflow-y-scroll h-[100vh] overflow-box">
                <div className="p-3 text-sm">
                  <button
                    onClick={() => setCartView(false)}
                    className="text-gray-100 text-2xl rounded px-2 font-medium float-right"
                  >
                    <i className="fal fa-times-square"></i>
                  </button>
                  <p className="text-sm text-gray-100 font-normal tracking-wider capitalize">
                    Shopping Cart
                  </p>
                  <p className="text-gray-100 text-xs">
                    You have {Cart.length} items in your cart
                  </p>
                  <button
                    onClick={() => {
                      handleNavigation("/cart-details");
                      setCartView(false);
                    }}
                    className="mt-4 text-gray-100 rounded-full hover:bg-green-800 transition-all duration-300 bg-green-600 px-2 py-1"
                  >
                    Checkout Now
                    <span className="ml-2">
                      <i className="fas fa-long-arrow-alt-right"></i>
                    </span>
                  </button>
                  <div className="mb-[4rem]">
                    {Cart &&
                      Cart.map((item, i) => (
                        <div
                          key={i}
                          className="shadow bg-gray-100 backdrop-filter backdrop-blur-lg bg-opacity-70 rounded "
                        >
                          <div className="flex flex-row gap-3 justify-start items-center my-2 p-2                                                                        ">
                            {item.image && (
                              <div>
                                <Link href={`/product/${item.slug}`}>
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${item.image}`}
                                    alt=""
                                    className="object-cover h-[5rem] w-[5rem] "
                                  />
                                </Link>
                              </div>
                            )}

                            <div>
                              <div className="p-2">
                                <p className="text-xs capitalize text-gray-600 tracking-wider">
                                  {item?.title?.substring(0, 10)}
                                </p>
                              </div>
                              <div className="flex flex-row gap-3 justify-start items-center">
                                <div>
                                  <div className="flex items-center">
                                    {item.quantity > 1 && (
                                      <svg
                                        onClick={() => {
                                          dispatch(
                                            fetchDecreaseCartItem({
                                              productId: item?.productId,
                                              quantity: 1,
                                              title: item.title,
                                              price: item.price,
                                              image: item.image,
                                              slug: item.slug,
                                              adminId: item.adminId,
                                            })
                                          );
                                          dispatch(fetchUpdateCart(cartState));
                                          // handleCountDelete(item.quantity,item.productId)
                                        }}
                                        className="fill-current text-white w-6 bg-orange-500 px-2 h-6 rounded cursor-pointer"
                                        viewBox="0 0 448 512"
                                      >
                                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                      </svg>
                                    )}
                                    <input
                                      className="mx-2 border text-base pl-2 pr-2 text-center w-12 h-8 rounded"
                                      type="text"
                                      value={item.quantity ? item.quantity : 0}
                                    />
                                    {item.quantity <= 4 && (
                                      <svg
                                        onClick={() => {
                                          dispatch(
                                            fetchAddToCart({
                                              productId: item?.productId,
                                              quantity: 1,
                                              title: item.title,
                                              price: item.price,
                                              image: item.image,
                                              slug: item.slug,
                                              adminId: item.adminId,
                                            })
                                          );
                                          dispatch(fetchUpdateCart(cartState));
                                        }}
                                        className="fill-current text-white w-6 bg-green-500 px-2 h-6 rounded cursor-pointer"
                                        viewBox="0 0 448 512"
                                      >
                                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                                <div className="text-gray-600">
                                  Rs. {item.quantity * item?.price}
                                </div>
                                <div>
                                  <button
                                    onClick={() => {
                                      dispatch(fetchRemoveItem(item.productId));
                                      dispatch(fetchUpdateCart(cartState));
                                    }}
                                    className="text-center px-2 py-1 text-orange-600 rounded text-xl"
                                  >
                                    <i className="far fa-times"></i>
                                  </button>
                                </div>
                              </div>
                              <p className="text-xs tracking-wider mt-2 text-gray-600">
                                unit price:Rs. {item?.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {active && (
        <div className="bg-gray-100" id="my-category">
          <div className="px-4 py-4">
            <ul>
              <li>
                <div className="flex items-center justify-center py-2">
                  <Link passHref href="/about">
                    <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-500 to-orange-400 group-hover:from-green-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                      <span className="relative px-2 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-[15rem]">
                        <div className="flex gap-2 justify-center items-center">
                          <img
                            src=""
                            alt=""
                            className="w-10 h-10 rounded-3xl"
                          />
                          <h1 className="text-lg tracking-wider font-semibold pl-4 cursor-pointer">
                            About us
                          </h1>
                        </div>
                      </span>
                    </button>
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center justify-center py-2">
                  <Link passHref href="/contact">
                    <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-500 to-orange-400 group-hover:from-green-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                      <span className="relative px-2 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-[15rem]">
                        <div className="flex gap-2 justify-center items-center">
                          <img
                            src=""
                            alt=""
                            className="w-10 h-10 rounded-3xl"
                          />
                          <h1 className="text-lg tracking-wider font-semibold pl-4 cursor-pointer">
                            Contact us
                          </h1>
                        </div>
                      </span>
                    </button>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <MainCategory />
        </div>
      )}
    </>
  );
};

export default PhoneHeader;
