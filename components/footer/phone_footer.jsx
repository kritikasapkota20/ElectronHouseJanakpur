import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import MainCategory from "../phone_category/main_category";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
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
const PhoneFooter = () => {
  const [Cart, setCart] = useState([""]);
  const [active, setActive] = useState(false);
  const [CartTotal, setCartTotal] = useState("");
  const [cartView, setCartView] = useState(false);
  const router = useRouter();
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
    <div className="sticky bottom-0 lg:hidden block z-[999]">
      <div className="flex flex-row gap-2 bg-slate-100 justify-evenly py-2 text-orange-600 text-lg backdrop-filter backdrop-blur-lg bg-opacity-25">
        <button>
          <Link href="/">
            <i className="far fa-home"></i>
          </Link>
        </button>
        <button onClick={() => handleNavigation("/wishlist")}>
          <i className="fal fa-heart"></i>
        </button>
        <button onClick={active ? closeMenu : openMenu} className="px-3">
          {active ? (
            <p className="text-lg font-semibold">
              <i className="far fa-times"></i>
            </p>
          ) : (
            <i className="fas fa-th"></i>
          )}
        </button>
        <button onClick={() => handleNavigation("/user-profile")}>
          <i className="far fa-user"></i>
        </button>
        <button
          onClick={() => {
            // handleNavigation("/cart-details")
            setCartView(true);
          }}
        >
          <i className="fal fa-cart-plus"></i>
        </button>
      </div>
      <div
        className="bg-gray-900 backdrop-filter backdrop-blur-lg bg-opacity-40"
        id="my-category"
      >
        {active && <MainCategory />}
      </div>
      <div
        className="bg-gray-900 backdrop-filter backdrop-blur-lg bg-opacity-40"
        id="my-category"
      >
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
                      handleNavigation("/cart-details")
                      setCartView(false)
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
    </div>
  );
};

export default PhoneFooter;
