import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "@/components/loaders/spinner";
import { useRouter } from "next/router";
import Link from "next/link";
const Userlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/user/signin`,
      {
        email,
        password,
      }
    );
    if (response.data.message) {
      Cookies.set("user-token", response.data.token);
      Cookies.set("user-detail", JSON.stringify(response.data.currentUser));
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
      setloading(false);
      router.push("/user-profile");
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
      setloading(false);
    }
  };
  const google = () => {
    window.open(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/google`, "_self");
  };
  return (
    <div className="bg-white dark:bg-slate-900">
      <div className="py-6">
        <div className="flex bg-gray-50 dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl backdrop-filter backdrop-blur-xl bg-opacity-60">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60')",
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <p className="text-xl text-gray-600 dark:text-gray-400 text-center tracking-wider">
              Welcome back!
            </p>
            <div
              onClick={google}
              className="flex items-center justify-center mt-4 text-white dark:text-gray-400 rounded-full shadow-md hover:bg-gray-100 cursor-pointer"
            >
              <div className="px-4 py-3">
                <svg className="h-6 w-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>
              <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 dark:text-gray-400 font-bold">
                Sign in with Google
              </h1>
            </div>
            {/* <div className="flex items-center justify-center mt-4 text-white dark:text-gray-400  rounded-full shadow-md hover:bg-gray-100">
              <div className="px-4 py-3">
                <svg className="h-6 w-6" viewBox="0 0 24 24">
                  <path
                    d="M16.727 14.184H14.727V21.185H11.727V14.184H9.72597V11.185H11.727V9.18297C11.727 8.29825 12.4017 7.62354 13.2864 7.62354H16.727V10.624H14.727V11.185H16.727V14.184Z"
                    fill="#1877F2"
                  />
                </svg>
              </div>
              <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 dark:text-gray-400 font-bold">
                Sign in with Facebook
              </h1>
            </div> */}

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <div className="text-xs text-center text-gray-500 dark:text-gray-400 uppercase">
                login with
              </div>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-200 dark:bg-slate-900 text-gray-700 dark:text-gray-400 focus:outline-none focus:shadow-outline border border-gray-300 rounded-full py-2 px-4 block w-full appearance-none"
                type="email"
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
                  Password
                </label>
                <div href="#" className="text-xs text-gray-500">
                  Forget Password?
                </div>
              </div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-200 dark:bg-slate-900 text-gray-700 dark:text-gray-400 focus:outline-none focus:shadow-outline border border-gray-300 rounded-full py-2 px-4 block w-full appearance-none"
                type="password"
              />
            </div>
            <div className="mt-8">
              <button
                onClick={handleSubmit}
                className="bg-rose-700 text-white font-bold py-2 px-4 w-full rounded-full hover:bg-red-600"
              >
                Login
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <Link
                href="/register"
                className="text-xs text-gray-500 uppercase font-semibold"
              >
                or sign up
              </Link>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default Userlogin;
