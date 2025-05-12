import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import Spinner from '@/components/loaders/spinner';
import Cookies from 'js-cookie';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/auth/user/signin`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.message) {
        Cookies.set('user-token', response.data.token);
        Cookies.set('user-detail', JSON.stringify(response.data.currentUser));
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        router.push('/user-profile');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
    setLoading(false);
  };

  const handleGoogleLogin = () => {
    window.open(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/google`, '_self');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white p-8 border border-gray-200 rounded-2xl shadow-2xl">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-extrabold text-primary tracking-tight mb-3">
                Login to your Account
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-4 py-3.5 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D3B8C] focus:border-[#5D3B8C] transition duration-300 ease-in-out placeholder-gray-400 shadow-sm"
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-4 py-3.5 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D3B8C] focus:border-[#5D3B8C] transition duration-300 ease-in-out placeholder-gray-400 shadow-sm"
                    required
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-[#5D3B8C] transition duration-150 ease-in-out"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="font-medium text-primary hover:text-primaryHover"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5D3B8C] disabled:opacity-50 transition-all duration-150 ease-in-out"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5D3B8C] transition-all duration-150 ease-in-out"
                >
                  <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <path
                      d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                      fill="#4285F4"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-primary hover:text-primaryHover font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {loading && <Spinner />}
    </div>
  );
};

export default Login;