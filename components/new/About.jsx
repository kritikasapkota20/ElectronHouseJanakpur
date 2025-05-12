 import React from "react";
import Link from "next/link";
import { FaMicrochip, FaShieldAlt, FaLeaf } from "react-icons/fa";
 const About=()=>{
    return (
        <>
         <section className="py-20 bg-white">
             <div className="flex items-center text-center  justify-center">
            <h2 className="text-2xl mb-16 md:text-3xl   font-bold text-gray-800 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-24 after:h-1 after:bg-primary">
              About Us
            </h2>
            {/* <Link
              href="/products"
              className="text-primary font-medium hover:text-primaryHover transition-colors duration-300"
            >
              View All Products
            </Link> */}
          </div>
        <div className="max-w-7xl mx-auto  grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="/product/electronhouse.jpg"
              alt="Our workspace"
              className="rounded-xl shadow-lg  transform hover:scale-105 transition duration-300 w-full md:w-[570px] md:h-[400px] object-cove"
            />
            <div className="absolute top-4 left-4 bg-primary text-white text-sm px-3 py-1 rounded-lg shadow-md">
              Since 2015
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              At <span className="text-primary font-semibold text-justify">Electron House</span>, we’ve been at the forefront of technological innovation since 2015. From humble beginnings in Silicon Valley, we’ve grown into a global leader in consumer electronics and smart devices.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed text-justify">
              Our mission is to deliver cutting-edge products that enhance everyday life while maintaining a commitment to sustainability and customer satisfaction.
            </p>
         <Link href="/products">  <button className="bg-primary text-white py-3 px-6 my-4 rounded-lg shadow-lg hover:bg-primaryHover transition duration-300">
              Explore Our Products
            </button></Link> 
          </div>
        </div>
      </section>

      {/* New Section Before Core Values */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Our Core Values
          </h2>
         
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "Pioneering advancements in electronics technology.",
                icon: FaMicrochip,
              },
              {
                title: "Sustainability",
                description: "Eco-friendly practices for a better tomorrow.",
                icon: FaLeaf,
              },
              {
                title: "Customer Focus",
                description: "Delivering exceptional service and support.",
                icon: FaShieldAlt,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center"
              >
                <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
        </>
    )

 }
 export default About;