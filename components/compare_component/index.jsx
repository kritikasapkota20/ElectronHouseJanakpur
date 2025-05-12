import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import useTranslation from "next-translate/useTranslation";
import htmr from "htmr";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumb from "../breadcrumb";
import {
  fetchUpdateCart,
  fetchAddToCart,
  fetchDecreaseCartItem,
  fetchRemoveItemFromCompare,
} from "../../redux/cart/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import handleApiRequest from "@/libs/apiHandler";
import Link from "next/link";
const AddToCartSection = ({ product }) => {
  const [Cart, setCart] = useState([]);
  const cartState = useSelector((state) => state.cartState.stateData);
  const { t, lang } = useTranslation("common");
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    var cart = JSON.parse(localStorage.getItem("myCart"))
      ? JSON.parse(localStorage.getItem("myCart"))
      : [];
    let cartTotal = 0;
    setCart(cart);
    cart.map((item) => {
      cartTotal += item.price * item.quantity;
    });
  }, [cartState]);
  const data = Cart.find((item, i) => item.productId === product._id);
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
          adminId: cartData.adminId?._id,
          title: cartData.title,
          price: cartData.price,
          images: cartData.images,
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
  return (
    <>
      <div className="">
        <div className="flex flex-row gap-4 mt-2 justify-center items-center">
          <div className="flex items-center">
            {data?.quantity > 1 && (
              <svg
                onClick={() => {
                  dispatch(
                    fetchDecreaseCartItem({
                      productId: product._id,
                      quantity: 1,
                      title: product.title,
                      price: product.price,
                      images: product.images,
                      adminId: product.adminId?._id,
                      slug: product.slug,
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
                      productId: product._id,
                      quantity: 1,
                      title: product.title,
                      price: product.price,
                      images: product.images,
                      adminId: product.adminId?._id,
                      slug: product.slug,
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
                    productId: product._id,
                    quantity: 1,
                    title: product.title,
                    price: product.price,
                    images: product.images,
                    adminId: product.adminId?._id,
                    slug: product.slug,
                  })
                );
                dispatch(fetchUpdateCart(cartState));
              }}
              className="bg-rose-600 hover:bg-rose-700 duration-200 transition-all text-xs px-2 w-full py-1 rounded text-gray-50"
            >
              {t("addToCart")}
            </button>
          )}
        </div>
        <div
          onClick={() =>
            buyNow({
              productId: product._id,
              quantity: 1,
              title: product.title,
              price: product.price,
              images: product.images,
              adminId: product.adminId?._id,
              slug: product.slug,
            })
          }
          className="lg:text-sm text-xs mt-3 cursor-pointer flex justify-center items-center text-green-100 bg-green-600 rounded px-2 py-1"
        >
          <span className=" lg:px-2 px-0 "> {t("buyNow")}</span>
        </div>
      </div>
    </>
  );
};

const Description = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      {description && (
        <div>
          {expanded ? (
            <div
              className="text-sm text-gray-600 text-left"
              style={{ overflow: "hidden" }}
            >
              {htmr(description)}
            </div>
          ) : (
            <div
              className="text-sm text-left text-gray-600"
              style={{ overflow: "hidden" }}
            >
              {htmr(description.substring(0, 100) + "...")}
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
    </>
  );
};

const ProductImageSlider = ({ productId }) => {
  const [imagesList, setImagesList] = useState([""]);
  const fetchImages = async () => {
    try {
      const targetPath = `product/get/images/${productId}`;
      const result = await handleApiRequest("GET", targetPath, null, false);
      setImagesList(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchImages();
  }, [productId]);
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {imagesList &&
          imagesList.map((image, i) => (
            <SwiperSlide key={i}>
              <div>
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${image.fileName}`}
                  alt={image.fileName}
                  className="duration-200 transition-all object-fit h-[16rem] w-full"
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

const CompareComponent = () => {
  const [products, setProducts] = useState([]);
  const [state, setState] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const compareProducts = localStorage.getItem("compare")
      ? JSON.parse(localStorage.getItem("compare"))
      : null;
    setProducts(compareProducts);
  }, [state]);
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
    <div>
      <Breadcrumb page="compare" />
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
      <section className="py-2 dark:bg-gray-100 dark:text-gray-600">
        <div className="container mx-auto sm:p-10">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              "@0.75": {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              "@1.00": {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {products &&
              products.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="relative flex flex-col overflow-hidden border-2 rounded-md dark:border-gray-100 shadow">
                    <span
                      className="text-red-500 absolute right-2 cursor-pointer top-0 z-[999]"
                      onClick={() => {
                        dispatch(fetchRemoveItemFromCompare(item._id));
                        setState(!state);
                      }}
                    >
                      <i className="far fa-times"></i>
                    </span>
                    <div className="flex flex-col items-center justify-start space-y-4 dark:bg-gray-100">
                      <ProductImageSlider productId={item._id} />
                    </div>
                    <div className="flex flex-col items-center justify-start px-2 py-8 dark:bg-gray-100">
                      <ul className="self-stretch flex-1 space-y-1 ">
                        <li className="flex justify-start">
                          <Link passHref href={`/product/${item.slug}`}>
                            <span
                              title="click to view the product detail"
                              onClick={() => openProductPage(item.slug)}
                              className="text-base font-normal capitalize text-left  underline underline-offset-2 cursor-pointer"
                            >
                              {item.title}
                            </span>
                          </Link>
                        </li>
                        <li className="flex justify-start">
                          <span className="text-base font-normal capitalize">
                            Price: {item.price}
                          </span>
                        </li>
                        <li className="flex justify-start">
                          <span className="text-base font-normal capitalize">
                            Discount: {item.discount}%
                          </span>
                        </li>
                        <li className="flex justify-start">
                          <p className="text-base font-normal capitalize">
                            Sold by:{" "}
                            <span className="underline underline-offset-2 cursor-pointer">
                              {item?.adminId?.shopName}
                            </span>
                          </p>
                        </li>
                        <li className="">
                          <Description description={item.description} />
                        </li>
                      </ul>
                      <AddToCartSection product={item} />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default CompareComponent;
