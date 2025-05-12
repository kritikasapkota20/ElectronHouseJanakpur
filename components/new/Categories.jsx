import React from "react";
import Link from "next/link";
import Image from "next/image";

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Smartphones",
      icon: "🎧",
      slug: "smartphones",
      color: "bg-blue-50",
      image: "https://picsum.photos/seed/earbuds/100/100",
      delay: "100",
    },
    {
      id: 2,
      name: "Laptops",
      icon: "📱",
      slug: "laptops",
      color: "bg-orange-50",
      image: "https://picsum.photos/seed/apple/100/100",
      delay: "200",
    },
    {
      id: 3,
      name: "Tablets",
      icon: "⌚",
      slug: "tablets",
      color: "bg-green-50",
      image: "https://picsum.photos/seed/watches/100/100",
      delay: "300",
    },
    {
      id: 4,
      name: "Cameras",
      icon: "🎮",
      slug: "cameras",
      color: "bg-yellow-50",
      image: "https://picsum.photos/seed/gaming/100/100",
      delay: "400",
    },
    {
      id: 5,
      name: "Networking",
      icon: "🎧",
      slug: "networking",
      color: "bg-purple-50",
      image: "https://picsum.photos/seed/headphones/100/100",
      delay: "500",
    },
    {
      id: 6,
      name: "Power Banks",
      icon: "🔋",
      slug: "power-banks",
      color: "bg-blue-50",
      image: "https://picsum.photos/seed/powerbank/100/100",
      delay: "600",
    },
    {
      id: 7,
      name: "Smart Speakers",
      icon: "📢",
      slug: "smart-speakers",
      color: "bg-purple-50",
      image: "https://picsum.photos/seed/speakers/100/100",
      delay: "700",
    },
  ];

  return (
    <section className="py-12 " data-aos="fade-up" aria-label="Product Categories">
      <div className="container mx-auto">
        <div className="flex flex-col space-y-8">
          <div className="flex items-center justify-between">
            <h2
              className="text-2xl md:text-3xl font-bold text-gray-800 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-24 after:h-1 after:bg-primary"
              data-aos="fade-up"
            >
              Shop By Category
            </h2>
            <Link
              href="/categories"
              className="text-primary font-medium hover:text-[#763dc7] transition-colors duration-300"
            >
              View All Categories
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 lg:gap-8">
            {categories.map((category) => (
              <Link
                href={`/category/${category.slug}`}
                key={category.id}
                className={`${category.color} group flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                data-aos="fade-up"
                data-aos-delay={category.delay}
                aria-label={`View ${category.name} products`}
              >
                <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  <div className="w-20 h-20 flex items-center justify-center bg-white shadow-md rounded-xl overflow-hidden p-3">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-contain"
                      unoptimized
                      onError={(e) => {
                        e.target.src = '/placeholder-image.png';
                      }}
                    />
                  </div>
                </div>
                <h3 className="text-center text-sm font-medium text-gray-700 group-hover:text-primary transition-colors duration-300">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
