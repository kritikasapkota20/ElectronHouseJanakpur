import React from "react";
import Products from "./products";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import useTranslation from "next-translate/useTranslation";
const ProductSection = ({ sections }) => {
  const { t } = useTranslation("common");
  return (
    <div className="py-1">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container mx-auto mb-4">
        {sections &&
          sections.map((item, i) => (
            <div key={i} className="mt-4">
              <div className="flex flex-row justify-between items-center px-4">
                <p className="lg:text-2xl text-lg font-semibold tracking-wider lg:py-4 py-1 lg:px-1 text-gray-600 dark:text-white font-serif capitalize">
                  {item.innerCatId?.title}
                </p>
                <Link
                  passHref
                  href={`/product_category/${item.innerCatId?.slug}`}
                >
                  <button className="text-xs font-serif tracking-wider bg-green-500 text-gray-100 px-2 py-1 rounded-full shadow text-center">
                    {t("viewAll")}
                  </button>
                </Link>
              </div>
              <Products innerCatId={item.innerCatId?._id} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductSection;
