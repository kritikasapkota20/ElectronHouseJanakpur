import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "../data/products"

// Mock products data
// const products = [
//   {
//     id: 1,
//     name: "Samsung 55-inch QLED 4K Smart TV",
//     brand: "Samsung",
//     slug: "samsung-55-inch-qled-4k-smart-tv",
//     description: "Experience stunning visuals with Samsung's QLED technology. This 4K Smart TV features Quantum Dot technology for vibrant colors, HDR support for enhanced contrast, and a powerful processor for smooth performance.",
//     longDescription: "The Samsung QLED 4K Smart TV revolutionizes your viewing experience with cutting-edge technology. Featuring Quantum Dot technology that delivers over a billion colors, this TV ensures every scene is displayed with incredible accuracy and vibrancy.",
//     features: [
//       "Quantum Dot technology for over a billion colors",
//       "4K UHD resolution (3840 x 2160)",
//       "HDR support for enhanced contrast",
//       "Smart TV capabilities with built-in apps",
//       "Voice control compatibility"
//     ],
//     specifications: {
//       "Screen Size": "55 inches",
//       "Display Technology": "QLED",
//       "Resolution": "4K UHD (3840 x 2160)",
//       "HDR": "HDR10+, HLG",
//       "Smart Features": "Tizen OS"
//     },
//     images: [
//       "/products/tv1.jpg",
//       "/products/tv2.jpg",
//       "/products/tv3.jpg",
//       "/products/tv4.jpg"
//     ],
//     rating: 4.5,
//     reviewCount: 128,
//     category: "TV & Entertainment",
//     tags: ["Smart TV", "4K", "QLED", "Samsung"]
//   },
//   {
//     id: 2,
//     name: "LG Inverter Split AC",
//     brand: "LG",
//     slug: "lg-inverter-split-ac",
//     description: "Energy-efficient cooling with advanced inverter technology. Features dual cooling, anti-virus protection, and smart connectivity for optimal comfort.",
//     longDescription: "The LG Inverter Split AC combines advanced technology with energy efficiency to provide superior cooling performance. The dual inverter compressor ensures precise temperature control while consuming minimal power.",
//     features: [
//       "Dual Inverter Technology",
//       "Anti-Virus Protection",
//       "Smart Connectivity",
//       "4-Way Swing",
//       "Auto Clean"
//     ],
//     specifications: {
//       "Cooling Capacity": "1.5 Ton",
//       "Energy Rating": "5 Star",
//       "Refrigerant": "R32",
//       "Compressor": "Dual Inverter",
//       "Air Flow": "4-Way Swing"
//     },
//     images: [
//       "/product/ac.jpg",
//       "/products/ac2.jpg",
//       "/products/ac3.jpg",
//       "/products/ac4.jpg"
//     ],
//     rating: 4.3,
//     reviewCount: 95,
//     category: "Cooling Appliances",
//     tags: ["AC", "Inverter", "Smart AC", "LG"]
//   },
//   {
//     id: 3,
//     name: "Samsung Side by Side Refrigerator",
//     brand: "Samsung",
//     slug: "samsung-side-by-side-refrigerator",
//     description: "Spacious side-by-side refrigerator with Twin Cooling Plus technology. Features digital inverter compressor, deodorizer, and smart connectivity.",
//     longDescription: "The Samsung Side by Side Refrigerator offers a perfect blend of style and functionality. The Twin Cooling Plus technology maintains optimal humidity levels in both the refrigerator and freezer compartments.",
//     features: [
//       "Twin Cooling Plus Technology",
//       "Digital Inverter Compressor",
//       "Deodorizer",
//       "Smart Connectivity",
//       "FlexZone Drawer"
//     ],
//     specifications: {
//       "Capacity": "655L",
//       "Energy Rating": "3 Star",
//       "Refrigerator Capacity": "401L",
//       "Freezer Capacity": "254L",
//       "Compressor": "Digital Inverter"
//     },
//     images: [
//       "/product/refrigerator.jpg",
//       "/products/refrigerator2.jpg",
//       "/products/refrigerator3.jpg",
//       "/products/refrigerator4.jpg"
//     ],
//     rating: 4.7,
//     reviewCount: 156,
//     category: "Refrigeration",
//     tags: ["Refrigerator", "Side by Side", "Smart Fridge", "Samsung"]
//   },
//   {
//     id: 4,
//     name: "Crompton Ceiling Fan",
//     brand: "Crompton",
//     slug: "crompton-ceiling-fan",
//     description: "Energy-efficient ceiling fan with powerful air delivery. Features anti-dust technology and silent operation for enhanced comfort.",
//     longDescription: "The Crompton Ceiling Fan combines powerful performance with energy efficiency. The advanced motor technology ensures powerful air delivery while consuming minimal power.",
//     features: [
//       "Energy Efficient Motor",
//       "Anti-Dust Technology",
//       "Silent Operation",
//       "3 Speed Control",
//       "Warranty on Motor"
//     ],
//     specifications: {
//       "Blade Size": "1200mm",
//       "Speed": "3 Speed",
//       "Power Consumption": "75W",
//       "Air Delivery": "210 CMM",
//       "Motor Type": "Copper Wound"
//     },
//     images: [
//       "/product/fan.jpg",
//       "/products/fan2.jpg",
//       "/products/fan3.jpg",
//       "/products/fan4.jpg"
//     ],
//     rating: 4.4,
//     reviewCount: 112,
//     category: "Small Home Appliances",
//     tags: ["Ceiling Fan", "Energy Efficient", "Crompton"]
//   }
// ];

const categories = [
  "All",
  "TV & Entertainment",
  "Cooling Appliances",
  "Refrigeration",
  // "Small Home Appliances",
  "Kitchen Appliances",
  "Laundry & Cleaning"
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Categories */}
      <h2 className="text-2xl md:text-3xl   font-bold text-gray-800 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-24 after:h-1 after:bg-primary">
        Products
      </h2>
      <div className="flex flex-wrap gap-4 mb-8 mt-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedCategory === category
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } transition duration-300`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Sort and View Options */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-base text-gray-500">
          Showing {filteredProducts.length} products in{" "}
          <span className="font-semibold">{selectedCategory}</span>
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 ${viewMode === "grid" ? "text-primary" : "text-gray-400"
              }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zm-12 6h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zm-12 6h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 hidden md:block ${viewMode === "list" ? "text-primary" : "text-gray-400 "
              }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div
        className={`grid ${viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1"
          } gap-6`}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`group bg-white px-2 rounded-lg overflow-hidden shadow-md hover:mt-[-12px] transition-all duration-300 ${viewMode === 'list' ? 'flex items-start border p-4 gap-12 w-full' : ''
              }`}
          >
            {/* Product Image */}
            <div
              className={`relative ${viewMode === "list" ? "w-[350px] h-48" : "w-full h-56"
                } flex-shrink-0`}
            >
              <Link href={`/products/${product.slug}`}>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cove p-4 group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </Link>
            </div>

            {/* Product Details */}
            <div className="flex-1 p-4">
              <div className="space-y-2">
                {/* Product Name */}
                <h3 className="text-base font-medium text-gray-900 cursor-pointer hover:text-primary transition-colors duration-300">
                  {product.brand} {product.name}
                </h3>

                {/* Rating and Sold */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`${i < product.rating ? 'text-yellow-400' : 'text-gray-300'
                          } text-sm`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.reviewCount})</span>
                </div>

                {/* Description (Only in List View) */}
                {viewMode === 'list' && (
                  <ul className="text-sm text-gray-600 list-disc pl-5">
                    {product.description.split('\n').map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}

                {/* View Details Button */}
                <div className="mt-4">
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-primary text-white hover:bg-primaryHover transition-all duration-300 w-full"
                  >
                    <span className="text-base font-medium">View Details</span>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;