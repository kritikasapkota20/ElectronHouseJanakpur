import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { FaHeart, FaRegHeart, FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

// Mock products data - in a real app, this would come from an API or database
const products = [
  {
    id: 1,
    name: "Samsung 55-inch QLED 4K Smart TV",
    brand: "Samsung",
    slug: "samsung-55-inch-qled-4k-smart-tv",
    description: "Experience stunning visuals with Samsung's QLED technology. This 4K Smart TV features Quantum Dot technology for vibrant colors, HDR support for enhanced contrast, and a powerful processor for smooth performance.",
    longDescription: "The Samsung QLED 4K Smart TV revolutionizes your viewing experience with cutting-edge technology. Featuring Quantum Dot technology that delivers over a billion colors, this TV ensures every scene is displayed with incredible accuracy and vibrancy. The HDR support enhances contrast and brightness, making dark scenes more detailed and bright scenes more vivid. With its powerful processor, enjoy smooth motion and reduced blur during fast-paced action scenes. The smart features allow you to stream your favorite content from popular services, and the built-in voice assistant makes controlling your TV effortless. The sleek, modern design with minimal bezels ensures the focus remains on the stunning picture quality.",
    features: [
      "Quantum Dot technology for over a billion colors",
      "4K UHD resolution (3840 x 2160)",
      "HDR support for enhanced contrast",
      "Smart TV capabilities with built-in apps",
      "Voice control compatibility",
      "Multiple HDMI and USB ports",
      "Bluetooth and Wi-Fi connectivity",
      "Game Mode for reduced input lag",
      "Ambient Mode for seamless room integration",
      "Energy-efficient design"
    ],
    specifications: {
      "Screen Size": "55 inches",
      "Display Technology": "QLED",
      "Resolution": "4K UHD (3840 x 2160)",
      "HDR": "HDR10+, HLG",
      "Smart Features": "Tizen OS",
      "Connectivity": "4 HDMI, 2 USB, Wi-Fi, Bluetooth",
      "Sound": "20W 2.0 Channel",
      "Dimensions": "1232 x 707 x 27.4 mm",
      "Weight": "18.5 kg",
      "Warranty": "1 Year"
    },
    images: [
      "/products/tv1.jpg",
      "/products/tv2.jpg",
      "/products/tv3.jpg",
      "/products/tv4.jpg"
    ],
    rating: 4.5,
    reviewCount: 128,
    category: "Televisions",
    tags: ["Smart TV", "4K", "QLED", "Samsung"]
  },
  {
    id: 2,
    name: "LG Inverter Split AC",
    brand: "LG",
    slug: "lg-inverter-split-ac",
    description: "Energy-efficient cooling with advanced inverter technology. Features dual cooling, anti-virus protection, and smart connectivity for optimal comfort.",
    longDescription: "The LG Inverter Split AC combines advanced technology with energy efficiency to provide superior cooling performance. The dual inverter compressor ensures precise temperature control while consuming minimal power. The anti-virus protection system filters out harmful particles, ensuring clean and healthy air circulation. With smart connectivity features, you can control your AC remotely through your smartphone, making it convenient to adjust settings from anywhere. The sleek design and quiet operation make it perfect for any room in your home.",
    features: [
      "Dual Inverter Technology",
      "Anti-Virus Protection",
      "Smart Connectivity",
      "4-Way Swing",
      "Auto Clean",
      "Low Noise Operation",
      "Energy Saving Mode",
      "Turbo Cooling",
      "Sleep Mode",
      "Auto Restart"
    ],
    specifications: {
      "Cooling Capacity": "1.5 Ton",
      "Energy Rating": "5 Star",
      "Refrigerant": "R32",
      "Compressor": "Dual Inverter",
      "Air Flow": "4-Way Swing",
      "Noise Level": "19 dB",
      "Power Consumption": "1100W",
      "Dimensions (Indoor)": "898 x 315 x 195 mm",
      "Dimensions (Outdoor)": "850 x 300 x 600 mm",
      "Warranty": "1 Year on Product, 10 Years on Compressor"
    },
    images: [
      "/product/ac.jpg",
      "/products/ac2.jpg",
      "/products/ac3.jpg",
      "/products/ac4.jpg"
    ],
    rating: 4.3,
    reviewCount: 95,
    category: "Air Conditioners",
    tags: ["AC", "Inverter", "Smart AC", "LG"]
  },
  {
    id: 3,
    name: "Samsung Side by Side Refrigerator",
    brand: "Samsung",
    slug: "samsung-side-by-side-refrigerator",
    description: "Spacious side-by-side refrigerator with Twin Cooling Plus technology. Features digital inverter compressor, deodorizer, and smart connectivity.",
    longDescription: "The Samsung Side by Side Refrigerator offers a perfect blend of style and functionality. The Twin Cooling Plus technology maintains optimal humidity levels in both the refrigerator and freezer compartments, keeping your food fresh for longer. The digital inverter compressor ensures efficient cooling while reducing energy consumption. The built-in deodorizer eliminates unwanted odors, and the smart connectivity features allow you to monitor and control your refrigerator remotely. The spacious design and flexible storage options make it ideal for modern households.",
    features: [
      "Twin Cooling Plus Technology",
      "Digital Inverter Compressor",
      "Deodorizer",
      "Smart Connectivity",
      "FlexZone Drawer",
      "Ice Maker",
      "Water Dispenser",
      "LED Lighting",
      "Frost Free",
      "Energy Efficient"
    ],
    specifications: {
      "Capacity": "655L",
      "Energy Rating": "3 Star",
      "Refrigerator Capacity": "401L",
      "Freezer Capacity": "254L",
      "Compressor": "Digital Inverter",
      "Cooling System": "Twin Cooling Plus",
      "Dimensions": "912 x 1793 x 734 mm",
      "Weight": "120 kg",
      "Color": "Stainless Steel",
      "Warranty": "1 Year on Product, 10 Years on Compressor"
    },
    images: [
      "/product/refrigerator.jpg",
      "/products/refrigerator2.jpg",
      "/products/refrigerator3.jpg",
      "/products/refrigerator4.jpg"
    ],
    rating: 4.7,
    reviewCount: 156,
    category: "Refrigerators",
    tags: ["Refrigerator", "Side by Side", "Smart Fridge", "Samsung"]
  },
  {
    id: 4,
    name: " Stand Fan",
    brand: "Samsung",
    slug: "samsung-stand-fan",
    description: "Energy-efficient ceiling fan with powerful air delivery. Features anti-dust technology and silent operation for enhanced comfort.",
    longDescription: "The Crompton Ceiling Fan combines powerful performance with energy efficiency. The advanced motor technology ensures powerful air delivery while consuming minimal power. The anti-dust technology prevents dust accumulation on the blades, maintaining clean air circulation. The silent operation makes it perfect for bedrooms and living rooms. The sleek design and durable construction ensure long-lasting performance and aesthetic appeal.",
    features: [
      "Energy Efficient Motor",
      "Anti-Dust Technology",
      "Silent Operation",
      "3 Speed Control",
      "Warranty on Motor",
      "Durable Construction",
      "Easy Installation",
      "Low Power Consumption",
      "Wide Air Throw",
      "Modern Design"
    ],
    specifications: {
      "Blade Size": "1200mm",
      "Speed": "3 Speed",
      "Power Consumption": "75W",
      "Air Delivery": "210 CMM",
      "Motor Type": "Copper Wound",
      "Blade Material": "Aluminum",
      "Mounting": "Downrod",
      "Color": "White",
      "Warranty": "2 Years on Product, 5 Years on Motor",
      "Certification": "BEE 5 Star Rated"
    },
    images: [
      "/product/fan.jpg",
      "/products/fan2.jpg",
      "/products/fan3.jpg",
      "/products/fan4.jpg"
    ],
    rating: 4.4,
    reviewCount: 112,
    category: "Fans",
    tags: ["Ceiling Fan", "Energy Efficient", "Crompton"]
  },
  {
    id: 5,
    name: "Kitchen Mixer",
    brand: "MixMaster",
    slug: "kitchen-mixer",
    description: "Powerful kitchen mixer with 750W motor and multiple jars for versatile use.",
    longDescription: "The MixMaster Kitchen Mixer is a versatile kitchen companion designed to handle all your food preparation needs. With its powerful 750W motor, it effortlessly grinds, mixes, and blends various ingredients. The multiple jars allow for different types of food processing, from dry grinding to wet mixing. The durable construction and easy-to-clean design make it a practical addition to any kitchen.",
    features: [
      "750W Powerful Motor",
      "Multiple Jars",
      "Stainless Steel Blades",
      "Overload Protection",
      "Easy to Clean",
      "Durable Construction",
      "Anti-Slip Base",
      "Cord Storage",
      "Safety Lock",
      "Warranty on Motor"
    ],
    specifications: {
      "Power": "750W",
      "Speed": "3 Speed Control",
      "Jars": "3 Jars (Wet, Dry, Chutney)",
      "Material": "Stainless Steel",
      "Base": "Anti-Slip",
      "Cord Length": "1.5m",
      "Weight": "2.5 kg",
      "Color": "Silver",
      "Warranty": "2 Years on Product, 5 Years on Motor",
      "Certification": "ISI Marked"
    },
    images: [
      "/product/mixer.png",
      "/products/mixer2.jpg",
      "/products/mixer3.jpg",
      "/products/mixer4.jpg"
    ],
    rating: 4.5,
    reviewCount: 25,
    category: "Kitchen Appliances",
    tags: ["Mixer", "Kitchen", "MixMaster"]
  },
  {
    id: 6,
    name: "Water Dispenser",
    brand: "HydroPure",
    slug: "water-dispenser",
    description: "Hot and cold water dispenser with energy-saving technology and easy-loading design.",
    longDescription: "The HydroPure Water Dispenser provides convenient access to both hot and cold water. The energy-saving technology ensures efficient operation while maintaining optimal water temperature. The easy-loading design makes it simple to replace water bottles, and the child safety lock prevents accidental hot water dispensing. The sleek design and durable construction make it a perfect addition to any home or office.",
    features: [
      "Hot and Cold Water",
      "Energy Saving Mode",
      "Child Safety Lock",
      "Easy Loading Design",
      "LED Indicators",
      "Drip Tray",
      "Anti-Bacterial Coating",
      "Auto Shut-off",
      "Easy to Clean",
      "Warranty on Compressor"
    ],
    specifications: {
      "Capacity": "3L Hot, 2L Cold",
      "Power": "500W",
      "Voltage": "220-240V",
      "Material": "Stainless Steel",
      "Dimensions": "330 x 330 x 980 mm",
      "Weight": "12 kg",
      "Color": "Silver",
      "Warranty": "1 Year on Product, 3 Years on Compressor",
      "Certification": "ISI Marked"
    },
    images: [
      "/products/dispenser.jpg",
      "/products/dispenser2.jpg",
      "/products/dispenser3.jpg",
      "/products/dispenser4.jpg"
    ],
    rating: 4.2,
    reviewCount: 18,
    category: "Home Essentials",
    tags: ["Water Dispenser", "Home", "HydroPure"]
  }
];

const ProductDetailsPage = () => {
  const router = useRouter()
  const { product_slug } = router.query

  const [wishlistItems, setWishlistItems] = useState([])
  const [selectedTab, setSelectedTab] = useState('details')
  const [mainImage, setMainImage] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlist, setIsWishlist] = useState(false)

  // Function to toggle wishlist status
  const toggleWishlist = (productId) => {
    setWishlistItems(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Find the product based on the slug
  const product = products.find(p => p.slug === product_slug)

  // If router is not ready or product not found, show loading state
  if (!router.isReady) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Loading...</h1>
        </div>
      </div>
    )
  }

  // If product not found, show error state
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
          <p className="text-gray-600 mt-2">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/products" className="text-primary hover:underline mt-4 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  // Set initial main image
  if (!mainImage && product.images && product.images.length > 0) {
    setMainImage(product.images[0])
  }

  const handleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8">
      {/* Breadcrumb */}
        <nav className="flex mb-8">
          <Link href="/" className="text-gray-500 hover:text-primary">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/products" className="text-gray-500 hover:text-primary">Products</Link>
          <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </button>
              ))}
          </div>
        </div>

        {/* Product Info */}
          <div className="space-y-6">
              <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.brand} {product.name}</h1>
              <div className="mt-2 flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                    <FaStar
                        key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                          }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  Category: {product.category}
                </span>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600">{product.description}</p>
          </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setSelectedTab('details')}
                  className={`${
                    selectedTab === 'details'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Details
                </button>
                <button
                  onClick={() => setSelectedTab('specifications')}
                  className={`${
                    selectedTab === 'specifications'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Specifications
                </button>
              <button
                  onClick={() => setSelectedTab('features')}
                  className={`${
                    selectedTab === 'features'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                  Features
              </button>
          </nav>
        </div>

            {/* Tab Content */}
            <div className="mt-6">
          {selectedTab === 'details' && (
                <div className="prose max-w-none">
                  <p className="text-gray-600">{product.longDescription}</p>
                  </div>
              )}

              {selectedTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">{key}</span>
                      <span className="text-gray-900 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'features' && (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleWishlist}
                className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
              >
                {isWishlist ? (
                  <FaHeart className="w-6 h-6 text-primary" />
                ) : (
                  <FaRegHeart className="w-6 h-6" />
                )}
                <span>Add to Wishlist</span>
              </button>
            </div>
            </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us for More Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FaPhone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Call Us</h3>
                <p className="text-gray-600">01-4367854 / 9867452367</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FaEnvelope className="w-6 h-6 text-primary" />
      </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email Us</h3>
                <p className="text-gray-600">info@electronhouse.com</p>
              </div>
                </div>
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FaMapMarkerAlt className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Visit Us</h3>
                <p className="text-gray-600">Nepal, Janakpur, Thapagau Chowk</p>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primaryHover transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage 