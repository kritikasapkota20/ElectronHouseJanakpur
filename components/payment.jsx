import React, { useState, useEffect } from "react";
import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
export const ESEWA_TEST_PID = "Esewa_Task_1200";
// export const ESEWA_SCD = "NP-ES-MADHESH";
export const ESEWA_SCD = "EPAYTEST";
export const ESEWA_URL = "https://uat.esewa.com.np/epay/main";
export const ESEWA_FRAUD_TEST_URL = "https://uat.esewa.com.np/epay/transrec";
let form = null;
const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    amt: 1,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: 1,
    pid: ESEWA_TEST_PID,
    scd: ESEWA_SCD,
    su: `${process.env.NEXT_PUBLIC_CLIENT_API}/success`,
    fu: `${process.env.NEXT_PUBLIC_CLIENT_API}/failed`,
  });
  const post = () => {
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", ESEWA_URL);
    for (const [key, value] of Object.entries(params)) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", value);
      form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
  };

  const handleSubmit = () => {
    post();
  };

  const khaltiPay = () => {
    let config = {
      publicKey: "test_public_key_78722c023c45465f90b60ea934b51662",
      productIdentity: "1234567890",
      productName: "Drogon",
      productUrl: "http://gameofthrones.com/buy/Dragons",
      eventHandler: {
        async onSuccess(payload) {
          setLoading(true);
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_API}/api/payment/verify-khalti`,
            { payload },
            {
              headers: {
                "user-token": Cookies.get("user-token"),
              },
            }
          );
          setLoading(false);
          Swal.fire("Success", response.data.message, "success");
        },
        onError(error) {
          console.log(error);
        },
        onClose() {
          console.log("widget is closing");
        },
      },
      paymentPreference: [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT",
      ],
    };
    let checkout = new KhaltiCheckout(config);
    checkout.show({ amount: 100 });
  };

  return (
    <div className="w-full mx-auto mt-[2rem] text-center pb-6">
      {/* {loading && <Loader />} */}
      <p className="lg:text-xl text-sm font-semibold text-gray-600 pb-4">
        Pay for your order using.
      </p>
      <div className="flex lg:flex-row flex-col gap-4 justify-center lg:px-4 px-2">
        <div onClick={() => khaltiPay()} className="">
          <p className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Khalti
          </p>
        </div>
        <div onClick={handleSubmit} className="">
          <p className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">
            E-sewa
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
