import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "@/components";
const AddressDetail = ({
  addressId,
  setShowAddressDetail,
  handleDD,
  handleAddress,
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
  const [addressData, setAddressData] = useState({});
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  // const [cities, setCities] = useState([]);
  // const [allArea, setAllArea] = useState([""]);
  // const [filteredCities, setFilteredCities] = useState([""]);
  // const [filteredArea, setFilteredArea] = useState([""]);
  const [deliveryCharge, setDeliveryCharge] = useState("");

  // const filterCity = (stateId) => {
  //   const filterData = cities.filter((item) => item?.stateId?._id === stateId);
  //   setFilteredCities(filterData);
  // };
  // const filterArea = (cityId) => {
  //   const filterData = allArea.filter((item) => item?.cityId?._id === cityId);
  //   setFilteredArea(filterData);
  //};

  useEffect(() => {
    setLoading(true);
    const token = Cookies.get("user-token") ? Cookies.get("user-token") : null;
    if (token?.length > 10) {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/address/get/${addressId}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "user-token": token,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setAddressData(data.address);
          setTitle(data.address.title);
          setFullName(data.address.fullName);
          setEmail(data.address.email);
          setPhone(data.address.phone);
          setAddress(data.address.address);
          setProvince(data.address.province._id);
          setCity(data.address.city);
          setArea(data.address.area);
          setMessage(data.address.message);
          setDeliveryCharge(data.address.city.deliveryCharge);
          handleDD(data.address.city.deliveryCharge);
          handleAddress(
            data.address.province.stateName,
            data.address.city,
            data.address.area,
            data.address.address,
            data.address.phone
          );
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const newaAddressData = {
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

  const handleSubmit = (e) => {
    if (
      !title ||
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !area ||
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
    const token = Cookies.get("user-token") ? Cookies.get("user-token") : null;
    if (token?.length > 10) {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/address/update/${addressId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "user-token": token,
          },
          body: JSON.stringify(newaAddressData),
        }
      )
        .then((res) => res.json())
        .then((data) => {
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
          handleDD(deliveryCharge);
          setShowAddressDetail(false);
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
      const getStates = async () => {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/order_address/state/get_all`
        );
        setStates(response.data);
      };
      getStates();
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
  //     };
  //     getArea();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);
  const ddNotify = (data) => {
    Swal.fire({
      title: `Your delivery charge is estimated to be - Rs. ${data}`,
    });
  };
  return (
    <div className="fixed z-[999] w-[100%] top-[4rem] inset-0 transition-all duration-1000 h-[100%] overflow-y-scroll lg:overflow-y-hidden lg:pb-2 pb-[4rem]">
      <div className="container mx-auto lg:w-[50%] w-[95%]">
        <div className="bg-gray-200 rounded shadow-lg p-4 px-4 md:p-8 mb-6 mx-auto ">
          <div className="flex justify-between">
            {loading && <Spinner />}
            <div className="text-gray-600">
              <p className="font-medium text-md tracking-wider">
                Shipping Details
              </p>
              <p className="text-sm tracking-wider capitalize py-2">
                Update the address
              </p>
            </div>
            <button
              onClick={() => setShowAddressDetail(false)}
              className="text-red-600 text-2xl font-bold py-1 px-2 h-8 rounded-full focus:mt-2"
            >
              <i className="fal fa-times-square"></i>
            </button>
          </div>
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 text-gray-600 tracking-wider">
            <div className="col-span-3">
              <div className="grid gap-4 gap-y-2 text-sm lg:grid-cols-2 grid-cols-1">
                {/* <div>
                  <label htmlFor="title">title of the address</label>
                  <input
                    value={addressData.title}
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                    name="title"
                    id="title"
                    className="h-10 border mt-1 rounded-full px-4 w-full bg-gray-50"
                  />
                </div> */}
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
                  <select
                    onChange={(e) => {
                      setProvince(e.target.value);
                      // filterCity(e.target.value);
                    }}
                    id="province"
                    className="h-10 border mt-1 rounded-full px-4 w-full bg-gray-50 focus:outline-none"
                  >
                    <option value={addressData.province?._id}>
                      {addressData.province?.stateName}-selected
                    </option>
                    {states &&
                      states.map((state, i) => (
                        <option key={i} value={state._id}>
                          {state.stateName}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="text-gray-500" htmlFor="city">
                    City
                  </label>
                  {/* <select
                    id="city"
                    className="h-10 border mt-1 rounded-full px-4 w-full bg-gray-50 focus:outline-none"
                    onChange={(e) => {
                      setCity(e.target.value);
                      filterArea(e.target.value);
                      ddNotify(deliveryCharge);
                    }}
                  >
                    <option value={addressData.city?._id}>
                      {addressData.city?.cityName}-selected
                    </option>
                    {filteredCities &&
                      filteredCities.map((city, i) => (
                        <option key={i} value={city._id}>
                          {city.cityName}
                        </option>
                      ))}
                  </select> */}
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
                  {/* <select
                    name="area"
                    id="area"
                    className="h-10 border mt-1 rounded-full px-4 w-full bg-gray-50 focus:outline-none"
                    onChange={(e) => {
                      setArea(e.target.value);
                      filterArea(e.target.value);
                    }}
                  >
                    <option value={addressData.area?._id}>
                      {addressData.area?.areaName}-selected
                    </option>
                    {filteredArea &&
                      filteredArea.map((area, i) => (
                        <option key={i} value={area._id}>
                          {area.areaName}
                        </option>
                      ))}
                  </select> */}
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
                  className="lg:w-[25%] text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                >
                  Update address
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressDetail;
