import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import ProductLoaderOne from "../loaders/productLoader";
import {
  fetchUpdateCart,
  fetchAddToCart,
  fetchDecreaseCartItem,
  fetchRemoveItem,
} from "../../redux/cart/cartActions";
import { productReviewCount } from "../../redux/review/reviewActions";
import Swal from "sweetalert2";
import RatingReview from "../rating_review/rating_review";
import htmr from "htmr";
import axios from "axios";
import { fetchUpdateWishlistState } from "../../redux/wishlist/wishlistActions";
import Add from "../forms/answer/add";
import CarouselSlider from "../slider/carousel _slider";
import QuickViewSlider from "../slider/quickView_slider";
import QuickViewImageSlider from "../slider/quickViewImage_slider";
import handleApiRequest from "../../libs/apiHandler";
import Link from "next/link";

const NavCard = ({
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
  innerCatslug,
  product,
}) => {
  const [quickView, setQuickView] = useState(false);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [updateWishlist, setUpdateWishlist] = useState(false);
  const [Cart, setCart] = useState([""]);
  const [CartTotal, setCartTotal] = useState("");
  const [answeForm, setAnswerForm] = useState(false);
  const [imagesList, setImagesList] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartState.stateData);
  const wishlistState = useSelector((state) => state.wishlistState.stateData);
  const reviewState = useSelector((state) => state.wishlistState.stateData);
  const [imageUrl, setImageUrl] = useState(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${image}`
  );
  const router = useRouter();
  const { t } = useTranslation("common");
  useEffect(() => {
    fetchImages();
  }, [_id]);
  let filteredColors = [];
  for (let i = 0; i < imagesList.length; i++) {
    if (imagesList[i].color !== "normal") {
      filteredColors.push(imagesList[i]);
    }
  }
  useEffect(() => {
    setImageUrl(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${image}`
    );
  }, [_id]);

  const handleCurrentImage = (url) => {
    setCurrentImage(url);
  };
  const fetchImages = async () => {
    try {
      const targetPath = `product/get/images/${_id}`;
      const result = await handleApiRequest("GET", targetPath, null, false);
      setImagesList(result);
    } catch (error) {
      console.log(error);
    }
  };
  const userDetail = Cookies.get("user-detail")
    ? JSON.parse(Cookies.get("user-detail"))
    : null;

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

  useEffect(() => {
    // if (image) {
    setImageUrl(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${image}`
    );
    // }
  }, [_id]);

  const cartData = {
    productId: _id,
    quantity: productData.quantity,
    title: title,
    price: price,
    image: image,
    adminId: adminId?._id,
    slug: slug,
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

  useEffect(() => {
    const token = Cookies.get("user-token") ? Cookies.get("user-token") : null;
    if (token?.length > 10) {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/wishlist/check/${_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "user-token": token,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setIsWishlist(data.exist);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [wishlistState]);
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
  return (
    <div className="relative">
      {answeForm && (
        <div className="lg:absolute fixed lg:left-8 left-0 lg:top-20 top-2 z-[999] lg:w-full w-[95%] mx-auto inset-0 rounded">
          <Add
            user={userDetail?._id}
            vendor={adminId?._id}
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
          id="product_card"
          className="shadow-lg rounded-md h-[100%] bg-gray-100 dark:bg-slate-800 backdrop-filter backdrop-blur-lg bg-opacity-80"
        >
          <div className="border-gray-400 hover:border-rose-500 duration-200 transition-all">
            <div className="relative cursor-pointer">
              {discount !== "0" && (
                <div className="absolute top-0 z-[999] bg-gray-600 backdrop-filter backdrop-blur-lg bg-opacity-25 right-0 m-1 rounded">
                  <p className="text-white dark:text-red-600 text-[10px] px-2 py-1">
                    {discount + "%" + " " + t("off")}
                  </p>
                </div>
              )}
              {image && (
                <img
                  src={imageUrl}
                  alt={title}
                  className="object-cover h-[16rem] w-full blur-md"
                  onClick={() => {
                    openProductPage(slug);
                  }}
                />
              )}
              {image && (
                <img
                  src={imageUrl}
                  alt=""
                  className="hover:scale-125 duration-200 transition-all absolute bottom-0 h-[16rem] w-full object-contain"
                  onClick={() => openProductPage(slug)}
                />
              )}
              <div id="card-widget" className="absolute bottom-3 w-full px-2">
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
                        <p className="wishlist-msg absolute backdrop-filter backdrop-blur-lg bg-opacity-25 -bottom-6 -left-2 bg-gray-800 w-[8rem] rounded-full text-gray-50 px-2 text-sm text-center">
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
                    <p className="compare-msg absolute backdrop-filter backdrop-blur-lg bg-opacity-25 -bottom-6 right-0 lg:right-1 bg-gray-800 w-[12rem] rounded-full text-gray-50 text-sm text-center">
                      {t("compareThisProduct")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="w-full h-[2px] bg-gray-400"></hr>
            <center>
              <p className="font-medium lg:text-lg text-xs py-2 text-gray-600 capitalize tracking-wider dark:text-slate-400">
                {title?.slice(0, 30)}
              </p>
              <div className="flex gap-2 justify-center items-center">
                {filteredColors?.map((item, i) => (
                  <div className="" key={i}>
                    <div
                      onClick={() => {
                        setImageUrl(
                          `${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${item.fileName}`
                        );
                        setActive(i);
                      }}
                      style={{ background: `${item.color}` }}
                      className={`w-[1rem] h-[1rem] rounded-full cursor-pointer ${
                        active == i && "border-2 border-slate-900"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between gap-4 px-2">
                {discount !== "0" && (
                  <p className="font-medium lg:text-sm text-xs text-rose-600 tracking-wider line-through">
                    {t("rs")}. {markPrice}
                  </p>
                )}

                <p className="font-medium lg:text-sm text-xs text-gray-600 tracking-wider dark:text-slate-400">
                  {t("rs")}. {price}
                </p>
              </div>

              <div className="px-1">
                <div className="flex flex-row gap-4 mt-2 justify-center items-center">
                  <div className="flex items-center">
                    {data?.quantity === 1 && (
                      <div>
                        <button
                          onClick={() => {
                            dispatch(fetchRemoveItem(_id));
                            dispatch(fetchUpdateCart(cartState));
                          }}
                          className="font-thin text-sm text-red-600"
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    )}
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
                      className="mx-2 border border-slate-400 text-base pl-2 pr-2 text-center w-8 h-8 rounded-full dark:bg-slate-900 bg-slate-100 text-gray-400"
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
                      className="dark:bg-slate-900 bg-gray-100 hover:bg-transparent hover:text-rose-600 border-2 border-slate-400 hover:border-rose-600 duration-200 transition-all lg:text-xs text-[10px] w-full  py-1 rounded-full text-gray-400 dark:text-gray-600 tracking-wider"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </center>
            <hr className="w-full h-[1px] bg-gray-400 mt-3 lg:block hidden"></hr>
            <div className="capitalize p-2">
              <div className="flex flex-row justify-between mt-2">
                <div
                  onClick={() => buyNow(cartData)}
                  className="lg:text-sm text-[12px] cursor-pointer flex justify-center items-center text-green-600"
                >
                  <i className="fas fa-hand-holding-usd mt-1 lg:block hidden"></i>
                  <span className=" lg:px-2 px-0 ">order now</span>
                </div>
                <div className="cursor-pointer flex justify-center items-center text-rose-500 lg:text-sm text-[12px] ">
                  <i className="far fa-question-circle mt-1 lg:block hidden"></i>
                  <span onClick={askQuestion} className="lg:px-2 px-0">
                    {t("question")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavCard;
