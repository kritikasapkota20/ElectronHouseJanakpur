import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/loaders/spinner";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import TermsAndConditions from "../../components/term_and_conditions";

const Token = () => {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const activateUser = async () => {
    setLoading(true);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/auth/user/activate`,
      {
        token: token,
      }
    );

    if (response.data.message) {
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/login");
    } else if (response.data.error) {
      toast.error(response.data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/register");
    }
    setLoading(false);
  };
  return (
    <div className="bg-gray-200 w-full lg:px-16 px-8 md:px-0 h-screen flex items-center justify-center relative">
      {showTerms && <TermsAndConditions setShowTerms={setShowTerms} />}
      <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-8 lg:w-[70%] w-full md:px-4 lg:px-24 py-8 rounded-lg shadow-2xl">
        <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
          Activate Your Account
        </p>
        <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">
          click on the button to activate your account.
        </p>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="termsCheckbox"
            className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="termsCheckbox" className="ml-2 text-gray-700">
            I accept the{" "}
            <span onClick={() => setShowTerms(true)} className="text-blue-600 cursor-pointer">terms and conditions</span>
          </label>
        </div>
        <button
          onClick={activateUser}
          className="flex cursor-pointer items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150"
          title="Activate your account"
        
        >
          <span>Activate Account</span>
        </button>
      </div>
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
      {loading && <Spinner />}
    </div>
  );
};

export default Token;
