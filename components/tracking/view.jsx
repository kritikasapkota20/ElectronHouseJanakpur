import React from "react";

const TrackingView = ({ closeTrackingView }) => {
  return (
    <div className="fixed top-4 lg:w-[40%] w-[100%] bg-gray-600 z-[999] inset-0 mx-auto h-[90%] overflow-y-scroll overflow-box rounded shadow backdrop-filter backdrop-blur-lg bg-opacity-25">
      <div className="flex justify-between items-center px-4 py-2">
        <h3 className="text-xl text-gray-600 font-semibold ml-3 tracking-wider">
          Order Status
        </h3>
        <button
          onClick={closeTrackingView}
          className="text-red-600 text-lg font-bold py-1 px-2 h-8 rounded focus:mt-2"
        >
          <i className="fal fa-times-square"></i>
        </button>
      </div>
      <ol className="px-4">
        <li className="border-l-2 border-purple-600">
          <div className="md:flex flex-start">
            <div className="bg-purple-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                className="text-white w-3 h-3"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
                ></path>
              </svg>
            </div>
            <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10 ">
              <div className="flex justify-between mb-4">
                <a
                  href="#!"
                  className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm"
                >
                  Order Placed
                </a>
                <a
                  href="#!"
                  className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm"
                >
                  04 / 02 / 2022
                </a>
              </div>
              <p className="text-gray-700 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                scelerisque diam non nisi semper.
              </p>
            </div>
          </div>
        </li>
        <li className="border-l-2 border-purple-600">
          <div className="md:flex flex-start">
            <div className="bg-purple-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                className="text-white w-3 h-3"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
                ></path>
              </svg>
            </div>
            <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">
              <div className="flex justify-between mb-4">
                <a
                  href="#!"
                  className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm"
                >
                  Order confirmed
                </a>
                <a
                  href="#!"
                  className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm"
                >
                  04 / 02 / 2022
                </a>
              </div>
              <p className="text-gray-700 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                scelerisque diam non nisi semper.
              </p>
            </div>
          </div>
        </li>
        <li className="border-l-2 border-green-600">
          <div className="md:flex flex-start">
            <div className="bg-green-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                className="text-white w-3 h-3"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
                ></path>
              </svg>
            </div>
            <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">
              <div className="flex justify-between mb-4">
                <a
                  href="#!"
                  className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm"
                >
                  Dispactched
                </a>
                <a
                  href="#!"
                  className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm"
                >
                  12 / 01 / 2022
                </a>
              </div>
              <p className="text-gray-700 mb-6">
                Libero expedita explicabo eius fugiat quia aspernatur autem
                laudantium error architecto.
              </p>
            </div>
          </div>
        </li>
        <li className="border-l-2 border-green-600">
          <div className="md:flex flex-start">
            <div className="bg-green-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                className="text-white w-3 h-3"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
                ></path>
              </svg>
            </div>
            <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">
              <div className="flex justify-between mb-4">
                <a
                  href="#!"
                  className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm"
                >
                  Arrived
                </a>
                <a
                  href="#!"
                  className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm"
                >
                  21 / 12 / 2021
                </a>
              </div>
              <p className="text-gray-700 mb-6">
                Voluptatibus temporibus esse illum eum aspernatur, fugiat
                suscipit natus! Eum corporis illum nihil officiis.
              </p>
            </div>
          </div>
        </li>
        <li className="border-l-2 border-green-600">
          <div className="md:flex flex-start">
            <div className="bg-green-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3.5">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                className="text-white w-3 h-3"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-64zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
                ></path>
              </svg>
            </div>
            <div className="block p-6 rounded-lg shadow-lg bg-gray-100 max-w-md ml-6 mb-10">
              <div className="flex justify-between mb-4">
                <a
                  href="#!"
                  className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm"
                >
                  Delivered
                </a>
                <a
                  href="#!"
                  className="font-medium text-purple-600 hover:text-purple-700 focus:text-purple-800 duration-300 transition ease-in-out text-sm"
                >
                  21 / 12 / 2021
                </a>
              </div>
              <p className="text-gray-700 mb-6">
                Voluptatibus temporibus esse illum eum aspernatur, fugiat
                suscipit natus! Eum corporis illum nihil officiis.
              </p>
            </div>
          </div>
        </li>
      </ol>
    </div>
  );
};

export default TrackingView;
