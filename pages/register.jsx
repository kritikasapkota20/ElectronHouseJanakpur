import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import Spinner from '@/components/loaders/spinner';

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone) {
      toast.error('Please fill all fields', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return false;
    }

    if (!isChecked) {
      toast.error('Please accept the terms and conditions', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/auth/user/signup`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phonenumber: formData.phone,
          confirmPassword: formData.confirmPassword,
        }
      );

      if (response.data.message) {
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
        router.push('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed', {
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

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
      <div className="min-h-screen bg-gray-50  px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
         

          <div className="bg-white p-8 border border-gray-200 rounded-2xl shadow-xl">
          <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-primary tracking-tight mb-3">
              Create Account
            </h1>
            {/* <p className="text-lg text-gray-600">
              Join our amazing platform today!
            </p> */}
          </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block w-full px-4 py-3.5 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-300 ease-in-out placeholder-gray-400 shadow-sm"
                      required
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="block w-full px-4 py-3.5 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-300 ease-in-out placeholder-gray-400 shadow-sm"
                      required
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-4 py-3.5 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-300 ease-in-out placeholder-gray-400 shadow-sm"
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full px-4 py-3.5 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-300 ease-in-out placeholder-gray-400 shadow-sm"
                    required
                    placeholder="Enter phone number"
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
                    className="block w-full px-4 py-3.5 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-300 ease-in-out placeholder-gray-400 shadow-sm"
                    required
                    placeholder="Create a password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full px-4 py-3.5 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-300 ease-in-out placeholder-gray-400 shadow-sm"
                    required
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary transition duration-150 ease-in-out"
                />
                <label className="ml-3 block text-sm text-gray-700">
                  I accept the{' '}
                  <Link href="/terms" className="text-primary hover:text-primaryHover font-medium">
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-all duration-150 ease-in-out"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="text-primary hover:text-primaryHover font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default Register;