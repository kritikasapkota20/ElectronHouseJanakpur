import React from "react";
import Link from "next/link";
import Image from "next/image";

const CategoriesPage = () => {
  const categories = [
    {
      id: 1,
      name: "Smartphones",
      slug: "smartphones",
      color: "bg-blue-50",
      image: "https://picsum.photos/seed/smartphones/200/200",
      delay: "100",
    },
    {
      id: 2,
      name: "Laptops",
      slug: "laptops",
      color: "bg-orange-50",
      image: "https://picsum.photos/seed/laptops/200/200",
      delay: "200",
    },
    {
      id: 3,
      name: "Tablets",
      slug: "tablets",
      color: "bg-green-50",
      image: "https://picsum.photos/seed/tablets/200/200",
      delay: "300",
    },
    {
      id: 4,
      name: "Audio Devices",
      slug: "audio-devices",
      color: "bg-yellow-50",
      image: "https://picsum.photos/seed/audio/200/200",
      delay: "400",
    },
    {
      id: 5,
      name: "Cameras",
      slug: "cameras",
      color: "bg-purple-50",
      image: "https://picsum.photos/seed/cameras/200/200",
      delay: "500",
    },
    {
      id: 6,
      name: "Gaming Consoles",
      slug: "gaming-consoles",
      color: "bg-red-50",
      image: "https://picsum.photos/seed/gaming/200/200",
      delay: "600",
    },
    {
      id: 7,
      name: "Smart Home",
      slug: "smart-home",
      color: "bg-indigo-50",
      image: "https://picsum.photos/seed/smart-home/200/200",
      delay: "700",
    },
    {
      id: 8,
      name: "Wearables",
      slug: "wearables",
      color: "bg-pink-50",
      image: "https://picsum.photos/seed/wearables/200/200",
      delay: "800",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <section className="bg-gray-50" data-aos="fade-up" aria-label="Categories">
        <div className="flex flex-col space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2
              className="text-2xl md:text-4xl font-bold text-gray-800 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-24 after:h-1 after:bg-[#5D3B8C]"
              data-aos="fade-up"
            >
              Explore Categories
            </h2>
          </div>
          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8">
            {categories.map((category) => (
              <Link
                href={`/category/${category.slug}`}
                key={category.id}
                className={`${category.color} group flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                data-aos="fade-up"
                data-aos-delay={category.delay}
                aria-label={`View ${category.name} products`}
              >
                {/* Category Image */}
                <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  <div className="w-24 h-24 flex items-center justify-center bg-white shadow-md rounded-xl overflow-hidden p-3">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={96}
                      height={96}
                      className="w-20 h-20 object-contain"
                      unoptimized
                      onError={(e) => {
                        e.target.src = '/placeholder-image.png';
                      }}
                    />
                  </div>
                </div>
                {/* Category Name */}
                <h3 className="text-center text-sm font-medium text-gray-700 group-hover:text-[#5D3B8C] transition-colors duration-300">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;