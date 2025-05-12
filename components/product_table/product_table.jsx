import React from "react";

const ProductTable = ({ productOrder,closeModal }) => {
  const progress = 1;
  return (
    <div className="fixed top-0 z-[999] w-[100%] bg-[#54545480] h-[100%] left-0 overflow-y-auto overflow-box">
      <button onClick={closeModal} className="bg-red-500 text-white px-2 py-1 float-right m-2 rounded">close</button>
      <div className="container mx-auto shadow-lg my-4 rounded">
        <div className="progress-bar mt-3 shadow bg-white">
          <div
            className={`progress-bar__step ${
              progress >= 1 ? "progress-bar__step--completed" : ""
            }`}
          >
            <div className="progress-bar__icon">
              <i className="fas fa-check"></i>
            </div>
            <div className="progress-bar__label">Pending</div>
          </div>
          <div
            className={`progress-bar__step ${
              progress >= 2 ? "progress-bar__step--completed" : ""
            }`}
          >
            <div className="progress-bar__icon">
              <i className="fas fa-check"></i>
            </div>
            <div className="progress-bar__label">Placed</div>
          </div>
          <div
            className={`progress-bar__step ${
              progress >= 3 ? "progress-bar__step--completed" : ""
            }`}
          >
            <div className="progress-bar__icon">
              <i className="fas fa-check"></i>
            </div>
            <div className="progress-bar__label">Dispatched</div>
          </div>
          <div
            className={`progress-bar__step ${
              progress >= 4 ? "progress-bar__step--completed" : ""
            }`}
          >
            <div className="progress-bar__icon">
              <i className="fas fa-check"></i>
            </div>
            <div className="progress-bar__label">Arrived</div>
          </div>
          {/* <div className="progress-bar__line"></div> */}
        </div>
        <div className="bg-white p-8 rounded-md w-full">
          <div className=" flex items-center justify-between pb-6">
            <div>
              <h2 className="text-gray-600 font-semibold">Products Oder</h2>
              <span className="text-xs">All products item</span>
            </div>
          </div>
          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        products
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        unit price
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Quantity
                      </th>

                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productOrder &&
                      productOrder.map((item, index) => (
                        <tr key={index}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${item.productId.images[0]?.fileName}`}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {item.productId.title}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              Rs. {item.productId.sellingPrice}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.quantity}
                            </p>
                          </td>

                       
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">Activo</span>
                            </span>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">Cancel</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
       
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
