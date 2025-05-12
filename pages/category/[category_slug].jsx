import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { FiGrid, FiList, FiStar, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { categories } from "../../components/new/Header";

const CategorySlug = () => {
  const router = useRouter();
  const { category_slug } = router.query;
  const categoryData = categories.find(item => item.slug === category_slug);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  if (!categoryData) {
    return <div className="text-center text-xl font-bold text-red-500 mt-10">Category not found!</div>;
  }

  // Format the slug for display (capitalize first letter of each word and replace hyphens with spaces)
  const CategoryName = category_slug
    ? category_slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Category';

  // Get category-specific description
  const getCategoryDescription = (categorySlug) => {
    if (!categorySlug) return "Discover our premium selection of products";

    const descriptions = {
      'smartphones': "Explore our latest smartphones with cutting-edge technology",
      'laptops': "Find the perfect laptop for work, gaming, or everyday use",
      'tablets': "Browse our collection of powerful and versatile tablets",
      'accessories': "Enhance your devices with our premium accessories",
      'audio': "Immerse yourself in high-quality sound with our audio products",
      'cameras': "Capture life's moments with our professional cameras",
      'gaming': "Level up your gaming experience with our gaming gear",
      'smart-home': "Transform your home with our smart home solutions"
    };

    return descriptions[categorySlug] || "Discover our premium selection of electronic devices and accessories";
  };

  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    availability: [],
    color: [],
    brand: [],
    price: [0, 1000],
    rating: null
  });

  // Mock data for products with Picsum images
  const products = [
    {
      id: 1,
      name: "Samsung QLED 4K Smart TV",
      price: 102.00,
      originalPrice: 110.00,
      rating: 4.8,
      reviewCount: 8,
      soldCount: "1.0K",
      image: "https://picsum.photos/seed/tv1/400/400",
      isNew: false,
      description: "Premium 4K QLED Smart TV with stunning picture quality"
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      price: 149.99,
      originalPrice: 179.99,
      rating: 4.5,
      image: "https://picsum.photos/seed/earbuds1/400/400",
      isNew: true,
      discount: "15%",
      description: "Premium wireless earbuds with noise cancellation"
    },
    {
      id: 3,
      name: "4K Ultra HD Camera",
      price: 799.99,
      originalPrice: 899.99,
      rating: 4.7,
      image: "https://picsum.photos/seed/camera1/400/400",
      isNew: true,
      description: "Professional-grade digital camera"
    },
    {
      id: 4,
      name: "Wireless Gaming Mouse",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.6,
      image: "https://picsum.photos/seed/mouse1/400/400",
      discount: "20%",
      description: "High-precision gaming mouse with RGB"
    },
    {
      id: 5,
      name: "Ultra-Slim Laptop",
      price: 1299.99,
      originalPrice: 1499.99,
      rating: 4.9,
      image: "https://picsum.photos/seed/laptop1/400/400",
      isNew: true,
      description: "Powerful and portable laptop"
    },
    {
      id: 6,
      name: "Bluetooth Speaker",
      price: 129.99,
      originalPrice: 159.99,
      rating: 4.4,
      image: "https://picsum.photos/seed/speaker1/400/400",
      discount: "15%",
      description: "Waterproof portable speaker"
    }
  ];

  // Filter and sort products based on current filters and sort option
  const filteredAndSortedProducts = React.useMemo(() => {
    let result = [...products];

    // Apply filters
    if (filters.availability.length > 0) {
      // In a real app, you would filter based on actual availability data
      // This is just a placeholder
      result = result.filter(product => {
        if (filters.availability.includes('in-stock')) {
          return true; // Assuming all products are in stock for demo
        }
        return false;
      });
    }

    if (filters.rating) {
      result = result.filter(product => product.rating >= filters.rating);
    }

    // Apply price filter
    result = result.filter(product =>
      product.price >= filters.price[0] && product.price <= filters.price[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting (relevance) - keep original order
        break;
    }

    return result;
  }, [products, filters, sortBy]);

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 ">
        {/* Category Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 inline-block relative">
            {CategoryName}
            <span className="block h-1 w-16 bg-[#5D3B8C] mt-2 rounded"></span>
          </h1>
          <p className="mt-2 text-gray-500">{getCategoryDescription(category_slug)}</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h2 className="font-bold text-xl mb-6 text-gray-900">Filters</h2>
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4 text-gray-800">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.price[1]}
                    onChange={(e) => setFilters({
                      ...filters,
                      price: [filters.price[0], parseInt(e.target.value)]
                    })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${filters.price[0]}</span>
                    <span>${filters.price[1]}</span>
                  </div>
                </div>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4 text-gray-800">Availability</h3>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                      checked={filters.availability.includes('in-stock')}
                      onChange={(e) => {
                        const newAvailability = e.target.checked
                          ? [...filters.availability, 'in-stock']
                          : filters.availability.filter(item => item !== 'in-stock');
                        setFilters({ ...filters, availability: newAvailability });
                      }}
                    />
                    <span className="ml-3 text-gray-700 group-hover:text-blue-500 transition-colors">In Stock</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                      checked={filters.availability.includes('pre-order')}
                      onChange={(e) => {
                        const newAvailability = e.target.checked
                          ? [...filters.availability, 'pre-order']
                          : filters.availability.filter(item => item !== 'pre-order');
                        setFilters({ ...filters, availability: newAvailability });
                      }}
                    />
                    <span className="ml-3 text-gray-700 group-hover:text-blue-500 transition-colors">Pre-order</span>
                  </label>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4 text-gray-800">Rating</h3>
                <div className="space-y-3">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="rating"
                        className="form-radio h-5 w-5 text-blue-500 border-gray-300 focus:ring-blue-500"
                        checked={filters.rating === rating}
                        onChange={() => setFilters({ ...filters, rating })}
                      />
                      <div className="ml-3 flex items-center">
                        <StarRating rating={rating} />
                        <span className="ml-2 text-gray-600">& Up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{products.length}</span> products
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg ${
                        viewMode === 'grid'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <FiGrid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg ${
                        viewMode === 'list'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <FiList className="w-5 h-5" />
                    </button>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded-lg px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid/List View */}
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}>
              {filteredAndSortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl p-4 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative aspect-w-16 aspect-h-9 mb-4 cursor-pointer">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="font-medium text-lg text-gray-900 mb-2 hover:text-[#5D3B8C] cursor-pointer">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FiStar
                          key={star}
                          className={`w-4 h-4 ${
                            star <= product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-500">({product.reviewCount})</span>
                    <span className="text-gray-500">{product.soldCount} sold</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[#5D3B8C] text-xl font-semibold">
                        Rs. {product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through text-sm">
                          Rs. {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button className="text-[#5D3B8C] hover:text-[#4c2f73]">
                      <FiHeart className="w-6 h-6" />
                    </button>
                  </div>
                  <button className="w-full mt-4 bg-[#5D3B8C] text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#4c2f73] transition-colors">
                    <FiShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CategorySlug;