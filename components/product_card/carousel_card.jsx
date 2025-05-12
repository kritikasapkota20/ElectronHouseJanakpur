import Link from "next/link";
import React from "react";

const CarouselCard = ({
  _id,
  title,
  slug,
  price,
  image,
  description,
  markPrice,
  discount,
  adminId,
  loading,
}) => {
  return (
    <div>
      <Link passHref href={`/product/${slug}`}>
        <div className="h-[100%] rounded">
          {image && (
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${image}`}
              alt={title}
              className="w-full h-[30vh] object-contain rounded"
            />
          )}
          <div className="px-2 py-2">
            <Link passHref href={`/product/${slug}`}>
              <p className="text-xs">{title?.substring(0, 50)}..</p>
            </Link>
            <div className="flex flex-row gap-4 py-2">
              <p className="text-red-600 line-through text-xs">
                Rs. {markPrice}
              </p>
              <p className="text-gray-600 text-xs">{discount} %Off</p>
              <p className="text-green-600 text-sm">Rs. {price}</p>
            </div>

            {/* <div className="flex gap-3 py-3">
            <div className="relative heart-icon">
              <i className=" far fa-heart bg-gray-600 backdrop-filter backdrop-blur-lg bg-opacity-25 px-3 py-2 rounded-full text-gray-50 text-sm hover:bg-rose-500 hover:text-gray-5 cursor-pointer"></i>

              <p className="wishlist-msg absolute backdrop-filter backdrop-blur-lg bg-opacity-25 -bottom-6 -left-2 bg-gray-800 w-[7rem] rounded-full text-gray-50 px-2 text-sm text-center">
                add
              </p>
            </div>
            <div className="relative compare-icon">
              <i className="fas fa-not-equal bg-gray-600 px-3 py-2 hover:bg-rose-500 hover:text-gray-5 cursor-pointer  rounded-full text-gray-50 text-sm backdrop-filter backdrop-blur-lg bg-opacity-25"></i>
              <p className="compare-msg absolute backdrop-filter backdrop-blur-lg bg-opacity-25 -bottom-6 right-0 lg:right-1 bg-gray-800 w-[10rem] rounded-full text-gray-50 text-sm text-center">
                compare this product
              </p>
            </div>
            <div className="">
              <button className="bg-gray-600 px-3 hover:bg-gray-800 duration-200 transition-all text-gray-50 py-1 rounded-full text-xs">
                Ask Question
              </button>
            </div>
          </div> */}
            <div className="flex gap-2 px justify-between">
              <button className="bg-rose-600 hover:bg-rose-700 duration-200 transition-all text-xs w-[50%] py-1 px-2 rounded-full text-gray-50 capitalize">
                add to cart
              </button>
              <button className="bg-green-600 px-2 hover:bg-green-800 duration-200 transition-all text-gray-50 py-1 rounded-full text-xs">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CarouselCard;
