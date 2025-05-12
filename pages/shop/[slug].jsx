import axios from "axios";
import React, { useState, useRef } from "react";
import { Product_card } from "@/components";
import MetaTag from "@/components/meta_tag";
import Head from "next/head";
import Link from "next/link";
import htmr from "htmr";
const Slug = ({ profile, vendorProducts, uniqueInnerCatObjects }) => {
  const [mapActive, setMapActive] = useState("");
  const [mapHeight, setMapHeight] = useState("100%");
  const [mapRotate, setMapRotate] = useState(false);
  const map = useRef(null);
  function mapToggle() {
    setMapActive(mapActive === "" ? "text-red-600" : "");
    setMapHeight(
      mapActive === "text-red-600" ? "0px" : `${map.current.scrollHeight}px`
    );
    setMapRotate(!mapRotate);
  }
  return (
    <div>
      <Head>
        <script type="application/ld+json">{`${profile.schema}`}</script>
      </Head>
      <MetaTag
        keywords={profile.metaKeyword}
        description={profile.metaDescription}
        title={profile.metaTitle}
        imgUrl={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/profile/${profile.coverImage}`}
        canonicalUrl={`${process.env.NEXT_PUBLIC_CLIENT_URL}/shop/${profile.slug}`}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-row gap-2">
          <nav className="flex flex-col bg-gray-50 w-[25%] h-screen px-4 tex-gray-900 border">
            <div className="flex flex-wrap mt-8">
              <div className="w-full">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/profile/${profile?.coverImage}`}
                  alt={profile?.shopName}
                  className="w-[100%] object-cover h-[10rem] shadow rounded"
                />
                <div>
                  <p className="text-center py-2 capitalize text-xl text-rose-600 font-semibold tracking-wider">
                    {profile.shopName}
                  </p>
                  <p className="text-center py-2 capitalize text-base text-rose-600 font-semibold tracking-wider">
                    {profile.email} <sapn>{profile.phoneNumber}</sapn>
                  </p>
                </div>
                <div className=" mt-2 flex-row flex justify-center items-center  text-gray-600 text-xl">
                  <a href="#" className="w-6 mx-1">
                    <i className="uil uil-facebook-f"></i>
                  </a>
                  <a href="#" className="w-6 mx-1">
                    <i className="uil uil-twitter-alt"></i>
                  </a>
                  <a href="#" className="w-6 mx-1">
                    <i className="uil uil-youtube"></i>
                  </a>
                  <a href="#" className="w-6 mx-1">
                    <i className="uil uil-linkedin"></i>
                  </a>
                  <a href="#" className="w-6 mx-1">
                    <i className="uil uil-instagram"></i>
                  </a>
                </div>
                <div>
                  <div>
                    <div
                      onClick={mapToggle}
                      className="flex flex-row justify-between items-center px-4 py-2 border-b-2 border-gray-600"
                    >
                      <button
                        className={
                          mapActive === ""
                            ? "dashboard-btn lg:text-sm text-xs"
                            : `dashboard-btn lg:text-sm text-xs ${mapActive}`
                        }
                      >
                        Show in Map
                      </button>
                      <i
                        className={
                          mapRotate
                            ? "fas fa-caret-down transform rotate-180"
                            : "fas fa-caret-down"
                        }
                      ></i>
                    </div>

                    <div
                      ref={map}
                      className="overflow-hidden shadow"
                      style={{
                        maxHeight: `${mapHeight}`,
                        transition: "max-height 0.6s ease",
                      }}
                    >
                      <div className="py-2">
                        <Link passHref href={`${profile.mapClickLink}`}>
                          <div>{htmr(profile.googleLocation)}</div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 mb-4">
              <ul className="ml-4">
                <li className="mb-2 px-4 py-4 text-gray-600 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded">
                  <span>
                    <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
                      <path
                        d="M16 20h4v-4h-4m0-2h4v-4h-4m-6-2h4V4h-4m6
                          4h4V4h-4m-6 10h4v-4h-4m-6 4h4v-4H4m0 10h4v-4H4m6
                          4h4v-4h-4M4 8h4V4H4v4z"
                      ></path>
                    </svg>
                  </span>
                  <a href="#">
                    <span className="ml-2">My Orders</span>
                  </a>
                </li>
                <li className="mb-2 px-4 py-4 text-gray-600 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded">
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
                  <a href="#">
                    <span className="ml-2">My Wishlist</span>
                  </a>
                </li>
                <li className="mb-2 px-4 py-4 text-gray-600 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded">
                  <span>
                    <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
                      <path
                        d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2
                          2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0
                          00-2-2h-1V1m-1 11h-5v5h5v-5z"
                      ></path>
                    </svg>
                  </span>
                  <a href="#">
                    <span className="ml-2">Compare</span>
                  </a>
                </li>

                <li className="mb-2 px-4 py-4 text-gray-600 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded">
                  <span>
                    <svg className="fill-current h-5 w-5 " viewBox="0 0 24 24">
                      <path
                        d="M12 13H7v5h5v2H5V10h2v1h5v2M8
                          4v2H4V4h4m2-2H2v6h8V2m10 9v2h-4v-2h4m2-2h-8v6h8V9m-2
                          9v2h-4v-2h4m2-2h-8v6h8v-6z"
                      ></path>
                    </svg>
                  </span>
                  <a href="#">
                    <span className="ml-2">Logout</span>
                  </a>
                </li>
                <li className="mb-2 px-4 py-4 text-gray-600 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded">
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
                  <a href="#">
                    <span className="ml-2">Settings</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="w-[75%] h-screen">
            <div>
              <p className="text-lg pt-2 px-3">
                Categories avaliable in this shop
              </p>
              {uniqueInnerCatObjects &&
                uniqueInnerCatObjects.map((item, i) => (
                  <div
                    key={i}
                    className="py-2 mb-2 px-3 capitalize font-semibold "
                  >
                    <button className="bg-rose-600 px-3 py-1 rounded text-white tracking-wider">
                      {item.title}
                    </button>
                  </div>
                ))}
            </div>
            <section class="antialiased bg-gray-100 text-gray-600">
              <div class="flex h-full">
                <div class="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                  <header class="px-5 py-4 border-b border-gray-100">
                    <div class="font-semibold text-gray-800">
                      products from the vendor.
                    </div>
                  </header>
                  <div className="grid lg:grid-cols-4 grid-cols-2 gap-2">
                    {vendorProducts &&
                      vendorProducts.map((item, index) => (
                        <Product_card
                          key={index}
                          title={item.title}
                          slug={item.slug}
                          price={item.sellingPrice}
                          _id={item._id}
                          image={item.featureImage}
                          description={item.description}
                          markPrice={item.markPrice}
                          discount={item.discount}
                          product={item}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slug;

export async function getServerSideProps({ params }) {
  const { slug } = params;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/profile/get-profile-by-slug/${slug}`
    );
    const profile = response.data.vendorData.profile;
    const vendorProducts = response.data.vendorData.vendorProducts;
    const uniqueInnerCatObjects =
      response.data.vendorData.uniqueInnerCatObjects;

    return {
      props: {
        profile,
        vendorProducts,
        uniqueInnerCatObjects,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        profile: null,
        vendorProducts: null,
        uniqueInnerCatObjects: null,
      },
    };
  }
}
