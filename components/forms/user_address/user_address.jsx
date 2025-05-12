import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const UserAddress = ({
  setShowUserAddress,
  setShowAddressDetail,
  setAddressId,
}) => {
  const [title, setTitle] = useState("address a");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  // const [cities, setCities] = useState([]);
  // const [allArea, setAllArea] = useState([""]);
  // const [filteredCities, setFilteredCities] = useState([""]);
  // const [filteredArea, setFilteredArea] = useState([""]);

  const addressData = {
    title,
    fullName,
    email,
    phone,
    address,
    area,
    message,
    province,
    city,
  };
  // const filterCity = (stateId) => {
  //   const filterData = cities.filter((item) => item?.stateId?._id === stateId);
  //   setFilteredCities(filterData);
  //};
  // const filterArea = (cityId) => {
  //   const filterData = allArea.filter((item) => item?.cityId?._id === cityId);
  //   setFilteredArea(filterData);
  // };

  const handleSubmit = (e) => {
    if(!title || !fullName || !email || !phone || !address || !area || !area || !message || !province || !city){
      toast.error("Please fill all fields", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    e.preventDefault();
    const token = Cookies.get("user-token") ? Cookies.get("user-token") : null;
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/address/save`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "user-token": token,
        },
        body: JSON.stringify(addressData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            toast.success(data.message, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setAddressId(data.data._id);
            setShowUserAddress(false);
            setShowAddressDetail(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const userDetails = Cookies.get("user-detail")
      ? JSON.parse(Cookies.get("user-detail"))
      : null;
    setEmail(userDetails?.email);
    setFullName(userDetails?.firstName + " " + userDetails?.lastName);
  }, []);

  useEffect(() => {
    try {
      const fetchState = async () => {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/order_address/state/get_all`
        );
        setStates(response.data);
        setLoading(false);
      };
      fetchState();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useEffect(() => {
  //   try {
  //     const getCities = async () => {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/order_address/city/get_all`
  //       );
  //       setCities(response.data);
  //       setLoading(false);
  //     };
  //     getCities();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   try {
  //     const getArea = async () => {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/order_address/area/get_all`
  //       );
  //       setAllArea(response.data);
  //       setLoading(false);
  //     };
  //     getArea();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  useEffect(() => {
    const fetchPostalCode = async (cityId) => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/order_address/city/get/${cityId}`
      );
      setMessage(response.data.postalCode);
    };
    fetchPostalCode();
  }, []);
  return (
    <div className="fixed z-[999] w-[100%] top-[4rem] inset-0 transition-all duration-1000 h-[100%] overflow-y-scroll lg:overflow-y-hidden lg:pb-2 pb-8">
      <div className="container mx-auto lg:w-[60%] w-[100%]">
        <div className="bg-gray-100 rounded shadow-lg p-4 px-4 md:p-8 mb-6 mx-auto">
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium text-lg">Shipping Details</p>
            </div>
            <button
              onClick={() => setShowUserAddress(false)}
              className="text-red-600 text-2xl font-bold py-1 px-2 h-8 rounded-full focus:mt-2"
            >
              <i className="fal fa-times-square"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
              <div className="col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm lg:grid-cols-2 grid-cols-1">
                  <div>
                    <label htmlFor="title">title of the address</label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      name="title"
                      id="title"
                      required
                      className="h-10 border mt-1 rounded-full px-4 w-full bg-gray-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="full_name">Full Name</label>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      type="text"
                      name="fullName"
                      required
                      id="full_name"
                      className="h-10 border mt-1 rounded-full px-4 w-full bg-gray-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="full_name">Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="h-10 border mt-1 rounded-full px-4 w-full bg-gray-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Phone Number</label>
                    <input
                      type="number"
                      id="email"
                      className="h-10 border mt-1 rounded-full px-4 w-full bg-gray-50"
                      value={phone}
                      required
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label htmlFor="city">Province</label>
                    <select
                      required
                      onChange={(e) => {
                        setProvince(e.target.value);
                        // filterCity(e.target.value);
                      }}
                      id="province"
                      className="h-10 border mt-1 rounded-full px-4 w-full bg-gray-50"
                    >
                      <option value="">select province</option>
                      {states &&
                        states.map((state, i) => (
                          <option key={i} value={state._id}>
                            {state.stateName}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="city">City / Municipality</label>
                    {/* <select
                      required
                      value={city}
                      id="city"
                      className="h-10 border mt-1 rounded-full px-4 w-full bg-gray-50"
                      onChange={(e) => {
                        setCity(e.target.value);
                        filterArea(e.target.value);
                        // fetchPostalCode(e.target.value);
                      }}
                    >
                      <option value="">select city/municipality</option>
                      {filteredCities &&
                        filteredCities.map((city, i) => (
                          <option key={i} value={city._id}>
                            {city.cityName}
                          </option>
                        ))}
                    </select> */}
                    <textarea
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="border mt-1 rounded-full px-4 pt-1 w-full bg-gray-50"
                      name="city"
                      id="city"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="area">Area</label>
                    {/* <select
                      required
                      value={area}
                      name="area"
                      id="area"
                      className="h-10 border mt-1 rounded-full px-4 w-full bg-gray-50"
                      onChange={(e) => setArea(e.target.value)}
                    >
                      <option value="">Area</option>
                      {filteredArea &&
                        filteredArea.map((area, i) => (
                          <option key={i} value={area._id}>
                            {area.areaName}
                          </option>
                        ))}
                    </select> */}
                    <textarea
                      required
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="border mt-1 rounded-full px-4 w-full bg-gray-50"
                      name="area"
                      id="area"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="address">Street Address</label>
                    <textarea
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="border mt-1 rounded-full px-4 w-full bg-gray-50"
                      name="streetAddress"
                      id="address"
                    ></textarea>
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
                    type="submit"
                    className="lg:w-[20%] w-[35%] bg-green-500 font-semibold hover:bg-green-600 lg:py-3 py-2 text-sm text-white uppercase rounded-full"
                  >
                    save address
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserAddress;
