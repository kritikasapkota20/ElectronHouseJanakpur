import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const BlogSlug = () => {
  const router = useRouter();

  // Mock data for blog posts
  const blogPosts = [
    {
      title: "How to Build a Detailed Business Plan That Stands Out",
      date: "15 OCTOBER, 2024",
      category: "SOCIAL MEDIA",
      content: "Expedita consequatur aut sed eaque minus Mollitia consequatur ipsum ut eaque illum sint. Sapiente ea explicabo...",
      image: "https://picsum.photos/800/600?random=1"
    },
    {
      title: "Customer Experience Trends That will Define the Next Year",
      date: "12 OCTOBER, 2024",
      category: "BUSINESS",
      content: "Debitis saepe fugiat nisi consequatur. Nihil sed eos dignissimos consequatur. Id veritas Aliquid sed facilis a totam...",
      image: "https://picsum.photos/800/600?random=2"
    },
    {
      title: "Top 9 Content Marketing Trends and Ideas to Increase Traffic",
      date: "8 OCTOBER, 2024",
      category: "BUSINESS",
      content: "What You Need to Know about the Facebook Product Design Interview and What to do about it...",
      image: "https://picsum.photos/800/600?random=3"
    }
  ];

  // Navigation items
  const navItems = [
    { title: 'Home', href: '/', active: true },
    { title: 'Accessories', href: '/accessories', hasChildren: true },
    { title: 'Phones', href: '/phones', hasChildren: true },
    { title: 'Smart Devices', href: '/smart-devices', hasChildren: true },
    { title: 'Laptop & Computers', href: '/laptops', hasChildren: true },
    { title: 'Chargers & Cables', href: '/chargers', hasChildren: true }
  ];

  // Featured product data
  const featuredProduct = {
    title: "Latest Wireless Headphones",
    image: "https://picsum.photos/600/400?random=4"
  };

  // New products data
  const newProducts = [
    {
      title: "Portronics SoundDrum TWS Portable Bluetooth",
      price: "$32.00",
      image: "https://picsum.photos/200/200?random=5",
      rating: 5
    },
    {
      title: "Bluetooth Wireless Headphones With...",
      price: "$22.00",
      image: "https://picsum.photos/200/200?random=6",
      rating: 4
    },
    {
      title: "APPLE iPad Mini (6th Gen) 64 GB ROM 8.3...",
      price: "$590.00",
      image: "https://picsum.photos/200/200?random=7",
      rating: 5
    },
    {
      title: "APPLE iPad Mini (6th Gen) 64 GB ROM 8.3...",
      price: "$590.00",
      image: "https://picsum.photos/200/200?random=7",
      rating: 5
    },
    {
      title: "APP iPad Mini (6th Gen) 64 GB ROM 8.3...",
      price: "$590.00",
      image: "https://picsum.photos/200/200?random=7",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 ">
          <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 inline-block relative">
          Latest Blog
          <span className="block h-1 w-16 bg-[#5D3B8C] mt-2 rounded"></span>
        </h1>
          
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="lg:w-1/4">
            {/* Navigation Menu */}
            <nav className="bg-white rounded-lg shadow-sm p-4 mb-8">
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={item.href}
                      className={`flex items-center justify-between p-2 rounded ${
                        item.active ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{item.title}</span>
                      {item.hasChildren && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Featured Product Card */}
            <div className="bg-[#D4B595] rounded-lg p-6 mb-8 text-white">
              <h2 className="text-2xl font-bold mb-4">{featuredProduct.title}</h2>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={featuredProduct.image}
                  alt={featuredProduct.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            {/* New Products Section */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">New Products</h2>
              <div className="space-y-4">
                {newProducts.map((product, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="rounded object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">{product.title}</h3>
                      <div className="flex items-center gap-1 text-yellow-400 my-1">
                        {[...Array(product.rating)].map((_, i) => (
                          <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-blue-600 font-medium">{product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content - Blog Grid */}
          <main className="lg:w-3/4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post, index) => (
                <article key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-blue-600">{post.date}</span>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">{post.category}</span>
                    </div>
                    <h2 className="text-lg font-semibold mb-3 line-clamp-2">{post.title}</h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.content}</p>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                      READ MORE
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogSlug;