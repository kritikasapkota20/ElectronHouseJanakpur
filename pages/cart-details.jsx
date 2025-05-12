import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  fetchAddToCart,
  fetchDecreaseCartItem,
  fetchRemoveItem,
  fetchUpdateCart,
} from "../redux/cart/cartActions";
import Cookies from "js-cookie";
import { UserAddress, AddressDetail, Spinner } from "../components";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
import Payment from "@/components/payment";
// import { useNavigate } from "react-router-dom";

const CartDetail = () => {
  // const navigation = useNavigate();
  const [cart, setCart] = useState([""]);
  const [showUserAddress, setShowUserAddress] = useState(false);
  const [showAddressDetail, setShowAddressDetail] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [CartTotal, setCartTotal] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [orderTotal, setOrderTotal] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState(null);
  const [addresses, setAddresses] = useState([""]);
  const [expanded, setExpanded] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedAddressData, setSelectedAddressData] = useState(null);
  const [loading, setLoading] = useState(false);
  const cartState = useSelector((state) => state.cartState.stateData);
  const dispatch = useDispatch();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [couponHeight, setCouponHeight] = useState("0px");
  const couponBox = useRef(null);
  const today = new Date();
  const [isAddressDetail, setIsAddressDetail] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);


  const handleRadioChange = (value) => {
    setSelectedOption(value);
  };

  // Add 5 days to today's date
  const fiveDaysAhead = new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000);

  // Format the date and time
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = fiveDaysAhead.toLocaleDateString(undefined, options);
  const formattedTime = fiveDaysAhead.toLocaleTimeString();
  const deliveryTime = `The estimated delivery time for your order is on ${formattedDate}, specifically between 1-3 o'clock in the afternoon. Please note that delivery times may vary based on various factors such as location, shipping method, and any unforeseen circumstances. We strive to ensure timely delivery and will make every effort to fulfill your order within the specified timeframe. If there are any changes or updates regarding the delivery schedule, we will notify you promptly. Thank you for choosing our services!`;
  const toggleCoupon = () => {
    setActive((prevActive) => !prevActive);
    setCouponHeight((prevHeight) =>
      prevHeight === "0px" ? `${couponBox.current.scrollHeight}px` : "0px"
    );
  };

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
    const storedCart = JSON.parse(localStorage.getItem("myCart")) || [];
    if (storedCart.length === 0) {
      router.push("/");
    } else {
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
      setOrderTotal(Number(deliveryCharge) + Number(cartTotal));
    }
  };

  CartDetails();
}, [cartState]);


  useEffect(() => {
    const token = Cookies.get("user-token");
    if (!token) {
      router.push("/login");
    } else {
      fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/address/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAddresses(data.addresses);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [showUserAddress]);

  const handleCoupon = (e) => {
    e.preventDefault();
    if (coupon === "hello world") {
      const newCartTotal = Number(CartTotal) - 100;
      setCartTotal(newCartTotal);
      Swal.fire({
        title:
          "Congratulations! You have received a flat Rs. 200 discount with this coupon.",
      });
    } else {
      Swal.fire({
        title: "This coupon is invalid. Please try again with a valid coupon.",
      });
    }
  };

  const viewAddressDetail = (addressId) => {
    setShowAddressDetail(true);
    setAddressId(addressId);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    const token = Cookies.get("user-token");
    const storedCart = JSON.parse(localStorage.getItem("myCart")) || [];

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/order/add`,
      {
        orderTotal: Number(deliveryCharge) + Number(CartTotal),
        cart: storedCart,
        orderAddress:
          selectedAddressData?.province +
          ", " +
          selectedAddressData?.city +
          " ," +
          selectedAddressData?.area +
          " ," +
          selectedAddressData?.streetAddress,
        phone: phoneNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "user-token": token,
        },
      }
    );

    if (response.data.message) {
      toast.error(response.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.removeItem("myCart");
      //  router.push("/user-profile");
       window.location.href = "/user-profile";
      dispatch(fetchUpdateCart(cartState));
      setLoading(false);
    }
  };

  const handleDD = (ddData) => {
    setDeliveryCharge(ddData);
  };

  const handleAddress = (province, city, area, streetAddress, phone) => {
    const data = {
      province,
      city,
      area,
      streetAddress,
    };
    setSelectedAddressData(data);
    setPhoneNumber(phone);
  };


  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {showUserAddress && (
        <UserAddress
          setShowAddressDetail={setShowAddressDetail}
          setAddressId={setAddressId}
          setShowUserAddress={setShowUserAddress}
        />
      )}
      {showAddressDetail && (
        <AddressDetail
          addressId={addressId}
          setShowAddressDetail={setShowAddressDetail}
          handleDD={handleDD}
          handleAddress={handleAddress}
        />
      )}
      <div className="container mx-auto mt-0 tracking-widest py-8">
        {loading && <Spinner />}
        <div className="flex gap-3 lg:flex-row flex-col">
          <div className="lg:w-[70%] w-[100%] h-[100%] dark:bg-slate-700 bg-gray-100 backdrop-filter backdrop-blur-xl bg-opacity-90 rounded lg:px-10 px-4 shadow border-2 border-slate-100 dark:border-slate-400 pb-4">
            <div className="pt-3 lg:block hidden">
              <h1 className="font-normal lg:text-base text-base pb-2  dark:text-gray-400 text-gray-600 capitalize tracking-wider">
                Shopping Cart :{" "}
                <span className="font-normal lg:text-base text-base dark:text-gray-400 text-gray-600 capitalize tracking-wider">
                  {cart.length}{" "}
                  <span className="capitalize tracking-wider">
                    {cart.length === 0 || cart.length === 1 ? "item" : "items"}
                  </span>{" "}
                </span>
              </h1>
            </div>
            <div className="flex flex-col mb-5 lg:block">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-400 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-400">
                      <thead className="dark:bg-slate-900 bg-gray-100">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-600 capitalize tracking-wider"
                          >
                            Product Details
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-600 capitalize tracking-wider"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-600 capitalize tracking-wider"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-600 capitalize tracking-wider"
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="dark:bg-slate-900 bg-gray-100 divide-y divide-gray-400 ">
                        {cart &&
                          cart.map((item, i) => (
                            <tr key={i}>
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-16 w-16">
                                    {item?.image && (
                                      <img
                                        src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${item?.image}`}
                                        alt={item.title}
                                        className="object-cover h-16 w-16 rounded"
                                      />
                                    )}
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium dark:text-gray-400 text-gray-600 capitalize">
                                      {item?.title?.substring(0, 75)}
                                    </div>
                                    <a
                                      onClick={() => {
                                        dispatch(
                                          fetchRemoveItem(item.productId)
                                        );
                                        dispatch(fetchUpdateCart(cartState));
                                      }}
                                      href="#"
                                      className="font-semibold hover:text-red-500 text-rose-600 text-xs"
                                    >
                                      Remove
                                    </a>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
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
                                      }}
                                      className="fill-current text-white w-6 bg-red-500 px-2 h-6 rounded cursor-pointer"
                                      viewBox="0 0 448 512"
                                    >
                                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                    </svg>
                                  )}
                                  <input
                                    className="mx-2 border dark:bg-slate-800 bg-gray-100 text-gray-600 dark:text-gray-400 border-slate-400 text-base pl-2 pr-2 text-center w-12 h-8 rounded"
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
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm dark:text-gray-400 text-gray-600">
                                  Rs. {item?.price}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm dark:text-gray-400 text-gray-600">
                                  Rs. {item.quantity * item?.price}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <Link passHref href="/">
              <div className="flex font-semibold text-rose-600 text-sm mt-6 lg:mt-10 border-2 border-rose-500 rounded-full lg:w-[15rem] w-[15rem] px-2 lg:py-1 py-1 cursor-pointer text-center">
                <svg
                  className="fill-current mr-2 text-rose-600 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </div>
            </Link>
            <Payment />
          </div>
          <div
            id="summary"
            className="lg:w-[30%] h-[100%] w-[100%] px-8 lg:py-4 py-2 shadow bg-slate-100 dark:bg-slate-700  rounded border-2 border-gray-100"
          >
            <p
              className="cursor-pointer text-sm font-normal tracking-wider dark:text-gray-400 text-gray-600 "
              onClick={toggleCoupon}
            >
              Have a Coupon Code ? {active ? "Close" : "Click Here"}
            </p>
            <div
              ref={couponBox}
              style={{
                maxHeight: `${couponHeight}`,
                transition: "max-height 0.3s ease",
              }}
              className="overflow-hidden"
            >
              <label
                htmlFor="promo"
                className="font-normal inline-block mb-3 text-sm tracking-wider dark:text-gray-400 text-gray-600 mt-2"
              >
                Coupon Code
              </label>
              <input
                onChange={(e) => setCoupon(e.target.value)}
                value={coupon}
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="px-3 py-2 text-sm w-full shadow rounded-full focus:outline-none focus:shadow-lg bg-slate-100 dark:text-gray-400 text-gray-600 border-gray-400 border-2"
              />
              <button
                onClick={handleCoupon}
                className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-3"
              >
                Apply
              </button>
            </div>

            <div className="border-t mt-4">
              <h1 className="font-normal text-sm dark:text-gray-400 text-gray-600 capitalize border-b lg:pb-2 pb-2 tracking-wider pt-2">
                Order Summary
              </h1>
              <div className="flex justify-between mt-5 mb-5">
                <span className="font-normal text-sm capitalize dark:text-gray-400 text-gray-600">
                  <span className="capitalize tracking-wider">
                    {cart.length === 0 || cart.length === 1 ? "item" : "items"}
                  </span>{" "}
                  {cart.length}
                </span>
                <span className="font-normal text-sm dark:text-gray-400 text-gray-600">
                  Rs. {CartTotal}
                </span>
              </div>
              {selectedAddressData !== null && (
                <div className="flex justify-between mt-5 mb-5">
                  <span className="font-normal text-sm capitalize dark:text-gray-400 text-gray-600">
                    Address
                  </span>
                  <span className="font-normal text-sm dark:text-gray-400 text-gray-600">
                    {selectedAddressData?.province +
                      ", " +
                      selectedAddressData?.city +
                      " ," +
                      selectedAddressData?.area}{" "}
                    <br />
                    {selectedAddressData?.streetAddress}
                  </span>
                </div>
              )}
              <div>
                {deliveryCharge !== null ? (
                  <>
                    <div className="mt-5 mb-5">
                      <div className="mb-4 text-sm">
                        <label className="block text-gray-700 font-bold mb-2">
                          Choose an Delivery option:
                        </label>
                        <div>
                          <label className="inline-flex items-center mr-4">
                            <input
                              type="radio"
                              value="Ringroad"
                              checked={selectedOption === "Ringroad"}
                              onChange={() => handleRadioChange("Ringroad")}
                              className="form-radio h-5 w-5 text-blue-500"
                            />
                            <span className="ml-2">Inside Ringroad Rs.60</span>
                          </label>
                          <label className="inline-flex items-center mr-4">
                            <input
                              type="radio"
                              value="OutsideRingroad"
                              checked={selectedOption === "OutsideRingroad"}
                              onChange={() =>
                                handleRadioChange("OutsideRingroad")
                              }
                              className="form-radio h-5 w-5 text-blue-500"
                            />
                            <span className="ml-2">Outside Ringroad Rs.90</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              value="OutsideValley"
                              checked={selectedOption === "OutsideValley"}
                              onChange={() =>
                                handleRadioChange("OutsideValley")
                              }
                              className="form-radio h-5 w-5 text-blue-500"
                            />
                            <span className="ml-2">
                              Outside of Valley Rs.120
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-gray-700 text-sm">
                          Selected Option: {selectedOption || "None"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 mb-5">
                      <span className="font-semibold text-sm capitalize dark:text-gray-400 text-gray-600">
                        Delivery time
                      </span>
                      <span className="font-semibold text-xs dark:text-gray-400 text-gray-600">
                        {deliveryTime && (
                          <div>
                            {expanded ? (
                              <div
                                className="text-xs dark:text-gray-400 text-gray-600"
                                style={{ overflow: "hidden" }}
                              >
                                {deliveryTime}
                              </div>
                            ) : (
                              <div
                                className="text-xs dark:text-gray-400 text-gray-600"
                                style={{ overflow: "hidden" }}
                              >
                                {deliveryTime.substring(0, 107) + "..."}
                              </div>
                            )}
                            <button
                              className="text-xs text-orange-600"
                              onClick={() => setExpanded(!expanded)}
                            >
                              {expanded ? "Read Less <<" : "Read More >>"}
                            </button>
                          </div>
                        )}
                        <div className="flex gap-2 flex-col">
                          {addresses &&
                            addresses?.map((item, i) => (
                              <div key={i}>
                                <div
                                  onClick={() => {
                                    viewAddressDetail(item._id);
                                  }}
                                  className=""
                                >
                                  <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 w-full mt-2">
                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-full">
                                      View Address Detail
                                    </span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-3">
                            Want Quick Delivery{" "}
                            <i className="fal fa-bolt mr-1"></i>.?
                          </button>
                        </div>
                      </span>
                    </div>
                  </>
                ) : (
                  ""
                  // <div className="mb-2">
                  //   {addresses?.length === 0 ? (
                  //     <div className="flex justify-end items-center p-4">
                  //       <button
                  //         onClick={() => setShowUserAddress(true)}
                  //         className="outline outline-offset-2 outline-red-500 outline-1 px-3 py-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                  //       >
                  //         Add New Delivery Address
                  //       </button>
                  //     </div>
                  //   ) : (
                  //     <div className="">
                  //       {addresses?.map((item, i) => (
                  //         <div key={i}>
                  //           <button
                  //             onClick={() => {
                  //               viewAddressDetail(item._id);
                  //             }}
                  //             className="bg-slate-900 px-4 py-1 text-gray-400 rounded-full hover:bg-slate-800 tracking-wider capatilize text-sm shadow"
                  //           >
                  //             View Address Detail
                  //           </button>
                  //         </div>
                  //       ))}
                  //     </div>
                  //   )}
                  // </div>
                )}
              </div>

              <hr></hr>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm capitalize dark:text-gray-400 text-gray-600">
                  Total
                </span>
                <span className="font-semibold text-sm dark:text-gray-400 text-gray-600">
                  Rs. {Number(deliveryCharge) + Number(CartTotal)}
                </span>
              </div>
              <div>
                {addresses?.length === 0 ? (
                  <div className="flex justify-end items-center p-4">
                    <button
                      onClick={() => setShowUserAddress(true)}
                      className="outline outline-offset-2 outline-red-500 outline-1 px-3 py-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                    >
                      Add New Delivery Address
                    </button>
                  </div>
                ) : phoneNumber?.length !== 0 &&
                  selectedAddressData?.length !== 0 ? (
                  <div onClick={handlePlaceOrder} className="">
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Place Order Now
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="">
                    {addresses?.map((item, i) => (
                      <div key={i}>
                        <div
                          onClick={() => {
                            viewAddressDetail(item._id);
                          }}
                          className=""
                        >
                          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                              View Address Detail
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetail;
