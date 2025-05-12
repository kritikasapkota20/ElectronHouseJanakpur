import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import htmr from "htmr";
import {
  fetchUpdateCart,
  fetchAddToCart,
  fetchDecreaseCartItem,
  fetchRemoveItem,
} from "../../redux/cart/cartActions";
import { useDispatch, useSelector } from "react-redux";

const BannerCard = ({
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
  const [expanded, setExpanded] = useState(false);
  const [Cart, setCart] = useState([""]);
  const [CartTotal, setCartTotal] = useState("");
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartState.stateData);

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
  }, []);
  const data = Cart.find((item, i) => item.productId === _id);

  return (
    <div className="bg-white dark:bg-slate-800 tracking-wider h-full">
      <div>
        <div className="relative">
          {image && (
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${image}`}
              alt={title}
              className="w-full h-[40vh] object-cover blur-md"
            />
          )}
          {image && (
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${image}`}
              alt={title}
              className="w-[100%] h-[40vh]  object-contain absolute bottom-0"
            />
          )}
        </div>
        <div className="px-2 py-2">
          <p className="text-gray-600 dark:text-gray-50 text-sm">
            {title?.substring(0, 60)}...
          </p>
          <div className="flex flex-row gap-4 py-2">
            <p className="text-red-600 line-through text-sm">Rs. {markPrice}</p>
            <p className="text-gray-600 text-sm">{discount} %Off</p>
            <p className="text-green-600 text-sm">Rs. {price}</p>
          </div>
          <div>
            {expanded ? (
              <div
                className="text-xs text-gray-600 dark:text-gray-50 product_description text-justify"
                style={{ overflow: "hidden" }}
              >
                {htmr(description)}
              </div>
            ) : (
              <div
                className="text-xs text-gray-600 dark:text-gray-50 product_description text-justify"
                style={{ overflow: "hidden" }}
              >
                {htmr(description?.substring(0, 142) + "...")}
              </div>
            )}
            <button
              className="text-sm text-rose-600"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Read Less <<" : "Read More >>"}
            </button>
          </div>
          <div className="flex gap-3 py-3 items-center justify-center">
            <div className="relative heart-icon">
              <i className=" far fa-heart bg-gray-600 backdrop-filter backdrop-blur-lg bg-opacity-25 px-3 py-2 rounded-full text-gray-50 text-sm hover:bg-rose-500 hover:text-gray-5 cursor-pointer"></i>

              <p className="wishlist-msg absolute backdrop-filter backdrop-blur-lg bg-opacity-25 -bottom-6 -left-2 bg-gray-800 w-[7rem] rounded-full text-gray-50 px-2 text-sm text-center">
                add to wishlist
              </p>
            </div>
            <div className="relative compare-icon">
              <i className="fas fa-not-equal bg-gray-600 px-3 py-2 hover:bg-rose-500 hover:text-gray-5 cursor-pointer  rounded-full text-gray-50 text-sm backdrop-filter backdrop-blur-lg bg-opacity-25"></i>
              <p className="compare-msg absolute backdrop-filter backdrop-blur-lg bg-opacity-25 -bottom-6 right-0 lg:right-1 bg-gray-800 w-[10rem] rounded-full text-gray-50 text-sm text-center">
                compare this product
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
                            quantity: 1,
                            title: title,
                            price: price,
                            image: image,
                            adminId: 1,
                            slug: slug,
                          })
                        );
                        dispatch(fetchUpdateCart(cartState));
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
                            quantity: 1,
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
                          quantity: 1,
                          title: title,
                          price: price,
                          image: image,
                          adminId: adminId?._id,
                          slug: slug,
                        })
                      );
                      dispatch(fetchUpdateCart(cartState));
                    }}
                    className="dark:bg-slate-900 bg-gray-100 hover:bg-transparent hover:text-rose-600 border-2 border-slate-400 hover:border-rose-600 duration-200 transition-all lg:text-xs text-[10px] w-full  py-1 px-2 rounded-full text-gray-400 dark:text-gray-600 tracking-wider"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
