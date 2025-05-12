import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import handleApiRequest from "../libs/apiHandler";
import { useRouter } from "next/router";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  const fetchBlogs = async () => {
    try {
      const targetPath = `blog/get`;
      const result = await handleApiRequest("GET", targetPath, null, true);
      setBlogs(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  function removeHtmlTags(htmlString) {
    return htmlString?.replace(/<[^>]*>/g, "");
  }

  const truncatedDescription = (description, maxWords) => {
    const words = description.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return description;
  };

  return (
    <div>
      <h1 className="text-center lg:text-5xl text-2xl text-gray-600 font-semibold pt-5 pb-5">
        {" "}
        Our Latest Blogs{" "}
      </h1>
      <div className="my-3 mx-4 bg-white">
        <div className="lg:px-0 px-1">
          <Swiper
            slidesPerView={3}
            spaceBetween={2}
            centeredSlides={false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              // when window width is >= 480px
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // when window width is >= 640px
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            className="mySwiper"
          >
            {blogs &&
              blogs.map((item, index) => (
                <div key={index}>
                  <SwiperSlide>
                    <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                      <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                        <img
                          src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/blogs/${item?.image}`}
                          alt={item.title}
                          className="object-cover h-80 rounded w-full transition-transform transform-gpu hover:scale-105 hover:rotate-2"
                        />
                        <div className="p-6">
                          <div className="mb-3 flex items-center justify-between">
                            <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-gray-500 antialiased">
                              {item.title}
                            </h5>
                          </div>
                          <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
                            {truncatedDescription(
                              removeHtmlTags(item?.description),
                              20
                            )}
                          </p>
                        </div>
                        <div class="p-6 pt-0">
                          <button
                            class="select-none rounded-lg bg-gray-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white hover:text-blue-500 shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            data-ripple-light="true"
                            onClick={() => {
                              router.push({
                                pathname: `/blog/${item.slug}`,
                                query: { id: item._id },
                              });
                            }}
                          >
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
