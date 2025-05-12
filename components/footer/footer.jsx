import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { fetch_innercat } from "../../redux/category/inner_category/inner_catActions";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const innerCategory = useSelector((state) => state.innerCategory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch_innercat());
    const newData = innerCategory?.data?.innerCategories?.filter((item) => {
      return item.mainCatId._id == "65b68e0ec4eaca66abb43284";
    });
    setCategories(newData);
  }, [innerCategory]);
  return (
    <>
      <div className="bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2">
            <div
              data-aos="zoom-in"
              className="bg-white dark:bg-slate-900 rounded-lg border p-2 flex items-center gap-4 cursor-pointer"
            >
              <i className="fas fa-shipping-fast text-5xl text-green-600"></i>
              <div className="px-1 py-2">
                <div className="font-normal text-sm mb-2 text-gray-600 tracking-wider">
                  Fast Delivery
                </div>
                <p className="text-orange-500 hover:underline text-xs tracking-wider">
                  Fast delivery
                </p>
              </div>
            </div>
            <div
              data-aos="zoom-in"
              className="bg-white dark:bg-slate-900 rounded-lg border p-2 flex items-center gap-4 cursor-pointer"
            >
              <i className="fas fa-thumbs-up text-5xl text-green-600"></i>
              <div className="px-1 py-2">
                <div className="font-normal text-sm mb-2 text-gray-600 tracking-wider">
                  Authentic Products
                </div>
                <p className="text-orange-500 hover:underline text-xs tracking-wider">
                  100% Authentic Products
                </p>
              </div>
            </div>
            <div
              data-aos="zoom-in"
              className="bg-white dark:bg-slate-900 rounded-lg border p-2 flex items-center gap-4 cursor-pointer"
            >
              <i className="fas fa-money-check text-5xl text-green-600"></i>
              <div className="px-1 py-2">
                <div className="font-normal text-sm mb-2 text-gray-600 tracking-wider">
                  100% Secure Payment
                </div>
                <p className="text-orange-500 hover:underline text-xs tracking-wider">
                  We Ensure Secure Transactions
                </p>
              </div>
            </div>
            <div
              data-aos="zoom-in"
              className="bg-white dark:bg-slate-900 rounded-lg border p-2 flex items-center gap-4 cursor-pointer"
            >
              <i className="fas fa-headset text-5xl text-green-600"></i>
              <div className="px-1 py-2">
                <div className="font-normal text-sm mb-2 text-gray-600 tracking-wider">
                  24/7 Support Center
                </div>
                <p className="text-orange-500 hover:underline text-xs tracking-wider">
                  We Ensure Quality Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100">
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              {/* <img
              src="https://thoplomachine.com/assets/images/logo.png"
              width="100"
              alt=""
              srcset=""
            /> */}
              <p className="lg:text-3xl text-xl font-bold text-orange-600">
                <p to="/">
                  <span className="text-green-600">Himalayan</span> Wears
                </p>
              </p>
              <p className="mt-4 text-sm text-gray-600 text-justify">
                Experience the essence of the Himalayas with the pure hemp
                products from Himalayan Hemp Wears .We make eco-friendly &
                sustainable hemp products that are cultivated using local
                resources and traditional techniques. Embrace the sustainability
                trend with style, using our long-lasting and comfortable
                products, all while empowering communities.
              </p>
              <div className="flex gap-4 hover:cursor-pointer mt-4">
                <Link href="https://www.facebook.com/himalayanwears">
                  <img
                    src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg"
                    width="30"
                    height="30"
                    alt="fb"
                  />
                </Link>

                <img
                  src="https://www.svgrepo.com/show/303115/twitter-3-logo.svg"
                  width="30"
                  height="30"
                  alt="tw"
                />
                <Link href="https://www.instagram.com/himalayan.wears/">
                  <img
                    src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg"
                    width="30"
                    height="30"
                    alt="inst"
                  />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-xl font-semibold tracking-tight text-gray-800 ">
                  Company
                </p>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                  <p className="hover:text-orange-600 hover:scale-105 transition-all duration-150 hover:text-xl hover:text-semibold cursor-pointer">
                    <Link passHref href="/about">
                      About
                    </Link>
                  </p>
                  <p className="hover:text-orange-600 hover:scale-105 transition-all duration-150 hover:text-xl hover:text-semibold cursor-pointer">
                    <Link passHref href="/compare">
                      Compare
                    </Link>
                  </p>
                  <p className="hover:text-orange-600 hover:scale-105 transition-all duration-150 hover:text-xl hover:text-semibold cursor-pointer">
                    <Link passHref href="/wishlist">
                      My Wishlist
                    </Link>
                  </p>
                  <p className="hover:text-orange-600 hover:scale-105 transition-all duration-150 hover:text-xl hover:text-semibold cursor-pointer">
                    My Account{" "}
                  </p>
                  <p className="hover:text-orange-600 hover:scale-105 transition-all duration-150 hover:text-xl hover:text-semibold cursor-pointer">
                    <Link passHref href="/contact">
                      contact
                    </Link>
                  </p>
                </nav>
              </div>
              <div>
                <p className="text-xl font-semibold tracking-tight text-gray-800 ">
                  Catgories
                </p>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                  {categories &&
                    categories.map((item, i) => (
                      <Link
                        key={i}
                        passHref
                        href={`/product_category/${item.slug}`}
                      >
                        <p className="hover:text-orange-600 hover:scale-105 transition-all duration-150 hover:text-xl hover:text-semibold capitalize">
                          {item.title}
                        </p>
                      </Link>
                    ))}
                </nav>
              </div>
              <div className="sm:col-span-1">
                <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800  dark:text-white">
                  Subscribe our newsletter to get an update.
                </h1>

                <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                  <input
                    id="email"
                    type="text"
                    className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                    placeholder="Email Address"
                  />

                  <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-green-800 rounded-lg hover:bg-orange-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-xs text-gray-800">
                © {new Date().getFullYear()} Himalayan Wears
              </p>
            </div>
            <div className="flex gap-4 divide-x-2 divide-gray-600">
              <p className="text-xs text-gray-800">
                <Link href="/privacy-policy">Privacy Policy</Link>
              </p>
              <p className="pl-4 text-xs text-gray-800">
                <Link href="/terms-and-conditions">Terms & Conditions</Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
