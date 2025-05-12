import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import RatingReview from "../../rating_review/rating_review";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import ProductLoaderOne from "../../loaders/productLoader";
import {
  fetchUpdateCart,
  fetchAddToCart,
  fetchDecreaseCartItem,
} from "../../../redux/cart/cartActions";
import Swal from "sweetalert2";
import htmr from "htmr";
import axios from "axios";
import { fetchUpdateWishlistState } from "../../../redux/wishlist/wishlistActions";
import Add from "../../forms/answer/add";
const ColProductCard = ({
  _id,
  title,
  slug,
  price,
  image,
  description,
  markPrice,
  discount,
  adminId,
  loading,
}) => {
  const [itemQnt, setItemQnt] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const fullDescription = htmr(description);
  const shortDescription = description.substring(0, 200) + "...";
  const [active, setActive] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [isWishlist, setIsWishlist] = useState(false);
  const [updateWishlist, setUpdateWishlist] = useState(false);
  const [Cart, setCart] = useState([""]);
  const [CartTotal, setCartTotal] = useState("");
  const [answeForm, setAnswerForm] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const cartState = useSelector((state) => state.cartState.stateData);
  const wishlistState = useSelector((state) => state.wishlistState.stateData);
  const { t, lang } = useTranslation("common");
  const userDetail = Cookies.get("user-detail")
    ? JSON.parse(Cookies.get("user-detail"))
    : null;
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart.data);
  const router = useRouter();
  const productData = {
    _id: _id,
    title: title,
    price: price,
    quantity: 1,
    image: image,
    adminId: adminId?._id,
    slug: slug,
  };

  const compareData = {
    _id,
    title,
    slug,
    price,
    image,
    description,
    markPrice,
    discount,
    adminId,
    loading,
  };

  const cartData = {
    productId: _id,
    quantity: productData.quantity,
    title: title,
    price: price,
    image: image,
    adminId: adminId?._id,
    slug: slug,
  };

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
  const data = Cart.find((item, i) => item.productId === _id);
  const addToWishlist = async (productId) => {
    const token = Cookies.get("user-token") ? Cookies.get("user-token") : null;
    if (!token) {
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
        icon: "info",
        title: "Please login first for better experience",
      });
      return router.push("/login");
    }
    try {
      setSpinner(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/wishlist/add`,
        { productId: productId },
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
        setUpdateWishlist(!updateWishlist);
        dispatch(fetchUpdateWishlistState(wishlistState));
        setSpinner(false);
      } else if (response.data.error) {
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
          icon: "error",
          title: response.data.error,
        });
        setSpinner(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = Cookies.get("user-token")
        ? Cookies.get("user-token")
        : null;
      if (!token) {
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
          icon: "info",
          title: "Please login first for better experience",
        });
        return router.push("/login");
      }
      setSpinner(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/wishlist/remove`,
        { productId },
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
        setUpdateWishlist(!updateWishlist);
        dispatch(fetchUpdateWishlistState(wishlistState));
        setSpinner(false);
      } else if (response.data.error) {
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
          icon: "error",
          title: response.data.error,
        });
        setSpinner(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const increaseProductView = async () => {
    const token = Cookies.get("user-token") ? Cookies.get("user-token") : null;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/product/views/${_id}`,
      {
        headers: {
          "user-token": token,
        },
      }
    );
  };
  const setCurrentImage = (url) => {
    setImageUrl(url);
  };
  const buyNow = (cartData) => {
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
    var cart = JSON.parse(localStorage.getItem("myCart"))
      ? JSON.parse(localStorage.getItem("myCart"))
      : [];

    if (cart.length !== 0) {
      const productsId = cart.map((item) => item.productId + "");
      if (productsId.includes(cartData.productId)) {
        const index = productsId.indexOf(cartData.productId);
        cart[index] = {
          productId: cartData.productId,
          adminId: adminId?._id,
          title: cartData.title,
          price: cartData.price,
          image: cartData.image,
          quantity: cart[index].quantity + 1,
        };
        localStorage.setItem("myCart", JSON.stringify(cart));
        router.push("/cart-details");
      } else {
        localStorage.setItem("myCart", JSON.stringify([...cart, cartData]));
        router.push("/cart-details");
      }
    } else {
      localStorage.setItem("myCart", JSON.stringify([cartData]));
      router.push("/cart-details");
    }
  };
  const closeAnswerForm = () => {
    setAnswerForm(false);
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
  const addToCompare = (cartData) => {
    var compare = JSON.parse(localStorage.getItem("compare"))
      ? JSON.parse(localStorage.getItem("compare"))
      : [];

    if (compare.length !== 0) {
      const productsId = compare.map((item) => item._id + "");
      if (productsId.includes(cartData._id)) {
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
          title: "item already exists.",
        });
      } else {
        localStorage.setItem("compare", JSON.stringify([...compare, cartData]));
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
          icon: "success",
          title: "Item added to compare list.",
        });
      }
    } else {
      localStorage.setItem("compare", JSON.stringify([...compare, cartData]));
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
        icon: "success",
        title: "Item added to compare list.",
      });
    }
  };
  const askQuestion = () => {
    const token = Cookies.get("user-token") ? Cookies.get("user-token") : null;
    if (!token) {
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
        icon: "info",
        title: "Please login first for better experience",
      });
      return router.push("/login");
    }
    setAnswerForm(true);
  };

  const openQuickView = () => {
    setQuickView(true);
  };

  const closeQuickView = () => {
    setQuickView(false);
  };
  useEffect(() => {
    const token = Cookies.get("user-token") ? Cookies.get("user-token") : null;
    if (token?.length > 10) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/cart/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-token": token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const cartItem = data.cart.items.filter((item) => {
            return item.productId._id === productData._id;
          });
          setItemQnt(cartItem[0]?.quantity);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [state]);

  return (
    <div id="product_card" className="shadow-2xl rounded-md">
      {answeForm && (
        <div className="fixed lg:left-8 left-0 lg:top-20 top-2 z-[999] lg:w-full w-[95%] mx-auto inset-0 rounded">
          <Add
            user={userDetail._id}
            vendor={adminId._id}
            product={_id}
            closeAnswerForm={closeAnswerForm}
            price={price}
            discount={discount}
            image={image}
            title={title}
            slug={slug}
          />
        </div>
      )}
      {loading == true ? (
        <ProductLoaderOne />
      ) : (
        <div
          onClick={increaseProductView}
          className="border-gray-400 p-2 hover:border-red-500 duration-200 transition-all"
        >
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
            <div className="col-span-1">
              <div className="relative">
                {image && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${image}`}
                    alt={title}
                    onClick={() => openProductPage(slug)}
                    className="object-cover h-[16rem] w-full"
                  />
                )}
                {image && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${image}`}
                    alt={title}
                    onClick={() => openProductPage(slug)}
                    className=" object-cover absolute bottom-0 h-[16rem] w-full"
                  />
                )}
                <div id="card-widget" className="absolute bottom-3 w-full px-2">
                  <center className="mt-[-2rem]">
                    <p
                      onClick={() => {
                        openQuickView();
                      }}
                      className="bg-gray-600 text-gray-50 px-1 text-center w-[6rem] transition-all text-sm duration-200 cursor-pointer hover:bg-red-500 hover:text-gray-50 rounded-full"
                    >
                      {t("quickView")}
                    </p>
                  </center>
                  <div className="flex flex-row justify-between">
                    {isWishlist == true ? (
                      <>
                        <div
                          onClick={() => {
                            removeFromWishlist(_id);
                          }}
                          className="relative heart-icon"
                        >
                          {spinner ? (
                            <div className="spinner"></div>
                          ) : (
                            <i className="fas fa-heart bg-gray-100 px-3 py-2 rounded-full text-rose-500 text-sm border-2 hover:bg-transparent hover:border-gray-500 hover:text-gray-5 cursor-pointer "></i>
                          )}

                          <p className="wishlist-msg absolute -bottom-6 backdrop-filter backdrop-blur-lg bg-opacity-25 -left-2 bg-slate-600 w-[10rem] rounded-full text-gray-50 px-2 text-sm">
                            {t("removeFromWishlist")}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          onClick={() => {
                            addToWishlist(_id);
                          }}
                          className="relative heart-icon"
                        >
                          {spinner ? (
                            <div className="spinner"></div>
                          ) : (
                            <i className=" far fa-heart bg-gray-600 backdrop-filter backdrop-blur-lg bg-opacity-25 px-3 py-2 rounded-full text-gray-50 text-sm hover:bg-rose-500 hover:text-gray-5 cursor-pointer"></i>
                          )}
                          <p className="wishlist-msg absolute backdrop-filter backdrop-blur-lg bg-opacity-25 -bottom-6 -left-2 bg-gray-800 w-[7rem] rounded-full text-gray-50 px-2 text-sm text-center">
                            {t("addToWishlist")}
                          </p>
                        </div>
                      </>
                    )}
                    <div
                      onClick={() => addToCompare(compareData)}
                      className="relative compare-icon"
                    >
                      <i className="fas fa-not-equal bg-gray-600 px-3 py-2 hover:bg-rose-500 hover:text-gray-5 cursor-pointer  rounded-full text-gray-50 text-sm backdrop-filter backdrop-blur-lg bg-opacity-25"></i>
                      <p className="compare-msg absolute backdrop-filter backdrop-blur-lg bg-opacity-25 -bottom-6 right-0 lg:right-1 bg-gray-800 w-[10rem] rounded-full text-gray-50 text-sm text-center">
                        {t("compareThisProduct")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <p className="font-medium text-sm text-green-600 underline">
                {title}
              </p>
              <RatingReview ratings={4} review_count={5} />
            
              <div className="flex flex-row gap-3">
                <p className="line-through font-medium text-sm text-red-600">
                  Rs.{markPrice}
                </p>
                <p className="font-medium text-sm text-gray-600">
                  {discount}% off
                </p>
              </div>
              <p className="font-medium text-md">Rs.{price}</p>
              <p className="text-sm text-gray-600 underline">
                product description
              </p>
              {description && (
                <div>
                  {expanded ? (
                    <div
                      className="text-sm text-gray-600"
                      style={{ overflow: "scroll" }}
                    >
                      {fullDescription}
                    </div>
                  ) : (
                    <div
                      className="text-sm text-gray-600"
                      style={{ overflow: "hidden" }}
                    >
                      {htmr(shortDescription)}
                    </div>
                  )}
                  <button
                    className="text-sm text-red-600"
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? "Read Less <<" : "Read More >>"}
                  </button>
                </div>
              )}
              <div className="">
                <div className="flex flex-row gap-4 mt-2 justify-center items-center">
                  <div className="flex items-center">
                    {data?.quantity > 1 && (
                      <svg
                        onClick={() => {
                          dispatch(
                            fetchDecreaseCartItem({
                              productId: _id,
                              quantity: productData.quantity,
                              title: title,
                              price: price,
                              images: images,
                              adminId: adminId?._id,
                              slug: slug,
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
                      className="mx-2 border text-base pl-2 pr-2 text-center w-12 h-8 rounded"
                      type="text"
                      value={data?.quantity ? data?.quantity : 0}
                    />
                    {data?.quantity <= 4 && (
                      <svg
                        onClick={() => {
                          dispatch(
                            fetchAddToCart({
                              productId: _id,
                              quantity: productData.quantity,
                              title: title,
                              price: price,
                              images: images,
                              adminId: adminId?._id,
                              slug: slug,
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
                  {data?.quantity == undefined && (
                    <button
                      onClick={() => {
                        dispatch(
                          fetchAddToCart({
                            productId: _id,
                            quantity: productData.quantity,
                            title: title,
                            price: price,
                            images: images,
                            adminId: adminId?._id,
                            slug: slug,
                          })
                        );
                        dispatch(fetchUpdateCart(cartState));
                      }}
                      className="bg-rose-600 hover:bg-rose-700 duration-200 transition-all text-xs w-full py-1 rounded text-gray-50"
                    >
                      {t("addToCart")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr className="w-full h-[2px] bg-gray-400"></hr>

          <hr className="w-full h-[1px] bg-gray-400 mt-3"></hr>
          <div className="capitalize font-serif">
            <div className="flex flex-row justify-between mt-2">
              <div
                onClick={() => buyNow(cartData)}
                className="lg:text-sm text-xs cursor-pointer flex justify-center items-center text-green-600"
              >
                <i className="fas fa-hand-holding-usd mt-1 lg:block hidden"></i>
                <span className=" lg:px-2 px-0 "> {t("buyNow")}</span>
              </div>
              <div className="text-sm cursor-pointer flex justify-center items-center text-rose-500">
                <i className="far fa-question-circle mt-1 lg:block hidden"></i>
                <span onClick={askQuestion} className="lg:px-2 px-0">
                  {t("question")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {quickView && (
        <div className="fixed lg:top-6 top-2 lg:left-28 left-0 z-[999] lg:w-[85%] w-full lg:h-[90%] h-[100%] bg-gray-100 rounded overflow-hidden transition-all duration-200 backdrop-filter backdrop-blur-lg bg-opacity-25">
          <div className="overflow-scroll h-[100%] overflow-box">
            <div className="flex justify-end px-2 py-2">
              <button
                onClick={closeQuickView}
                className="bg-rose-600 px-2 rounded text-white font-bold"
              >
                X
              </button>
            </div>
            <div className="flex lg:flex-row flex-col gap-4 p-4">
              <div className="lg:w-[45%] w-full">
                <div className="">
                  {image && (
                    <img
                      src={imageUrl}
                      alt=""
                      className="h-[32rem] w-full object-cover rounded"
                    />
                  )}
                </div>
                {/* <div className="flex flex-row gap-3 py-3 w-[100%] overflow-x-scroll overflow-box">
                  {image.map((item, i) => (
                    <img
                      key={i}
                      onClick={() => {
                        setCurrentImage(
                          `${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${item.fileName}`
                        );
                        setActive(i);
                      }}
                      src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${item.fileName}`}
                      alt={item.fileName}
                      className={`object-cover w-[8rem] h-[8rem] ${
                        active == i ? "border-4 border-green-600" : null
                      }`}
                    />
                  ))}
                </div> */}
              </div>
              <div className="lg:w-[55%] w-full">
                <div className="lg:px-4 px-0">
                  <p className="font-medium text-2xl text-gray-600 uppercase">
                    {title}
                  </p>
                  <p className="font-medium text-lg text-gray-600">
                    {t("rs")}. {price}
                  </p>
                  <div className="flex flex-row gap-3">
                    <p className="line-through font-medium text-sm text-rose-600">
                      Rs.{markPrice}
                    </p>
                    <p className="font-medium text-sm text-gray-600">
                      {discount}% {t("off")}
                    </p>
                  </div>
                  <RatingReview ratings={4} review_count={5} />
                  <p className="text-lg text-gray-600 py-1 font-semibold">
                    Product Details
                  </p>

                  {description && (
                    <div>
                      {expanded ? (
                        <div
                          className="text-sm text-gray-600"
                          style={{ overflow: "hidden" }}
                        >
                          {htmr(description)}
                        </div>
                      ) : (
                        <div
                          className="text-sm text-gray-600"
                          style={{ overflow: "hidden" }}
                        >
                          {}
                          {htmr(description.substring(0, 400) + "...")}
                        </div>
                      )}
                      <button
                        className="text-sm text-rose-600"
                        onClick={() => setExpanded(!expanded)}
                      >
                        {expanded ? "Read Less <<" : "Read More >>"}
                      </button>
                    </div>
                  )}

                  <div className="flex flex-row space-x-4 items-center mb-4 ">
                    <div className="">
                      <div className="flex flex-row gap-4 mt-2 justify-center items-center">
                        <div className="flex items-center">
                          {data?.quantity > 1 && (
                            <svg
                              onClick={() => {
                                dispatch(
                                  fetchDecreaseCartItem({
                                    productId: _id,
                                    quantity: productData.quantity,
                                    title: title,
                                    price: price,
                                    image: image,
                                    adminId: adminId?._id,
                                    slug: slug,
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
                            className="mx-2 border text-base pl-2 pr-2 text-center w-12 h-8 rounded"
                            type="text"
                            value={data?.quantity ? data?.quantity : 0}
                          />
                          {data?.quantity <= 4 && (
                            <svg
                              onClick={() => {
                                dispatch(
                                  fetchAddToCart({
                                    productId: _id,
                                    quantity: productData.quantity,
                                    title: title,
                                    price: price,
                                    image: image,
                                    adminId: adminId?._id,
                                    slug: slug,
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
                        {data?.quantity == undefined && (
                          <button
                            onClick={() => {
                              dispatch(
                                fetchAddToCart({
                                  productId: _id,
                                  quantity: productData.quantity,
                                  title: title,
                                  price: price,
                                  image: image,
                                  adminId: adminId?._id,
                                  slug: slug,
                                })
                              );
                              dispatch(fetchUpdateCart(cartState));
                            }}
                            className="bg-rose-600 hover:bg-rose-700 px-2 duration-200 transition-all text-sm w-full py-1 rounded text-gray-50"
                          >
                            {t("addToCart")}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="mt-1">
                      <button
                        onClick={() => buyNow(cartData)}
                        className="bg-green-600 px-2 hover:bg-green-800 duration-200 transition-all text-gray-50 py-1 rounded text-sm"
                      >
                        {t("buyNow")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColProductCard;
