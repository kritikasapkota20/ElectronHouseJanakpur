import React, { useEffect, useState, useRef } from "react";
import { Spinner } from "..";

const QuickProductView = ({ innerCatSlug }) => {
  const [products, setProducts] = useState([""]);
  const [loading, setLoading] = useState(true);

  const box = useRef(null);
  useEffect(() => {
    window.scrollTo(0, box.current.scrollHeight);
  }, []);
  useEffect(() => {
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/product_filter/inner_category/${innerCatSlug}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.filteredProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [innerCatSlug]);

  return (
    <div ref={box}>
      <section>
        {loading && <Spinner />}
        <div className="">
          {products.length <= 0 ? (
            <div className="p-8 m-8 shadow rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 100 100"
              >
                <circle cx="50" cy="50" r="45" fill="#FFC107" />
                <circle cx="35" cy="40" r="5" fill="#000" />
                <circle cx="65" cy="40" r="5" fill="#000" />
                <path d="M30 70C40 60 60 60 70 70H30Z" fill="#000" />
              </svg>
              <p className="text-sm">
                We apologize for the inconvenience, but currently, there are no
                products available in this category. However, we are actively
                working to add new products every day, and products from this
                category will be available soon. Please check back later to
                explore the latest additions to our inventory. Thank you for
                your understanding and patience.
              </p>
            </div>
          ) : (
            <div>
              <h2 className="py-2 px-3">Quick Category View</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4 shadow p-2">
                  <div className="grid grid-cols-4 gap-2 py-2">
                    {products &&
                      products.map((item, index) => (
                        <>
                          {item && (
                            <div className="shadow rounded bg-slate-50">
                              <img
                                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${item?.featureImage}`}
                                alt=""
                                className="object-cover h-[14rem] w-full"
                              />
                              <p className="text-gray-600 p-2 text-sm">
                                {item.title}
                              </p>
                              <div className="flex justify-center items-center pb-2">
                                <p className="text-gray-600 px-2 text-xl font-semibold">
                                  Rs. {item.sellingPrice}
                                </p>
                                <p className="text-green-600 px-2 text-sm font-semibold">
                                  {item.discount} % off
                                </p>
                                <p className="text-red-600 px-2 text-sm font-semibold line-through">
                                  Rs. {item.markPrice}
                                </p>
                              </div>
                            </div>
                          )}
                        </>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default QuickProductView;
