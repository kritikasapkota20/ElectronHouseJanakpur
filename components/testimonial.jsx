import React, { useEffect, useState } from "react";
import handleApiRequest from "../libs/apiHandler";

function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);

  const fetchtestimonial = async () => {
    try {
      const targetPath = `testimonial/get-all`;
      const result = await handleApiRequest("GET", targetPath, null, true);
      setTestimonials(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchtestimonial();
  }, []);
  return (
    <div>
      <h1 className="text-center lg:text-3xl text-2xl text-orange-600 font-semibold lg:py-8 py-2 px-2">
        Why to Buy Hemp Products
      </h1>
      <div className="bg-white container mx-auto flex flex-col gap-4">
        {testimonials &&
          testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="w-[100%] flex items-center justify-center py-6 "
            >
              <div
                className={`flex lg:gap-10 gap-4 ${
                  i % 2 === 0
                    ? "lg:flex-row flex-col"
                    : "lg:flex-row-reverse flex-col"
                }`}
              >
                <div className="lg:w-[40%] w-[100%] h-[20rem]  px-2 relative">
                  <div className="card bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 shadow-lg shadow-orange-500/50  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                  <div className="card bg-gradient-to-r from-green-500 via-green-600 to-green-700 shadow-lg shadow-green-500/50  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/testimonial/${testimonial.image}`}
                    alt={testimonial.name}
                    className="object-cover h-full rounded-3xl w-full absolute z-[1]"
                  />
                </div>
                <div className="flex flex-col tracking-wider lg:w-[60%] w-[100%] px-2">
                  <label className="text-gray-600 font-bold text-xl lg:mt-0 mt-4">
                    {testimonial.name}
                  </label>
                  <p className="text-lg text-gray-600 leading-relaxed text-justify mt-2">
                    {testimonial.description}
                  </p>
                  <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 w-[8rem] mt-4">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-[8rem]">
                      <a href="#shownow"> Show Now</a>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Testimonial;
