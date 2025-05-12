import React, { useState } from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
const Top_header = () => {
  const { t, lang } = useTranslation("common");
  const router = useRouter();
  const userDetail = Cookies.get("user-detail")
    ? JSON.parse(Cookies.get("user-detail"))
    : null;
  const openWishlistPage = () => {
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
    router.push("/wishlist");
  };

  return (
    <div className="bg-slate-600 dark:bg-slate-700 text-gray-50 px-4 py-1 text-sm lg:block hidden">
      <div className="flex flex-row justify-between items-center">
        <div>
          <ul className="inline-flex">
            {/* <li className="ml-2">
              <i className="fab fa-facebook-square"></i>
            </li>
            <li className="ml-3">
              <i className="fab fa-twitter-square"></i>
            </li>
            <li className="ml-3">
              <i className="fab fa-instagram"></i>
            </li>
            <li className="ml-3">
              <i className="fab fa-whatsapp"></i>
            </li> */}
            <li className="ml-3 capitalize">
              <Link passHref href="/about">
                <span>
                  <i className="fas fa-address-card mr-1"></i>
                  {t("about")}
                </span>
              </Link>
            </li>
            <li className="ml-3 capitalize">
              <Link passHref href="/contact">
                <span>
                  <i className="fas fa-envelope mr-1"></i>
                </span>
                {t("contact")}
              </Link>
            </li>
         
          </ul>
        </div>

        <div>
          <ul className="inline-flex">
            {!userDetail && (
              <li className="ml-3 capitalize">
                <span className="mr-1">
                  <i className="fas fa-sign-in-alt"></i>
                </span>
                <Link passHref href="/login">
                  {t("login")}
                </Link>
              </li>
            )}
            {!userDetail && (
              <li className="ml-3 capitalize">
                <span>
                  <i className="fas fa-user-plus mr-1"></i>
                </span>
                <Link passHref href="/register">
                  {t("register")}
                </Link>
              </li>
            )}
            {/* <li>
              <label
                for="Toggle1"
                className="inline-flex items-center space-x-2 cursor-pointer dark:text-gray-100"
              >
                <Link href={router.asPath} locale={"en-US"}>
                  <img
                    src={`/img/usa.png`}
                    alt="country-flag"
                    className="w-4 h-4"
                  />
                </Link>
                <Link href={router.asPath} locale={"ne-NP"}>
                  <img
                    src={`/img/nepal.png`}
                    alt="country-flag"
                    className="w-6 h-4"
                  />
                </Link>
              </label>
            </li> */}
            <li
              onClick={openWishlistPage}
              className="ml-3 capitalize"
            >
              <div className="cursor-pointer">
                <span className="mr-1">
                  <i className="far fa-heart"></i>
                </span>
                <Link passHref href="/wishlist">
                  {t("wishlist")}
                </Link>
              </div>
            </li>
            <li className="ml-3 capitalize">
              <span>
                <i className="fas fa-compress-arrows-alt mr-1"></i>
              </span>
              <Link passHref href="/compare">
                {t("compare")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Top_header;
