import React, { useState } from "react";
import { Product_card } from "..";

const TabComponent = ({ products }) => {
  const [activeTab, setActiveTab] = useState("newArrivals");
  const [loading, setLoading] = useState(false);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  function shuffleArrayIndexes(arr) {
    var indexes = Array.from({ length: arr.length }, (_, index) => index);
    for (var i = indexes.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }
    var shuffledArr = indexes.map((index) => arr[index]);
    return shuffledArr;
  }
  var shuffledArray = shuffleArrayIndexes(products);

  return (
    <div className="lg:block hidden">
      <div className="grid grid-cols-5 gap-4 p-2 rounded my-2">
        <button
          className={`${
            activeTab === "newArrivals"
              ? "bg-rose-500 text-gray-50"
              : "bg-white border-2 border-rose-600 text-rose-500"
          } rounded px-3 py-1`}
          onClick={() => handleTabClick("newArrivals")}
        >
          NEW ARRIVALS
        </button>
        <button
          className={`${
            activeTab === "bestSellers"
              ? "bg-rose-500 text-gray-50"
              : "bg-white border-2 border-rose-600 text-rose-500"
          } rounded px-3 py-1`}
          onClick={() => handleTabClick("bestSellers")}
        >
          BEST SELLERS
        </button>
        <button
          className={`${
            activeTab === "specials"
              ? "bg-rose-500 text-gray-50"
              : "bg-white border-2 border-rose-600 text-rose-500"
          } rounded px-3 py-1`}
          onClick={() => handleTabClick("specials")}
        >
          SPECIALS
        </button>
        <button
          className={`${
            activeTab === "bestRated"
              ? "bg-rose-500 text-gray-50"
              : "bg-white border-2 border-rose-600 text-rose-500"
          } rounded px-3 py-1`}
          onClick={() => handleTabClick("bestRated")}
        >
          BEST RATED
        </button>
        <button
          className={`${
            activeTab === "brands"
              ? "bg-rose-500 text-gray-50"
              : "bg-white border-2 border-rose-600 text-rose-500"
          } rounded px-3 py-1`}
          onClick={() => handleTabClick("brands")}
        >
          BRANDS
        </button>
      </div>
      {/* Render tab content based on the activeTab state */}
      {activeTab === "newArrivals" && (
        <div className="px-2">
          <div className="grid lg:grid-cols-5 grid-cols-2 lg:gap-4 gap-2">
            {products &&
              shuffledArray
                .slice(0, 10)
                .map((item, index) => (
                  <Product_card
                    key={index}
                    loading={loading}
                    title={item.title}
                    slug={item.slug}
                    price={item.sellingPrice}
                    _id={item._id}
                    image={item.featureImage}
                    description={item.description}
                    markPrice={item.markPrice}
                    discount={item.discount}
                    adminId={item.adminId}
                    innerCatslug={item?.innerCatId?.slug}
                    product={item}
                  />
                ))}
          </div>
        </div>
      )}
      {activeTab === "bestSellers" && (
        <div className="px-2">
          {" "}
          <div className="grid lg:grid-cols-5 grid-cols-2 lg:gap-4 gap-2">
            {products &&
              shuffledArray
                .slice(0, 10)
                .map((item, index) => (
                  <Product_card
                    key={index}
                    loading={loading}
                    title={item.title}
                    slug={item.slug}
                    price={item.sellingPrice}
                    _id={item._id}
                    image={item.featureImage}
                    description={item.description}
                    markPrice={item.markPrice}
                    discount={item.discount}
                    adminId={item.adminId}
                    innerCatslug={item?.innerCatId?.slug}
                  />
                ))}
          </div>
        </div>
      )}
      {activeTab === "specials" && (
        <div className="px-2">
          {" "}
          <div className="grid lg:grid-cols-5 grid-cols-2 lg:gap-4 gap-2">
            {products &&
              shuffledArray
                .slice(0, 10)
                .map((item, index) => (
                  <Product_card
                    key={index}
                    loading={loading}
                    title={item.title}
                    slug={item.slug}
                    price={item.sellingPrice}
                    _id={item._id}
                    image={item.featureImage}
                    description={item.description}
                    markPrice={item.markPrice}
                    discount={item.discount}
                    adminId={item.adminId}
                    innerCatslug={item?.innerCatId?.slug}
                  />
                ))}
          </div>
        </div>
      )}
      {activeTab === "bestRated" && (
        <div className="px-2">
          {" "}
          <div className="grid lg:grid-cols-5 grid-cols-2 lg:gap-4 gap-2">
            {products &&
              shuffledArray
                .slice(0, 10)
                .map((item, index) => (
                  <Product_card
                    key={index}
                    loading={loading}
                    title={item.title}
                    slug={item.slug}
                    price={item.sellingPrice}
                    _id={item._id}
                    image={item.featureImage}
                    description={item.description}
                    markPrice={item.markPrice}
                    discount={item.discount}
                    adminId={item.adminId}
                    innerCatslug={item?.innerCatId?.slug}
                  />
                ))}
          </div>
        </div>
      )}
      {activeTab === "brands" && (
        <div className="px-2">
          {" "}
          <div className="grid lg:grid-cols-5 grid-cols-2 lg:gap-4 gap-2">
            {products &&
              shuffledArray
                .slice(0, 10)
                .map((item, index) => (
                  <Product_card
                    key={index}
                    loading={loading}
                    title={item.title}
                    slug={item.slug}
                    price={item.sellingPrice}
                    _id={item._id}
                    image={item.featureImage}
                    description={item.description}
                    markPrice={item.markPrice}
                    discount={item.discount}
                    innerCatslug={item?.innerCatId?.slug}
                    adminId={item.adminId}
                  />
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TabComponent;
