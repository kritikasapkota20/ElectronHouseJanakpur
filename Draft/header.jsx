import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { FiUser, FiHeart, FiShoppingCart, FiMenu, FiSearch } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FeaturedProducts from './FeaturedProducts';

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
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

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
      if (!event.target.closest('.account-dropdown') && !event.target.closest('.account-button')) {
        setIsAccountDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 text-xs md:text-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <p className="text-white/90">Fast & Free shipping for orders above $99</p>
          <div className="flex items-center space-x-4">
            <span className="text-white/90">24/7 customer service</span>
            <span className="text-white/90">EN</span>
          </div>
        </div>
      </div>

      {/* Mid Bar */}
      <div className="flex items-center justify-between h-20 px-4 md:px-8 bg-white">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 text-2xl md:text-3xl font-bold text-primary">Electron House</Link>
        
        {/* Search Bar - Desktop */}
        <div className="flex-1 mx-4 hidden md:block">
          <div className="relative w-full max-w-xl lg:max-w-2xl xl:max-w-3xl">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full py-2 px-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-sm lg:text-base"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-primaryHover transition duration-300 flex items-center text-sm lg:text-base">
              <FiSearch className="mr-1" />
              <span className="hidden md:inline">Search</span>
            </button>
          </div>
        </div>

        {/* Header Actions */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <div className="relative">
            <button
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              className="flex flex-col items-center text-gray-700 hover:text-primary transition duration-300 account-button"
              title="Account"
            >
              <FiUser className="text-2xl mb-1" />
              <span className="text-xs font-medium">Account</span>
            </button>
            <AnimatePresence>
              {isAccountDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 left-[0.2rem] mt-2 w-40 bg-white rounded-lg shadow-lg py-2 account-dropdown z-[100]"
                >
                  <Link href="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary transition duration-300 text-sm">Login</Link>
                  <Link href="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary transition duration-300 text-sm">Sign Up</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="/wishlist" className="flex flex-col items-center text-gray-700 hover:text-primary transition duration-300" title="Wishlist">
            <FiHeart className="text-2xl mb-1" />
            <span className="text-xs font-medium">Wishlist</span>
          </Link>
          <Link href="/cart" className="flex flex-col items-center text-gray-700 hover:text-primary transition duration-300" title="Cart">
            <FiShoppingCart className="text-2xl mb-1" />
            <span className="text-xs font-medium">Cart</span>
          </Link>
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

      {/* Mobile Search Bar */}
      <div className="block md:hidden px-4 pb-3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 px-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 text-sm"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-lg hover:bg-primaryHover transition duration-300">
            <FiSearch className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Bar (Categories) */}
      <div className="flex items-center h-12 px-4 md:px-8 bg-gray-50 border-t border-b border-gray-200 overflow-x-auto hide-scrollbar">
        <ul className="flex items-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 min-w-max">
          <li><Link href="/" className="text-gray-700 hover:text-primary font-medium transition duration-300 text-sm md:text-base">Home</Link></li>
          <li><Link href="/products" className="text-gray-700 hover:text-primary font-medium transition duration-300 text-sm md:text-base">Shop</Link></li>
          <li className="relative group">
            <button
              className="text-gray-700 hover:text-primary font-medium transition duration-300 flex items-center category-button text-sm md:text-base"
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              aria-haspopup="true"
              aria-expanded={isCategoryDropdownOpen}
            >
              <span>Categories</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {isCategoryDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-4 z-50 category-dropdown"
                  style={{ maxHeight: '400px', overflowY: 'auto' }}
                >
                  <ul className="divide-y divide-gray-200">
                    {categories.map((category, index) => (
                      <li key={index} className="flex items-center px-4 py-2 hover:bg-gray-100 transition duration-300 cursor-pointer">
                        <span className="mr-2 text-lg">{category.icon}</span>
                        <Link href={category.href} className="text-gray-700 hover:text-primary font-medium transition duration-300 text-sm">
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <li><Link href="/about" className="text-gray-700 hover:text-primary font-medium transition duration-300 text-sm md:text-base">About</Link></li>
          <li><Link href="/contact" className="text-gray-700 hover:text-primary font-medium transition duration-300 text-sm md:text-base">Contact</Link></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-[9999]"
          >
            <div className="absolute top-0 left-0 w-3/4 max-w-xs h-full bg-white shadow-lg p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 overflow-y-auto">
              <button onClick={() => setIsMobileMenuOpen(false)} className="self-end text-gray-700 hover:text-primary">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Link href="/" className="text-lg font-bold text-primary mb-2">Electron House</Link>
              <div className="space-y-4">
                <Link href="/" className="block text-gray-700 hover:text-primary font-medium transition duration-300">Home</Link>
                <Link href="/shop" className="block text-gray-700 hover:text-primary font-medium transition duration-300">Shop</Link>
                <div className="relative">
                  <button
                    className="w-full text-gray-700 hover:text-primary font-medium transition duration-300 flex items-center justify-between category-button"
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  >
                    <span>Categories</span>
                    <svg className={`w-4 h-4 transform transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isCategoryDropdownOpen && (
                    <div className="pl-3 mt-2 space-y-2">
                      {categories.map((category, index) => (
                        <Link 
                          key={index} 
                          href={category.href} 
                          className="block py-1.5 text-gray-700 hover:text-primary font-medium transition duration-300 text-sm"
                        >
                          <span className="mr-2 text-lg">{category.icon}</span>
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <Link href="/about" className="block text-gray-700 hover:text-primary font-medium transition duration-300">About</Link>
                <Link href="/contact" className="block text-gray-700 hover:text-primary font-medium transition duration-300">Contact</Link>
              </div>
              <div className="flex flex-col gap-4 mt-4 border-t pt-4">
                <Link href="/login" className="flex items-center gap-2 text-gray-700 hover:text-primary font-medium transition duration-300">
                  <FiUser className="text-lg" /> Login
                </Link>
                <Link href="/wishlist" className="flex items-center gap-2 text-gray-700 hover:text-primary font-medium transition duration-300">
                  <FiHeart className="text-lg" /> Wishlist
                </Link>
                <Link href="/cart" className="flex items-center gap-2 text-gray-700 hover:text-primary font-medium transition duration-300">
                  <FiShoppingCart className="text-lg" /> Cart
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import PropTypes from 'prop-types';

// const defaultBanners = [
//   {
//     title: "JBL Tune 510 Ear Wireless Headphones",
//     text: "Experience premium sound quality with wireless freedom",
//     image: "/products/ac.jpg",
//     link: "/collections/headphones",
//     price: "149.99",
//     discount: 20
//   },
//   {
//     title: "Latest Fashion Collection",
//     text: "Discover our trendy styles and exclusive designs",
//     image: "/products/washingmachine.jpg",
//     link: "/collections/fashion",
//     price: "99.99",
//     discount: 15
//   },
//   {
//     title: "Special Offers",
//     text: "Don't miss out on our amazing deals and discounts",
//     image: "/products/ac.jpg",
//     link: "/collections/special-offers",
//     price: "79.99",
//     discount: 50
//   },
//   {
//     title: "New Arrivals",
//     text: "Check out our latest products and collections",
//     image: "/products/washingmachine.jpg",
//     link: "/collections/new-arrivals",
//     price: "129.99",
//     discount: 30
//   },
//   {
//     title: "New Arrivals",
//     text: "Check out our latest products and collections",
//     image: "/products/mixer.jpg",
//     link: "/collections/new-arrivals",
//     price: "129.99",
//     discount: 30
//   }
// ];

// const Banner = ({ banners = defaultBanners }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [direction, setDirection] = useState(0);
  
//   useEffect(() => {
//     if (!banners || banners.length === 0 || isPaused) return;
    
//     const interval = setInterval(() => {
//       setDirection(1);
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
//     }, 5000);
    
//     return () => clearInterval(interval);
//   }, [banners, isPaused]);
  
//   if (!banners || banners.length === 0) return null;

//   const nextSlide = () => {
//     setDirection(1);
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
//   };

//   const prevSlide = () => {
//     setDirection(-1);
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
//   };

//   const goToSlide = (index) => {
//     setDirection(index > currentIndex ? 1 : -1);
//     setCurrentIndex(index);
//   };

//   const togglePause = () => setIsPaused(!isPaused);

//   const variants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1
//     },
//     exit: (direction) => ({
//       zIndex: 0,
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0
//     })
//   };

//   return (
//     <section 
//       className="relative overflow-hidden z-10 "
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       <div className="max-w-7xl mx-auto ">
//         <div className="relative  ">
//           {/* Navigation Arrows */}
//           <button 
//             className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition-all"
//             onClick={prevSlide}
//             aria-label="Previous slide"
//           >
//             <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//           <button 
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition-all"
//             onClick={nextSlide}
//             aria-label="Next slide"
//           >
//             <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>

//           {/* Banner Content */}
//           <div className="grid grid-cols-1">
//             <AnimatePresence initial={false} custom={direction} mode="wait">
//               <motion.div
//                 key={currentIndex}
//                 custom={direction}
//                 variants={variants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{
//                   x: { type: "spring", stiffness: 300, damping: 30 },
//                   opacity: { duration: 0.2 }
//                 }}
//                 className="min-h-[400px] bg-gradient-to-br from-[#f2f8fd] to-[#c9def2] rounded-2xl overflow-hidden shadow-xl"
//               >
//                 <div className="h-full px-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center h-full py-4 px-6 md:px-12">
//                     <div className="space-y-4 md:space-y-6 text-left">
//                       <motion.h2 
//                         className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.3 }}
//                       >
//                         {banners[currentIndex].title}
//                       </motion.h2>
//                       <motion.p 
//                         className="text-base md:text-lg text-gray-600 line-clamp-3"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.4 }}
//                       >
//                         {banners[currentIndex].text}
//                       </motion.p>
//                       <motion.div 
//                         className="mt-4"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.5 }}
//                       >
//                         <Link
//                           href={banners[currentIndex].link || '#'}
//                           className="inline-block bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primaryHover transition-colors duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
//                         >
//                           Explore Collections
//                         </Link>
//                       </motion.div>
//                     </div>
//                     <div className="h-full flex justify-center items-center p-4">
//                       <motion.img
//                         src={banners[currentIndex].image || "/bannerimg1.png"}
//                         alt={banners[currentIndex].title}
//                         className="w-full h-auto max-h-[320px] object-contain"
//                         whileHover={{ scale: 1.05 }}
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.3, delay: 0.6 }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Dots Navigation */}
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//             {banners.map((_, index) => (
//               <button
//                 key={index}
//                 className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
//                   index === currentIndex ? 'bg-blue-600 md:w-4' : 'bg-gray-300 hover:bg-gray-400'
//                 }`}
//                 onClick={() => goToSlide(index)}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
          
//           {/* Pause/Play Button */}
//           <button 
//             className="absolute bottom-4 right-4 z-10 bg-white/80 rounded-full p-1.5 shadow-lg hover:bg-white transition-all"
//             onClick={togglePause}
//             aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
//           >
//             {isPaused ? (
//               <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             ) : (
//               <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// Banner.propTypes = {
//   banners: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string,
//       text: PropTypes.string,
//       image: PropTypes.string,
//       link: PropTypes.string,
//       price: PropTypes.string,
//       discount: PropTypes.number
//     })
//   )
// };

// export default Banner;