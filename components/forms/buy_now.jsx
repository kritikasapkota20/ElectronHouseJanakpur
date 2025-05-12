import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "@/components";

const BuyNowForm = ({ closeBuyForm, productData }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [fulladdress, setFulladdress] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFulladdress(`${address}, ${area}, ${city}, ${province}`);
  }, [address, area, city, province]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSubmit = async (e) => {
    if (
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !area ||
      !message ||
      !province ||
      !city
    ) {
      toast.error("Please fill all fields", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    e.preventDefault();
    setLoading(true);
    try {
      const newAddressData = {
        fullName,
        email,
        phone,
        fulladdress,
        productId: productData._id,
        quantity,
        adminId: productData.adminId,
        totalAmount: quantity * productData.price,
        message,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/buy/add`,
        newAddressData,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      closeBuyForm();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed z-[999] w-[100%] top-[2rem] inset-0 transition-all duration-1000 h-[100%] overflow-y-scroll">
      <div className="container mx-auto lg:px-10 px-4">
        <div className="bg-gray-200 rounded shadow-lg p-4 px-4 mx-auto ">
          <div className="flex justify-end">
            <button
              onClick={() => closeBuyForm()}
              className="text-red-600 text-2xl font-bold py-1 px-2 h-8 rounded-full focus:mt-2"
            >
              <i className="fal fa-times-square rounded-full"></i>
            </button>
          </div>
          <div className="flex lg:flex-row flex-col gap-8 justify-between lg:mb-0 mb-8">
            <div className="">
              <p className="pb-3">Selected product</p>
              <div className="w-full h-80">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${productData.image}`}
                  alt={productData.slug}
                  className="lg:object-cover object-contain w-full h-full "
                />
              </div>
              <div>
                <h1 className="font-medium text-xl mt-2 tracking-wider">
                  {productData.title}
                </h1>
                <p>Rs. {productData.price}</p>
                <div className="flex gap-5 pt-2 border-0 border-gray-100 items-center justify-center">
                  {quantity > 1 && (
                    <button
                      className="bg-green-500 text-white px-3 py-1 text-center rounded-3xl text-xl"
                      onClick={decrementQuantity}
                    >
                      -
                    </button>
                  )}
                  <h1 className="text-xl">Quantity: {quantity}</h1>

                  <button
                    className="bg-orange-500 text-white px-3 py-1 rounded-3xl text-lg"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 text-gray-600 tracking-wider">
              <div className="col-span-3">
                <div className="grid gap-4 gap-y-2 text-sm lg:grid-cols-2 grid-cols-1">
                  <div>
                    <label className="text-gray-500" htmlFor="full_name">
                      Full Name
                    </label>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      type="text"
                      name="fullName"
                      id="full_name"
                      className="h-10 border mt-1 rounded-full  px-4 w-full bg-gray-50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500" htmlFor="full_name">
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      className="h-10 border mt-1 rounded-full px-4 w-full bg-gray-50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500" htmlFor="email">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      id="email"
                      className="h-10 border mt-1 rounded-full px-4 w-full bg-gray-50 focus:outline-none"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder=""
                    />
                  </div>

                  <div>
                    <label className="text-gray-500" htmlFor="city">
                      Province
                    </label>
                    <input
                      required
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="h-10 border mt-1 rounded-full px-4 w-full bg-gray-50 focus:outline-none"
                      name="province"
                      id="province"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500" htmlFor="city">
                      City
                    </label>
                    <input
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="h-10 border mt-1 rounded-full px-4 w-full bg-gray-50 focus:outline-none"
                      name="city"
                      id="city"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500" htmlFor="area">
                      Area
                    </label>

                    <input
                      required
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="h-10 border mt-1 rounded-full px-4 w-full bg-gray-50 focus:outline-none"
                      name="area"
                      id="area"
                    />
                  </div>

                  <div>
                    <label className="text-gray-500" htmlFor="address">
                      Street Address
                    </label>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      type="text"
                      name="streetAddress"
                      id="address"
                      className="h-10 border mt-1 rounded-full px-4 w-full bg-gray-50 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="postal-code">Message</label>
                    <textarea
                      required
                      rows={3}
                      name="message"
                      id="message"
                      className="h-24 border mt-1 rounded-2xl p-3 w-full bg-gray-50"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="flex justify-end py-3">
                  <button
                    onClick={handleSubmit}
                    className="lg:w-[25%] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 tracking-wider"
                  >
                    Place order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNowForm;
