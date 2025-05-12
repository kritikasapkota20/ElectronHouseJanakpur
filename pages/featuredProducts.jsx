import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Mock products data - in a real app, this would come from an API or database
const products = [
  {
    id: 1,
    name: "New MacBook Pro",
    slug: "new-macbook-pro",
    brand: "TrendMart",
    price: 810.00,
    originalPrice: 900.00,
    rating: 4,
    reviewCount: 12,
    image: "https://picsum.photos/400/400?random=1",
    // isNew: true,
    // discount: "-8%",
    description: "Experience the power of the new MacBook Pro with M1 chip. Perfect for professionals and creatives.",
    images: [
      "https://picsum.photos/400/400?random=1",
      "https://picsum.photos/400/400?random=2",
      "https://picsum.photos/400/400?random=3",
      "https://picsum.photos/400/400?random=4"
    ],
    questions: [
      {
        id: 1,
        question: "What's the battery life like?",
        answer: "Up to 20 hours of battery life with normal usage.",
        author: "John D.",
        date: "2024-03-15"
      },
      {
        id: 2,
        question: "Does it come with a charger?",
        answer: "Yes, it includes a 67W USB-C power adapter.",
        author: "Sarah M.",
        date: "2024-03-10"
      }
    ]
  },
  {
    id: 2,
    name: "Samsung QLED 4K Smart TV",
    slug: "samsung-qled-4k-smart-tv",
    brand: "SmartShop",
    price: 102.00,
    originalPrice: 110.00,
    rating: 5,
    reviewCount: 8,
    image: "https://picsum.photos/400/400?random=2",
    // isNew: true,
    description: "Stunning 4K QLED display with smart features and voice control.",
    images: [
      "https://picsum.photos/400/400?random=2",
      "https://picsum.photos/400/400?random=3",
      "https://picsum.photos/400/400?random=4"
    ],
    questions: [
      {
        id: 1,
        question: "What's the screen size?",
        answer: "This model comes with a 55-inch display.",
        author: "Mike R.",
        date: "2024-03-12"
      }
    ]
  },
  {
    id: 3,
    name: "Wireless Noise-Cancelling Headphones",
    slug: "wireless-noise-cancelling-headphones",
    brand: "AudioPro",
    price: 299.00,
    originalPrice: 349.00,
    rating: 4.5,
    reviewCount: 25,
    image: "https://picsum.photos/400/400?random=3",
    // isNew: true,
    // discount: "-14%",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    images: [
      "https://picsum.photos/400/400?random=3",
      "https://picsum.photos/400/400?random=4",
      "https://picsum.photos/400/400?random=5"
    ],
    questions: [
      {
        id: 1,
        question: "How long does the battery last?",
        answer: "Up to 30 hours with noise cancellation on, and 40 hours with it off.",
        author: "Lisa T.",
        date: "2024-03-08"
      }
    ]
  },
  {
    id: 4,
    name: "Professional DSLR Camera",
    slug: "professional-dslr-camera",
    brand: "PhotoMaster",
    price: 1299.00,
    originalPrice: 1499.00,
    rating: 4.8,
    reviewCount: 15,
    image: "https://picsum.photos/400/400?random=4",
    // isNew: true,
    // discount: "-13%",
    description: "High-end DSLR camera with 4K video recording and advanced autofocus system.",
    images: [
      "https://picsum.photos/400/400?random=4",
      "https://picsum.photos/400/400?random=5",
      "https://picsum.photos/400/400?random=6"
    ],
    questions: [
      {
        id: 1,
        question: "Does it come with a lens?",
        answer: "Yes, it includes a 18-55mm kit lens.",
        author: "David K.",
        date: "2024-03-05"
      }
    ]
  },
  {
    id: 5,
    name: "Smart Home Security System",
    slug: "smart-home-security-system",
    brand: "SecureHome",
    price: 199.00,
    originalPrice: 249.00,
    rating: 4.6,
    reviewCount: 18,
    image: "https://picsum.photos/400/400?random=5",
    // isNew: true,
    // discount: "-20%",
    description: "Complete smart home security system with motion detection and mobile alerts.",
    images: [
      "https://picsum.photos/400/400?random=5",
      "https://picsum.photos/400/400?random=6",
      "https://picsum.photos/400/400?random=7"
    ],
    questions: [
      {
        id: 1,
        question: "Is it compatible with Alexa?",
        answer: "Yes, it works with Alexa, Google Assistant, and Apple HomeKit.",
        author: "Emma S.",
        date: "2024-03-01"
      }
    ]
  }
]

const FeaturedProducts = () => {
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState('grid')
  const [wishlistItems, setWishlistItems] = useState([])

  // Function to toggle wishlist status
  const toggleWishlist = (productId) => {
    setWishlistItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-5">
        <h1 className="text-3xl font-bold text-gray-800 inline-block relative">
        Featured Products
          <span className="block h-1 w-16 bg-[#5D3B8C] mt-2 rounded"></span>
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Grid */}
        <div className="w-full">
          {/* Sort and View Options */}
          <div className="flex justify-between items-center mb-6">
            <p className="mt-2 text-base text-gray-500">Explore our latest and best-selling products!</p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'text-[#5D3B8C]' : 'text-gray-400'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zm-12 6h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zm-12 6h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'text-[#5D3B8C]' : 'text-gray-400'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div
            className={`grid ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full h-h-full'
                : 'grid-cols-1'
            } gap-4`}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className={`group bg-white rounded-lg overflow-hidden shadow-md px-4 py-4 hover:shadow-lg transition-shadow duration-300 ${
                  viewMode === 'list' ? 'flex items-start border p-4 gap-12 w-full' : ''
                }`}
              >
                {/* Product Image */}
                <div className={`relative ${viewMode === 'list' ? 'w-72 h-full' : 'w-full h-56'} flex-shrink-0`}>
                  {product.discount && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-20">
                      -{product.discount}
                    </span>
                  )}
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-20">
                      NEW
                    </span>
                  )}
                  <div className="relative h-full w-full cursor-pointer overflow-hidden rounded-lg bg-gray-100">
                    <Link href={`/products/${product.slug}`}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </Link>
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="space-y-2 pt-4 pb-4 ">
                    {/* Product Name and Wishlist */}
                    <div className="flex justify-between items-center">
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="text-base  font-medium text-gray-900 cursor-pointer hover:text-primary transition-colors duration-300">
                          {product.name}
                        </h3>
                      </Link>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`p-2 rounded-full hover:bg-gray-100 ${
                          wishlistItems.includes(product.id)
                            ? 'text-red-500'
                            : 'text-gray-400'
                        }`}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Rating and Sold */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`${
                              i < product.rating ? 'text-yellow-400' : 'text-gray-300'
                            } text-sm`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({product.reviewCount})</span>
                      <span className="text-sm text-gray-500">1.0K sold</span>
                    </div>

                    {/* Description (Only in List View) */}
                    {viewMode === 'list' && (
                      <ul className="text-sm text-gray-600 list-disc pl-5">
                        <li>Simple and Reliable</li>
                        <li>Caller ID – so you always know who is calling</li>
                        <li>Easy to read 2.6&quot; display</li>
                        <li>60 entries call log for tracking the call history</li>
                        <li>Speakerphone allows you to talk handsfree</li>
                      </ul>
                    )}

                    {/* Price and Add to Cart */}
                    <div className={`${viewMode === 'list' ? 'flex items-center justify-between' : 'space-y-2'}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-[#5D3B8C]">
                          Rs. {product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            Rs. {product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <button 
                        className={`bg-[#5D3B8C] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 ${
                          viewMode === 'list' ? 'w-[150px]' : 'w-full'
                        }`}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts