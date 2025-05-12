import React from "react";
import Breadcrumb from '../components/breadcrumb';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <section className="px-4 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="md:text-4xl text-2xl font-bold text-gray-800 inline-block relative mb-6">
            Get in Touch
            <span className="block h-1 w-16 bg-primary mt-2 rounded"></span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
            We&apos;re here to help and answer any questions you might have.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 md:p-10">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none dark:bg-slate-700 dark:text-white transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none dark:bg-slate-700 dark:text-white transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Subject</label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Message subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none dark:bg-slate-700 dark:text-white transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Your message"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none dark:bg-slate-700 dark:text-white transition-all duration-200"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 md:p-10">
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Find Us</h2>
            <div className="bg-gray-200 dark:bg-slate-700 rounded-lg h-80 flex items-center justify-center">
              <p className="text-slate-600 dark:text-gray-300">Map will be displayed here</p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-rose-100 dark:bg-rose-900 w-10 h-10 rounded-full flex items-center justify-center text-primary dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <FaFacebook />
                </a>
                <a 
                  href="#" 
                  className="bg-rose-100 dark:bg-rose-900 w-10 h-10 rounded-full flex items-center justify-center text-primary dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <FaTwitter />
                </a>
                <a 
                  href="#" 
                  className="bg-rose-100 dark:bg-rose-900 w-10 h-10 rounded-full flex items-center justify-center text-primary dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <FaInstagram />
                </a>
                <a 
                  href="#" 
                  className="bg-rose-100 dark:bg-rose-900 w-10 h-10 rounded-full flex items-center justify-center text-primary dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-600 dark:text-gray-400">
            Based in Nepal • Available Worldwide
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;