import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import MyWishlist from "@/components/profile_page/wishlist";
import {
  CompareComponent,
  OrderTrackingComponent,
  Spinner,
  TrackingView,
} from "@/components";
import Swal from "sweetalert2";

const CancelOrderModal = ({ isOpen, onClose, onCancel }) => {
  const [reason, setReason] = useState("");
     const [customReason, setCustomReason] = useState("");

  const handleCancel = () => {
    const cancellationReason = customReason || reason;
    onCancel(cancellationReason);
    onClose();
  };

  return (
    <div className="container lg:px-6 px-2 mx-auto fixed lg:top-12 top-0 inset-0 w-full h-screen overflow-y-auto z-[999] pb-8">
      <div className="flex flex-col text-center md:text-left md:flex-row justify-evenly">
        <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
          <div className="bg-gray-200 lg:p-10 p-2 flex flex-col w-full shadow-xl rounded-xl">
            <div className="flex justify-between items-center p-2"></div>
            <div className={`modal ${isOpen ? "open" : "closed"}`}>
              <div className="modal-content bg-white p-4 max-w-screen-sm mx-auto rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Cancel Order</h2>
                <p className="mb-4">Why do you want to cancel your order?</p>

                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option value="" disabled>
                    Select a reason
                  </option>
                  <option value="changed_mind">Changed my mind</option>
                  <option value="found_better_price">
                    Found a better price
                  </option>
                  <option value="technical_issue">Technical issue</option>
                  <option value="other">Other</option>
                </select>
                {reason === "other" && (
                  <div>
                    <p className="mt-4">Please provide your reason:</p>
                    <input
                      type="textarea"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={customReason}
                      rows={4}
                      onChange={(e) => setCustomReason(e.target.value)}
                      placeholder="Enter your custom reason..."
                    />
                  </div>
                )}
                <div className="flex justify-end mt-4">
                  {reason && reason.length > 1 ? (
                    <button
                      className="bg-red-500 text-white px-4 py-2 mr-2 rounded hover:bg-red-600"
                      onClick={handleCancel}
                    >
                      Cancel Order
                    </button>
                  ) : (
                    <button className="bg-red-500 text-white px-4 py-2 mr-2 rounded hover:bg-red-600">
                      Cancel Order
                    </button>
                  )}

                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserProfile = () => {
  const [orders, setOrders] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [state, setState] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [user, setUser] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const router = useRouter();
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const fetchOrders = async () => {
    setLoading(true);
    const token = Cookies.get("user-token") ? Cookies.get("user-token") : null;
    if (!token) {
      router.push("/login");
    }
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/order/get/user`,
      {
        headers: {
          "Content-Type": "application/json",
          "user-token": token,
        },
      }
    );
    if (response.data.orders) {
      setOrders(response.data.orders);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [state]);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const calculateEstimatedDate = (baseDate, days) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + days);
    return date.toDateString();
  };

  const handleCancelModalClose = () => {
    setCancelModalOpen(false);
  };

  const handleCancelOrderConfirm = async (reason) => {
    const token = Cookies.get("user-token");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/order/user/cancel_reason`,
      {
        orderStatus,
        vendorEmail,
        orderId,
        reason,
        user,
      },
      {
        headers: {
          "user-token": token,
        },
      }
    );
    if (response.data.message) {
      setLoading(true);
      const token = Cookies.get("user-token");
      if (!token) {
        return window.location.replace("/login");
      }

      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/order/user/cancel/${orderId}`,
          {
            orderStatus,
            vendorEmail,
          },
          {
            headers: {
              "user-token": token,
            },
          }
        );

        if (response.data.message) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: response.data.message,
          });
          fetchOrders();
          setLoading(false);
          setState(!state);
        }
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    }
  };

  const cancelOrder = async (orderStatus, orderId, vendorEmail) => {
    const confirmTitle =
      orderStatus === "pending"
        ? "Are you sure want to order again?"
        : "Are you sure?";
    const confirmText =
      orderStatus === "pending"
        ? "Let's do this!"
        : "You won't be able to revert this!";

    const result = await Swal.fire({
      title: confirmTitle,
      text: confirmText,
      icon: orderStatus === "pending" ? "warning" : "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText:
        orderStatus === "pending"
          ? "Yes, order it now"
          : "yes, cancel order now",
    });

    if (result.isConfirmed) {
      setCancelModalOpen(true);
    }
  };

  const moveToTrash = async (orderId) => {
    const token = Cookies.get("user-token");
    if (!token) {
      return window.location.replace("/login");
    }
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/order/update-trashbin/${orderId}`,
        {
          headers: {
            "user-token": token,
          },
        }
      );

      if (response.data.message) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
        setLoading(true);
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (orderId) => {
    const token = Cookies.get("user-token");
    if (!token) {
      return window.location.replace("/login");
    }
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/order/delete/${orderId}`,
        {
          headers: {
            "user-token": token,
          },
        }
      );

      if (response.data.message) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
        setLoading(true);
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userData = Cookies.get("user-detail")
      ? JSON.parse(Cookies.get("user-detail"))
      : null;
    setUser(userData);
  }, []);
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return (
    <div className="bg-white dark:bg-slate-900">
      {isCancelModalOpen && (
        <CancelOrderModal
          isOpen={isCancelModalOpen}
          onClose={handleCancelModalClose}
          onCancel={handleCancelOrderConfirm}
        />
      )}
      <div className="flex lg:flex-row flex-col lg:gap-6 p-2">
        <nav className="flex lg:flex-col flex-row dark:bg-slate-800 lg:w-[20%] w-[100%] lg:h-screen h-[100%] overflow-x-scroll lg:overflow-x-hidden px-4 tex-gray-900 backdrop-filter backdrop-blur-lg bg-opacity-80 border-2 rounded border-slate-600">
          <div className="flex flex-wrap lg:mt-8 lg:block ">
            {/* <div className="w-1/2 ">
              <img
                src="https://randomuser.me/api/portraits/women/27.jpg"
                className="mx-auto w-20 h-20 rounded-full"
              />
            </div> */}

            <div className="flex flex-col justify-center items-center">
              {user && user ? (
                <img
                  src={user.picture}
                  alt={user.firstName + " " + user.lastName}
                  className="mx-auto w-20 h-20 rounded-full"
                />
              ) : (
                <img
                  src="https://randomuser.me/api/portraits/women/27.jpg"
                  className="mx-auto w-20 h-20 rounded-full"
                />
              )}
              <p className="text-sm font-semibold tracking-wider capitalize">
                {greeting}, {user.firstName + " " + user.lastName}
              </p>
              <p className="text-sm font-semibold tracking-wider capitalize">
                {user.email}
              </p>
            </div>
          </div>
          <div className="lg:mt-10 mt-2 lg:mb-4 mb-0">
            <ul className="ml-4 flex lg:flex-col flex-row">
              <li
                onClick={() => handleTabClick(1)}
                className={`lg:mb-2 mb-0 w-[12rem] h-[100%] lg:px-4 lg:py-4 px-1 py-2 flex flex-row lg:justify-start justify-center items-center  border-gray-300  hover:font-bold rounded ${
                  activeTab == 1
                    ? "text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                    : "text-white flex bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                }`}
              >
                <button type="button" className="flex">
                  <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
                    <path
                      d="M16 20h4v-4h-4m0-2h4v-4h-4m-6-2h4V4h-4m6
                        4h4V4h-4m-6 10h4v-4h-4m-6 4h4v-4H4m0 10h4v-4H4m6
                        4h4v-4h-4M4 8h4V4H4v4z"
                    ></path>
                  </svg>
                  <span className="ml-2">My Orders</span>
                </button>
              </li>

              <li
                onClick={() => handleTabClick(2)}
                className={`mb-2 w-[10rem] h-[100%] lg:px-4 lg:py-4 px-1 py-2 flex flex-row lg:justify-start  justify-center items-center  border-gray-300  hover:font-bold rounded ${
                  activeTab == 2
                    ? "text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                    : "text-white flex bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                }`}
              >
                <span>
                  <svg
                    className="fill-current h-5 w-5 "
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
                      fill="currentColor"
                    />
                    <path
                      d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <button>
                  <span className="ml-2">My Wishlist</span>
                </button>
              </li>

              <li
                onClick={() => handleTabClick(3)}
                className={`mb-2 w-[8rem] h-[100%] lg:px-4 lg:py-4 px-1 py-2 flex flex-row lg:justify-start justify-center items-center  border-gray-300  hover:font-bold rounded ${
                  activeTab == 3
                    ? "text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                    : "text-white flex bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                }`}
              >
                <span>
                  <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
                    <path
                      d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2
                        2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0
                        00-2-2h-1V1m-1 11h-5v5h5v-5z"
                    ></path>
                  </svg>
                </span>
                <button>
                  <span className="ml-2">Compare</span>
                </button>
              </li>
              {/* <li
                onClick={() => handleTabClick(4)}
                className={`mb-2 w-[15rem] h-[100%] lg:px-4 lg:py-4 px-1 py-2 flex flex-row lg:justify-start justify-center items-center  border-gray-300 hover:text-black hover:bg-gray-300  hover:font-bold rounded ${
                  activeTab == 4
                    ? "text-black bg-gray-300 font-bold "
                    : "text-gray-300"
                }`}
              >
                <span>
                  <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0
                        014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4
                        8-4z"
                    ></path>
                  </svg>
                </span>
                <button onClick={() => handleTabClick(4)}>
                  <span className="ml-2">Change password</span>
                </button>
              </li> */}

              {/* <li
                onClick={() => handleTabClick(5)}
                className={`mb-2 w-[10rem] h-[100%] lg:px-4 lg:py-4 px-1 py-2 flex flex-row lg:justify-start  justify-center items-center  border-gray-300 hover:text-black hover:bg-gray-300  hover:font-bold rounded ${
                  activeTab == 5
                    ? "text-black bg-gray-300 font-bold "
                    : "text-gray-300"
                }`}
              >
                <span>
                  <svg
                    className="fill-current h-5 w-5 "
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 3C8.86384 3 10.4299 4.27477 10.874 6H19V8H10.874C10.4299 9.72523 8.86384 11 7 11C4.79086 11 3 9.20914 3 7C3 4.79086 4.79086 3 7 3ZM7 9C8.10457 9 9 8.10457 9 7C9 5.89543 8.10457 5 7 5C5.89543 5 5 5.89543 5 7C5 8.10457 5.89543 9 7 9Z"
                      fill="currentColor"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17 20C15.1362 20 13.5701 18.7252 13.126 17H5V15H13.126C13.5701 13.2748 15.1362 12 17 12C19.2091 12 21 13.7909 21 16C21 18.2091 19.2091 20 17 20ZM17 18C18.1046 18 19 17.1046 19 16C19 14.8954 18.1046 14 17 14C15.8954 14 15 14.8954 15 16C15 17.1046 15.8954 18 17 18Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <div href="#">
                  <span className="ml-2">Settings</span>
                </div>
              </li> */}
              {/* <li
                onClick={() => handleTabClick(6)}
                className={`mb-2 w-[10rem] h-[100%] lg:px-4 lg:py-4 px-1 py-2 flex flex-row lg:justify-start  justify-center items-center  border-gray-300 hover:text-black hover:bg-gray-300 hover:font-bold rounded ${
                  activeTab == 6
                    ? "text-black bg-gray-300 font-bold "
                    : "text-gray-300"
                }`}
              >
                <span>
                  <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
                    <path
                      d="M12 13H7v5h5v2H5V10h2v1h5v2M8
                        4v2H4V4h4m2-2H2v6h8V2m10 9v2h-4v-2h4m2-2h-8v6h8V9m-2
                        9v2h-4v-2h4m2-2h-8v6h8v-6z"
                    ></path>
                  </svg>
                </span>
                <div href="#">
                  <span className="ml-2">Logout</span>
                </div>
              </li> */}
            </ul>
          </div>
        </nav>
        <div className="bg-white dark:bg-slate-800 lg:w-[80%] w-full lg:h-screen h-[100%] overflow-y-scroll overflow-x-scroll lg:overflow-x-hidden overflow-box border-2 rounded border-slate-600">
          {activeTab === 1 && (
            <div>
              {loading && (
                <div>
                  <section className="bg-white dark:bg-gray-900 rounded">
                    <div className="container px-6 py-6 mx-auto animate-pulse">
                      <div className="">
                        <div className="w-full">
                          <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                          <h1 className="w-full h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                          <p className="w-full h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}
              {orders &&
                orders.map((item, i) => (
                  <div key={i} className="p-4">
                    <div className=" bg-white dark:bg-slate-700 flex flex-col rounded overflow-hidden shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-80">
                      <div className="flex flex-row items-baseline flex-nowrap bg-gray-100 dark:bg-gray-900 p-2">
                        <h1 className="ml-2 capitalize lg:font-normal font-normal text-gray-500 dark:text-gray-100 lg:text-sm text-xs">
                          order placed on:
                        </h1>
                        <p className="ml-2 font-normal text-gray-500 dark:text-gray-100 tracking-widest lg:text-sm text-xs">
                          {new Date(item.createdAt).toLocaleDateString(
                            undefined,
                            options
                          )}
                        </p>
                        {/* <button
                          onClick={() => moveToTrash(item._id)}
                          className="underline underline-offset-2 text-red-600 ml-4 hover:text-red-800"
                        >
                          Move To Trashbin{" "}
                          {item.trashbin == true ? "true" : "false"}
                        </button> */}
                        <button
                          onClick={() => deleteOrder(item._id)}
                          className="underline underline-offset-2 text-red-600 ml-4 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="flex justify-start bg-white dark:bg-slate-700 p-2">
                        <div className="flex mx-2 ml-2  px-2 flex-row items-baseline rounded-full bg-gray-100 dark:bg-slate-900 p-1">
                          <p className="font-normal lg:text-sm text-xs text-gray-500 dark:text-gray-100 tracking-widest px-2">
                            Invoice Id : {item.invoiceId}
                          </p>
                        </div>
                      </div>
                      <div className="grid lg:grid-cols-3 grid-cols-1 items-center gap-4">
                        <div className="mt-2 mx-4 tracking-wider flex flex-row gap-4 items-center">
                          <img
                            className="w-[6rem] h-[6rem] rounded object-cover"
                            src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${item?.productId?.featureImage}`}
                            alt={item?.productId?.title}
                          />
                          <div>
                            <p className="text-orange-600 dark:text-gray-200 text-xs lg:text-lg capitalize cursor-pointer ">
                              {item?.productId?.title.substring(0, 65)}
                            </p>
                            <p className="text-gray-600 text-xs lg:text-sm">
                              Unit Price :{" "}
                              <span className="text-sm tracking-wider">
                                Rs.{item?.productId?.sellingPrice}
                              </span>
                            </p>
                            <p className="text-gray-600 text-xs lg:text-sm">
                              Quantity : {item.quantity}
                            </p>
                            <p className="text-gray-600 text-xs lg:text-sm">
                              Total Amount :
                              <span className="text-lg font-semibold tracking-wider text-green-600">
                                {" "}
                                Rs.{" "}
                                {item.quantity * item?.productId?.sellingPrice}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="px-2">
                          <p className="text-gray-600 text-xs lg:text-sm">
                            Customer name: {""}
                            {item?.userId?.firstName +
                              " " +
                              item?.userId?.lastName}
                          </p>

                          <p className="text-gray-600 text-xs lg:text-sm">
                            Address: {item.orderAddress}
                          </p>
                          <p className="text-gray-600 text-xs lg:text-sm">
                            Phone: {item.phone}
                          </p>
                        </div>

                        <div className="flex gap-4 items-center pl-2 mb-4">
                          {/* <div>
                            <div className="relative bg-blue-500 text-white px-2 py-2 rounded text-lg font-semibold overflow-hidden">
                              <p className="px-2 lg:text-sm text-xs">
                                {item.adminId?.fullName}
                              </p>
                            </div>
                          </div> */}
                          {item.orderStatus !== "cancelled" ? (
                            <>
                              {item.orderStatus === "completed" ? (
                                <p>return</p>
                              ) : (
                                <button
                                  onClick={() => {
                                    setOrderId(item._id);
                                    setVendorEmail(item.adminId.email);
                                    setOrderStatus("cancelled");
                                    cancelOrder("cancelled");
                                  }}
                                  title="click the button to cancel this order."
                                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-500 to-orange-400 group-hover:from-green-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                                >
                                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    cancel order
                                  </span>
                                </button>
                              )}
                            </>
                          ) : (
                            <div className="flex flex-col gap-2 items-center justify-center pt-8">
                              <button
                                disabled
                                title="you have cancelled this order."
                                className="text-red-500 text-lg font-semibold border-2 border-red-500 rounded px-2 text-center"
                              >
                                order cancelled
                              </button>
                              <button
                                onClick={() =>
                                  cancelOrder(
                                    "pending",
                                    item._id,
                                    item.adminId.email
                                  )
                                }
                                title="re order the previous cancelled order."
                                className="bg-green-600 text-gray-50 px-2 py-1 rounded hover:bg-gray-100 hover:border-2 hover:border-green-600 transition-all duration-200 hover:text-green-600 border-2"
                              >
                                Re-order
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {item.orderStatus !== "cancelled" && (
                        <>
                          <OrderTrackingComponent
                            status={item.orderStatus}
                            createdAt={item.createdAt}
                            updatedAt={item.updatedAt}
                          />
                          {/* <div
                            className={`progress-6 ${
                              item.orderStatus === "pending"
                                ? "w-[18rem]"
                                : item.orderStatus === "confirmed"
                                ? "w-[32rem]"
                                : item.orderStatus === "dispatched"
                                ? "w-[44rem]"
                                : item.orderStatus === "arrived"
                                ? "w-[56rem]"
                                : item.orderStatus === "completed"
                                ? "w-[0px] hidden"
                                : item.orderStatus === "cancelled"
                                ? "w-[0px] hidden"
                                : ""
                            }`}
                          ></div> */}
                        </>
                      )}

                      <div className="mt-4 bg-gray-100 flex flex-row flex-wrap md:flex-nowrap justify-between items-center">
                        <div className="flex mx-6 py-4 flex-row items-center">
                          <i className="fas fa-truck-container text-4xl text-orange-600"></i>
                          <div className="text-sm mx-2 flex flex-col">
                            <p className="tracking-wider">Order status</p>
                            {item.orderStatus === "pending" && (
                              <p className="text-xs lg:text-sm text-gray-500 tracking-wider">
                                <p className="text-xs lg:text-sm text-gray-500 tracking-wider">
                                  Your order is currently being processed.
                                  Please wait for confirmation. We appreciate
                                  your patience! The estimated confirmation will
                                  be provided within the an hour. Thank you for
                                  choosing us!
                                </p>
                              </p>
                            )}
                            {item.orderStatus === "confirmed" && (
                              <p className="text-xs lg:text-sm text-gray-500 tracking-wider">
                                <p className="text-xs lg:text-sm text-gray-500 tracking-wider">
                                  Your order has been confirmed. We are
                                  preparing your items for dispatch. The
                                  estimated dispatch date is approximately{" "}
                                  {calculateEstimatedDate(item.updatedAt, 1)}.
                                  Thank you for choosing us! Your order is on
                                  its way! We estimate that it will be delivered
                                  to you by{" "}
                                  {calculateEstimatedDate(item.createdAt, 1)} or
                                  by {calculateEstimatedDate(item.createdAt, 1)}
                                  . We appreciate your patience and hope you
                                  enjoy your purchase.
                                </p>
                              </p>
                            )}
                            {item.orderStatus === "dispatched" && (
                              <p className="text-xs lg:text-sm text-gray-500 tracking-wider">
                                Your order is on its way! It has been dispatched
                                and is estimated to arrive{" "}
                                {calculateEstimatedDate(item.createdAt, 1)}. Get
                                ready to receive your package.
                              </p>
                            )}
                            {item.orderStatus === "arrived" && (
                              <p className="text-xs lg:text-sm text-gray-500 tracking-wider">
                                Your order has arrived! It is currently being
                                prepared for completion and is estimated to be
                                ready{" "}
                                {calculateEstimatedDate(item.createdAt, 1)}.
                                We&apos;re putting on the final touches.
                              </p>
                            )}
                            {item.orderStatus === "completed" && (
                              <p className="text-xs lg:text-sm text-gray-500 tracking-wider">
                                Your order is successfully completed. We hope
                                you had a great experience with us. If you have
                                any feedback, feel free to share. We value your
                                satisfaction.
                              </p>
                            )}
                            {item.orderStatus === "cancelled" && (
                              <p className="text-xs lg:text-sm text-gray-500 tracking-wider">
                                Your order is successfully cancelled. We
                                apologize for any inconvenience caused. If you
                                have any questions or need further assistance,
                                please don&apos;t hesitate to contact us. Thank
                                you for your understanding.
                              </p>
                            )}
                          </div>
                        </div>
                        {/* <div className="md:border-l-2 mx-6 md:border-dotted flex flex-row py-4 mr-6 flex-wrap items-center">
                          <div className="text-sm mx-2 flex flex-col">
                            <p>Total Price</p>
                            <p className="font-bold tracking-wider">
                              Rs. {item.totalAmount}
                            </p>
                          </div>
                          <button className="rounded flex border-solid border text-white bg-green-800 mx-2 justify-center place-items-center  px-2 h-[2.5rem]">
                            <div className="">cancel order</div>
                          </button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
          {activeTab === 2 && (
            <div>
              <MyWishlist />
            </div>
          )}
          {activeTab === 3 && (
            <div>
              <CompareComponent />
            </div>
          )}
          {activeTab === 4 && (
            <div>
              <h2>Tab 4 Content</h2>
              <p>This is the content for Tab 4.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
