import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiSearch } from 'react-icons/fi';
import AOS from 'aos';
import { FiMail } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import 'aos/dist/aos.css';

export const categories = [
  { name: 'Smartphones', icon: '📱', href: '/category/smartphones', slug: 'smartphones' },
  { name: 'Laptops', icon: '💻', href: '/category/laptops', slug: 'laptops' },
  { name: 'Tablets', icon: '📱', href: '/category/tablets', slug: 'tablets' },
  { name: 'Audio', icon: '🎧', href: '/category/audio', slug: 'audio' },
  { name: 'Cameras', icon: '📸', href: '/category/cameras', slug: 'cameras' },
  { name: 'Gaming', icon: '🎮', href: '/category/gaming', slug: 'gaming' },
  { name: 'Smart Home', icon: '🏠', href: '/category/smart-home', slug: 'smart-home' },
  { name: 'Accessories', icon: '🔌', href: '/category/accessories', slug: 'accessories' },
  { name: 'Wearables', icon: '⌚', href: '/category/wearables', slug: 'wearables' },
  { name: 'Networking', icon: '🌐', href: '/category/networking', slug: 'networking' },
  { name: 'Drones', icon: '🚁', href: '/category/drones', slug: 'drones' },
  { name: 'Smartwatches', icon: '⌚', href: '/category/smartwatches', slug: 'smartwatches' },
  { name: 'VR Headsets', icon: '🕶️', href: '/category/vr-headsets', slug: 'vr-headsets' },
];

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.category-dropdown') && !event.target.closest('.category-button')) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar - Visible on Mobile */}
      <div className="flex flex-col md:flex-row  px-4 sm:px-6 md:px-8 py-2 justify-between items-center text-xs bg-gray-100  border-b border-gray-200">
        <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-8 text-gray-600">
          <div className="flex items-center space-x-2 ">
            <FiMail className='text-primary' size={18} />
            <span className="text-sm md:text-[14px]">info@electronhouse.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaPhoneAlt className='text-primary' size={16} />
            <span className="text-sm md:text-[14px]">01-4367854 / 9867452367</span>
          </div>
          <div className="flex items-center space-x-2">
            <HiOutlineLocationMarker className='text-primary' size={18} />
            <span className="text-sm md:text-[14px]">Janakpur,Nepal</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-primary font-semibold mt-2 md:mt-0">
          24/7 Customer Service
        </div>
      </div>

      {/* Main Header */}
      
<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
  <div className="flex items-center justify-between h-20">

    {/* Logo Section */}
{/* Logo Section */}
<div className="flex-1 flex items-center ">
  <Link 
    href="/" 
    className="flex items-center space-x-4 transition-transform hover:scale-105"
  >
    {/* <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-2 bg-white rounded-lg border border-gray-100 shadow-lg hover:shadow-xl transition-all"
    > */}
      <img
        src="/logo.jpeg"
        alt="Electron House Logo"
        className="h-12 w-auto object-contain rounded-sm"
      />
    {/* </motion.div> */}
    <span className="hidden sm:block text-2xl font-bold   text-primary">
      {/* bg-gradient-to-r from-primary to-blue-600 bg-clip-text */}
      Electron House
    </span>
  </Link>
</div>


    {/* Navigation Section */}
    <div className="flex-1 hidden md:flex justify-start">
      <nav className="">
        <ul className="flex items-center space-x-4 whitespace-nowrap">
          <li><Link href="/" className="text-gray-700 hover:text-primary transition duration-300 px-2 py-1">Home</Link></li>
          
          <li><Link href="/products" className="text-gray-700 hover:text-primary transition duration-300 px-2 py-1">Products</Link></li>
          <li><Link href="/about" className="text-gray-700 hover:text-primary transition duration-300 px-2 py-1">About</Link></li>
          <li><Link href="/gallery" className="text-gray-700 hover:text-primary transition duration-300 px-2 py-1">Gallery</Link></li>
          <li><Link href="/contact" className="text-gray-700 hover:text-primary transition duration-300 px-2 py-1">Contact</Link></li>
          
        </ul>
      </nav>
    </div>

    {/* Search Section */}
    <div className="flex-1 hidden md:flex justify-end">
      <div className="w-80">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full py-2 px-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-primaryHover transition duration-300">
            <FiSearch className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu Button */}
    <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="md:hidden text-gray-700 hover:text-primary transition duration-300"
      aria-label="Open menu"
    >
      <FiMenu className="w-7 h-7" />
    </button>

  </div>
</div>


      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full py-2 px-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-primaryHover transition duration-300">
            <FiSearch className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -300 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-[9999]"
          >
            <div className="absolute top-0 left-0 w-full h-[95vh] bg-white shadow-lg p-6 flex flex-col gap-6 overflow-y-auto">
              <div className="flex justify-between items-center pb-4 border-b">
                <Link href="/" className="text-2xl font-bold text-primary">Electron House</Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary p-2"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="space-y-4">
                <Link href="/" className="block text-gray-700 hover:text-primary font-medium py-3 px-2 border-b">Home</Link>
                <Link href="/products" className="block text-gray-700 hover:text-primary font-medium py-3 px-2 border-b">Products</Link>
                {/* <div className="relative">
                  <button
                    className="w-full text-gray-700 hover:text-primary font-medium flex items-center justify-between py-3 px-2 border-b"
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  >
                    <span>Categories</span>
                    <svg className={`w-4 h-4 transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isCategoryDropdownOpen && (
                    <div className="pl-4 mt-2 space-y-2">
                      {categories.map((category, index) => (
                        <Link
                          key={index}
                          href={category.href}
                          className="block py-2 px-2 text-gray-700 hover:text-primary rounded-lg hover:bg-gray-50"
                        >
                          <span className="mr-2 text-lg">{category.icon}</span>
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div> */}
                <Link href="/about" className="block text-gray-700 hover:text-primary font-medium py-3 px-2 border-b">About</Link>
                <Link href="/about" className="block text-gray-700 hover:text-primary font-medium py-3 px-2 border-b">Gallery</Link>

                <Link href="/contact" className="block text-gray-700 hover:text-primary font-medium py-3 px-2 border-b">Contact</Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;