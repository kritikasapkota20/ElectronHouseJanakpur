import handleApiRequest from "@/libs/apiHandler";
import React, { useState, useEffect } from "react";
import htmr from "htmr";
import Link from "next/link";

const BlogBanner = ({ button, page }) => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const targetPath = `blog/banner/get/${page}`;
      const result = await handleApiRequest("GET", targetPath, null, true);
      setBlogs(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, [page]);

  return (
    <div className="container mx-auto lg:mt-12 mt-0">
      <div className="flex flex-col gap-4 lg:mx-0 mx-4">
        {blogs.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col lg:flex-row gap-[4rem] ${
              i % 2 === 0
                ? "lg:flex-row flex-col"
                : "lg:flex-row-reverse flex-col"
            }`}
          >
            <div className="w-full md:w-[60%] flex flex-col gap-2 py-4">
              <h2 className="lg:text-3xl text-xl font-bold text-orange-600">
                {item.title}
              </h2>
              <p className="text-justify">{htmr(item.description)}</p>
              {button && (
                <Link passHref href={`/product_category/${item.page}`}>
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 me-2 mb-2 lg:w-[25%] w-[100%]"
                  >
                    Shop Now
                  </button>
                </Link>
              )}
            </div>
            <div className="w-full md:w-[40%] relative h-[20rem]">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/blogs/${item?.image}`}
                alt={item.title}
                className="object-cover h-[20rem] w-full rounded-lg transition-transform transform-gpu hover:scale-105 hover:rotate-2 absolute top-0 z-[2]"
              />
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/blogs/${item?.image}`}
                alt={item.title}
                className="object-cover h-[22rem] w-full top-0 absolute z-[1] left-0 blur-xl"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogBanner;
