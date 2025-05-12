import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Double Heart Necklace For Women",
      price: 98,
      originalPrice: 799,
      discount: "-88%",
      rating: 4.4,
      reviews: 25,
      sold: "1.0K",
      image: "https://picsum.photos/400/400?random=1",
      slug: "double-heart-necklace",
      color: "Silver",
      size: "Not Specified",
      seller: "Pebbles Nepal",
      priceStatus: "Price dropped",
    },
    {
      id: 2,
      name: "Crystal Pendant Necklace",
      price: 150,
      originalPrice: 500,
      discount: "-70%",
      rating: 4.7,
      reviews: 30,
      sold: "500",
      image: "https://picsum.photos/400/400?random=1",
      slug: "crystal-pendant-necklace",
      color: "Gold",
      size: "Adjustable",
      seller: "Gemstone Hub",
      priceStatus: "Price dropped",
    },
    {
      id: 3,
      name: "Rose Gold Plated Chain",
      price: 250,
      originalPrice: 1000,
      discount: "-75%",
      rating: 4.2,
      reviews: 40,
      sold: "750",
      image: "https://picsum.photos/400/400?random=1",
      slug: "rose-gold-chain",
      color: "Rose Gold",
      size: "18 inch",
      seller: "Trendy Blings",
      priceStatus: "Price dropped",
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const addToCart = (id) => {
    // Add to cart logic here
    console.log(`Item ${id} added to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="flex justify-between items-center mb-10">
      <h1 className="text-3xl font-bold text-gray-800 inline-block relative">
          My wishlist
          <span className="block h-1 w-16 bg-[#5D3B8C] mt-2 rounded"></span>
        </h1>
      </div>

      <div className="space-y-4">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300 flex gap-10 p-4"
          >
            {/* Image Container */}
            <div className="relative w-60 ">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-l-xl"
                unoptimized
              />
            </div>

            {/* Content Container */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center">
                  <Link
                    href={`/products/${item.slug}`}
                    className="text-lg font-medium text-gray-800 hover:text-primary line-clamp-2 mb-2 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2 bg-white rounded-md shadow-md text-red-500 hover:text-white hover:bg-red-500 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center mb-2">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill={i < Math.round(item.rating) ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({item.reviews})</span>
                  <span className="text-sm text-gray-600 ml-2">{item.sold} sold</span>
                </div>

                <div className="flex flex-col items-start mb-4">
                  <p className="text-sm text-gray-500 line-through">
                    Rs. {item.originalPrice.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-xl font-bold text-primary">
                      Rs. {item.price.toFixed(2)}
                    </p>
                    <span className="text-sm text-gray-500">{item.discount}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => addToCart(item.id)}
                className="bg-primary hover:bg-[#6D4E97] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200 self-end"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
