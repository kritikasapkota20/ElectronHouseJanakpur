import React, { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import useTranslation from "next-translate/useTranslation";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { useRouter } from "next/router";
import {
  fetchAddToCart,
  fetchDecreaseCartItem,
  fetchRemoveItem,
  fetchUpdateCart,
  fetchToggleDarkMode,
} from "../../../redux/cart/cartActions";
import Cookies from "js-cookie";
import axios from "axios";
const ItemLoader = () => {
  return (
    <div>
      <section className="bg-gray-100 rounded">
        <div className="container px-2 py-2 mx-auto animate-pulse">
          <div className="">
            <div className="w-full flex items-center justify-between gap-3">
              <div className="w-[4rem] h-[3rem] bg-gray-300 rounded-full dark:bg-gray-600"></div>

              <h1 className="w-full h-4 bg-gray-200 rounded-lg dark:bg-gray-700">
                <br />
                <span>
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
const Mid_header = () => {
  const [Cart, setCart] = useState([""]);
  const [socket, setSocket] = useState("");
  const [searchProduct, setSearchProducts] = useState([""]);
  const [searchModal, setSearchModal] = useState(false);
  const [searchText, setSearchText] = useState(false);
  const [emptyCartMessage, setEmptyCartMessage] = useState(false);
  const [CartTotal, setCartTotal] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [orderstatus, setOrderstatus] = useState("");
  const [orderId, setOrderId] = useState("");
  const cartState = useSelector((state) => state.cartState.stateData);
  const darkMode = useSelector((state) => state.darkMode?.mode);
  const dispatch = useDispatch();
  const router = useRouter();
  const { t, lang } = useTranslation("common");
  const userDetail = Cookies.get("user-detail")
    ? JSON.parse(Cookies.get("user-detail"))
    : null;
  const [details, setDetails] = useState("");

  useEffect(() => {
    setSocket(io("http://localhost:3001"));
  }, []);

  useEffect(() => {
    if (userDetail && socket) {
      const userDetailId = userDetail._id;
      socket.emit("newUser", userDetailId);
    }
  }, [userDetail, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveGreet", (message) => {
        console.log("Received server message:", message);
      });
      socket.on("serverMessage", (message) => {
        console.log("Received server message:", message);
      });
      socket.on("VendorOrderMessage", (message) => {
        setOrderstatus((prevAnswer) => [...prevAnswer, message.orderStatus]);
        setOrderId((prevId) => [...prevId, message.orderId]);
      });
    }
  }, [socket]);

  useEffect(() => {
    const fetchVendorDetails = async () => {
      let wildcard = window.location.hostname.split(".")[0];
      wildcard =
        wildcard != "devchandant"
          ? process.env.NEXT_PUBLIC_NODE_ENV != "development"
            ? wildcard
            : process.env.NEXT_PUBLIC_TEST_WILDCARD
          : "home";
      const shopDataResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/shop/get-junk/${wildcard}`
      );
      setDetails(shopDataResponse.data);
    };
    fetchVendorDetails();
  }, []);

  const fetchStock = async (productId) => {
    try {
      const stockResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/stock/get/${productId}`
      );
      return stockResponse.data[0]?.remainingQty;
    } catch (error) {
      console.error(`Error fetching stock for product ID ${productId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const CartDetails = async () => {
      var storedCart = JSON.parse(localStorage.getItem("myCart"))
        ? JSON.parse(localStorage.getItem("myCart"))
        : [];
      let cartTotal = 0;
      const updatedCart = await Promise.all(
        storedCart.map(async (cartItem) => {
          const stockInfo = await fetchStock(cartItem.productId);
          return {
            ...cartItem,
            stock: stockInfo,
          };
        })
      );
      setCart(updatedCart);

      updatedCart.forEach((item) => {
        cartTotal += item.price * item.quantity;
      });
      setCartTotal(cartTotal);
    };

    CartDetails();
  }, [cartState]);

  const openCartView = () => {
    document.getElementById("my-cart").style.width = "25rem";
  };

  const closeCartView = () => {
    document.getElementById("my-cart").style.width = "0";
  };
  const logout = () => {
    Cookies.remove("user-detail");
    Cookies.remove("user-token");
    router.push("/");
  };
  const performSearch = async (keywords) => {
    if (keywords) {
      setSearchModal(true);
      setLoading(true);
      setSearchText(keywords);
      // console.log(keywords);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/product/search/${keywords}`
      );
      if (response.data.length > 0) {
        setSearchProducts(response.data);
        setLoading(false);
      } else {
        setLoading(true);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/${searchText}`);
  };

  const openCartPage = () => {
    const token = Cookies.get("user-token") ? Cookies.get("user-token") : null;
    if (!token) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "info",
        title: "Please login first for better experience",
      });
      return router.push("/login");
    }
    router.push("/cart-details");
  };

  const openProductPage = (slug) => {
    const token = Cookies.get("user-token") ? Cookies.get("user-token") : null;
    if (!token) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "info",
        title: "Please login first for better experience",
      });
      return router.push("/login");
    }
    router.push(`/product/${slug}`);
  };

  return (
    <div className="bg-white px-4 py-4 sticky top-0 w-full z-[990] lg:block hidden">
      <div className="flex flex-row items-center justify-between">
        <div className="">

          <Link passHref href="/">
            <p className="text-lg mr-[5rem] text-gray-50 font-semibold cursor-pointer threeDText">
              <span className="text-green-600">Himalayan</span>{" "}
              <span className="text-orange-600">Wears</span>
            </p>
            {/* <img src="/logo.png" alt="the thrill mart logo" className="w-[15rem]" /> */}
          </Link>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-start relative border-2 shadow hover:shadow-lg transition-all duration-200 rounded-full">
              <input
                onChange={(e) => performSearch(e.target.value)}
                type="text"
                placeholder={t("search")}
                className="px-4 w-[30rem] text-lg rounded-full py-1 focus:outline-none  placeholder:text-gray-600 placeholder:tracking-wider placeholder:text-base "
              />
              <span
                onClick={handleSubmit}
                className="text-green-600 rounded absolute top-0 right-0 mb-2 px-2 py-1 cursor-pointer"
              >
                <svg
                  className="fill-current text-green-600 w-6 h-6 mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="heroicon-ui"
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                  />
                </svg>
              </span>
              <div
                onMouseLeave={() => setSearchModal(false)}
                className="w-[100%] h-[100%] absolute top-[2.6rem] z-[999] rounded"
              >
                <div className="">{loading && <ItemLoader />}</div>
              </div>
              {searchModal && (
                <div
                  onMouseLeave={() => setSearchModal(false)}
                  className="w-[100%] h-[100%] absolute top-[2.6rem] z-[999] rounded"
                >
                  <div className="">
                    {loading && <ItemLoader />}
                    <div className="flex justify-center">
                      <div className="w-full max-w-md">
                        <div className="bg-gray-800 dark:bg-slate-900 shadow-md rounded-lg px-3 py-2 mb-4 backdrop-filter backdrop-blur-lg bg-opacity-70">
                          <div className="py-3 text-sm">
                            {searchProduct &&
                              searchProduct.map((item, index) => (
                                <>
                                  <div
                                    key={index}
                                    onClick={() => {
                                      openProductPage(item.slug);
                                      setSearchModal(false);
                                    }}
                                    className="flex items-center justify-start cursor-pointer text-gray-100 dark:text-gray-300 hover:text-blue-400 hover:bg-slate-700 rounded-md px-2 py-1 gap-3"
                                  >
                                    {item.featureImage && (
                                      <img
                                        src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${item?.featureImage}`}
                                        alt={item.title}
                                        className="w-[5rem] h-[5rem] object-cover rounded-full"
                                      />
                                    )}
                                    <div className="flex-grow font-medium px-2">
                                      <p className="text-lg capitalize">
                                        {item.title?.substring(0, 50)}
                                      </p>
                                      <p className="text-2xl text-gray-100 font-semibold">
                                        Rs. {item.sellingPrice}
                                      </p>
                                    </div>
                                  </div>
                                  <hr className="bg-white h-[1px]" />
                                </>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="flex justify-center items-center gap-3">
          {userDetail && (
            <div className="relative">
              <img
                onClick={() => setDisplayMenu(false)}
                onMouseOver={() => setDisplayMenu(true)}
                src={userDetail.picture}
                alt={userDetail.firstName + " " + userDetail.lastName}
                className={`w-[2.5rem] h-[2.5rem] rounded-full cursor-pointer   ${
                  displayMenu && "ring-offset-2 ring-2 ring-rose-500"
                }`}
              />
              {displayMenu && (
                <div
                  onMouseLeave={() => setDisplayMenu(false)}
                  className="bg-gray-100 text-gray-600 dark:text-gray-300 absolute top-[4rem] w-[12rem] left-[-3rem] px-2 py-3 rounded"
                >
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      <Link href="/user-profile">
                        <span className=" ">
                          <i className="fas fa-user"></i>{" "}
                          {userDetail.firstName + " " + userDetail.lastName}
                        </span>
                      </Link>
                    </span>
                  </button>
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      <span onClick={logout} className="">
                        <i className="fas fa-sign-out-alt"></i> logout
                      </span>
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
          <div
            onMouseEnter={() => {
              Cart.length > 0 ? openCartView() : setEmptyCartMessage(true);
            }}
            onClick={() => {
              Cart.length > 0 ? openCartView() : setEmptyCartMessage(true);
            }}
            onMouseLeave={() => {
              setEmptyCartMessage(false);
            }}
            className="cursor-pointer relative"
          >
            <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-green-500 to-orange-400 group-hover:from-green-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                <p className="">
                  {Cart.length}{" "}
                  <span className="uppercase text-xs tracking-wider">
                    {Cart.length === 0 || Cart.length === 1
                      ? t("item")
                      : t("items")}{" "}
                    -
                  </span>{" "}
                  <span className="tracking-wider text-xs uppercase">
                    {t("rs")}.
                  </span>{" "}
                  {CartTotal}{" "}
                  <span className="text-rose-500">
                    <i className="fas fa-shopping-cart"></i>
                  </span>
                </p>
              </span>
            </button>

            {emptyCartMessage && (
              <div className="absolute text-white dark:text-gray-400 right-6 bg-slate-800 px-4 py-3 rounded mt-2 w-[12.5rem]">
                <p className="font-seemibold tracking-wider text-sm  uppercase">
                  your cart is empty
                </p>
              </div>
            )}
          </div>
        </div>
        <div onMouseLeave={closeCartView} id="my-cart" className="bg-white">
          <div className="overflow-y-scroll h-[100vh] overflow-box">
            <div className="p-3 text-sm">
              <button
                onClick={closeCartView}
                className="text-rose-600 text-2xl rounded px-2 py-1 font-bold"
              >
                <i className="fal fa-times-square"></i>
              </button>
              <p className="text-base text-gray-600 dark:text-gray-400 py-2 font-semibold tracking-wider uppercase">
                Shopping Cart
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                You have {Cart.length} items in your cart
              </p>
              <div>
                {Cart &&
                  Cart.map((item, i) => (
                    <div
                      key={i}
                      className="my-2 shadow p-1 bg-gray-300 dark:bg-slate-700 rounded "
                    >
                      <div className="flex flex-row gap-3 justify-start items-center my-2">
                        {item.image && (
                          <div>
                            <Link href={`/product/${item.slug}`}>
                              <img
                                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${item.image}`}
                                alt=""
                                className="object-cover h-[5rem] w-[5rem] "
                              />
                            </Link>
                            {/* <p className="text-xs capitalize text-gray-50">
                              {item?.title.substring(0, 10)}
                            </p> */}
                          </div>
                        )}
                        <div>
                          <p className="text-xs tracking-wider text-gray-600 dark:text-gray-400">
                            unit price:Rs. {item?.price}
                          </p>
                        </div>
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
                                className="fill-current text-white w-6 bg-rose-500 px-2 h-6 rounded cursor-pointer"
                                viewBox="0 0 448 512"
                              >
                                <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                              </svg>
                            )}
                            <input
                              className="mx-2 border dark:bg-slate-900 dark:text=gray-400 text-gray-600 bg-gray-100 text-base pl-2 pr-2 text-center w-12 h-8 rounded dark:border-gray-400"
                              type="text"
                              value={item.quantity ? item.quantity : 0}
                            />
                            {item.quantity < item.stock && (
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
                        <div className="text-gray-600 dark:text-gray-400">
                          Rs. {item.quantity * item?.price}
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              dispatch(fetchRemoveItem(item.productId));
                              dispatch(fetchUpdateCart(cartState));
                            }}
                            className="text-center px-2 py-1 text-rose-600 rounded text-xl"
                          >
                            <i className="far fa-times"></i>
                          </button>
                        </div>
                      </div>
                      <p className="text-xs capitalize text-gray-50 dark:text-gray-400">
                        {item?.title?.substring(0, 10)}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            <div className="absolute top-4 z-[999] right-4">
              <button
                onClick={() => {
                  closeCartView();
                  openCartPage();
                }}
                className="text-gray-600 dark:text-gray-400 hover:bg-transparent border-gray-600 hover:text-rose-600 border-2 hover:border-rose-600 duration-200 transition-all px-3 py-1 rounded-full text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mid_header;
