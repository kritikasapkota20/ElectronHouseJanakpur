import React, { useEffect, useState } from "react";
import htmr from "htmr";
import RatingReview from "../rating_review/rating_review";
import ReviewForm from "../forms/review_form/review_form";
import { Faq, Product_card } from "..";
import { TiktokEmbed } from "@imdbsd/tiktok-embed";
const RatingBar = ({ label, percentage }) => {
  const barStyle = {
    backgroundColor: "darkorange",
    height: "1rem",
    width: `${percentage}%`,
  };

  return (
    <div className="flex items-center space-x-1">
      <span className="flex-shrink-0 w-12 text-sm">{label} star</span>
      <div className="flex-1 h-4 overflow-hidden rounded-sm dark:bg-gray-700">
        <div style={barStyle}></div>
      </div>
      <span className="flex-shrink-0 w-12 text-sm text-right">
        {percentage} %
      </span>
    </div>
  );
};
const ProductDesc = ({ product, vendorProducts }) => {
  const [currentTab, setCurrentTab] = useState(1);
  const [reviewForm, setReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [ratingPercentage, setRatingPercentage] = useState(null);
  const [reviewState, setReviewState] = useState(false);

  const updateReviews = () => {
    setReviewState(!reviewState);
  };

  const changeTab = (index) => {
    setCurrentTab(index);
  };

  const openReviewForm = () => {
    setReviewForm(true);
  };

  const closeReviewForm = () => {
    setReviewForm(false);
  };

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/product_review/get/${product._id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reviewState, product]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/product_review/get_review_percentage/${product._id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setRatingPercentage(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reviewState, product]);

  return (
    <>
      <div className="container mx-auto">
        <ul className="flex flex-row flex-wrap lg:text-base text-xs font-semibold gap-4">
          <li>
            <button
              onClick={() => changeTab(2)}
              className={
                currentTab == 2
                  ? "capitalize border-2 border-orange-600 text-orange-600 px-4 rounded-full py-2"
                  : "capitalize bg-green-800 text-gray-200 px-4 rounded-full py-2 border-2 border-slate-400"
              }
            >
              Reviews
            </button>
          </li>
          <li>
            <button
              onClick={() => changeTab(1)}
              className={
                currentTab == 1
                  ? "capitalize border-2 border-orange-600 text-orange-600 px-4 rounded-full py-2"
                  : "capitalize bg-green-800 text-gray-200 px-4 rounded-full py-2 border-2 border-slate-400"
              }
            >
              More Products from Same Category
            </button>
          </li>
        </ul>
      </div>
      <div className="container mx-auto"> 
        <div
          className={
            currentTab == 1
              ? "block py-4 text-gray-600 lg:text-base text-sm tracking-wider text-justify lg:mt-2"
              : "hidden"
          }
        >
          <div className="grid lg:grid-cols-5 grid-cols-2 lg:gap-4 gap-2">
            {vendorProducts &&
              vendorProducts.map((item, index) => (
                <Product_card
                  key={index}
                  title={item.title}
                  slug={item.slug}
                  price={item.sellingPrice}
                  _id={item._id}
                  image={item.featureImage}
                  description={item.description}
                  markPrice={item.markPrice}
                  discount={item.discount}
                  adminId={item.adminId}
                  innerCatslug={item?.innerCatId?.slug}
                  product={item}
                />
              ))}
          </div>
        </div>

        <div className={currentTab == 2 ? "block py-4 lg:px-3 px-0" : "hidden"}>
          <div>
            {reviews && reviews.length > 0 ? (
              <div className="lg:h-[100%] h-[100%] shadow overflow-y-scroll p-2 overflow-box">
                <div className="flex flex-col max-w-xl p-8 shadow rounded-xl lg:p-12 dark:bg-gray-100 dark:text-gray-600">
                  <div className="flex flex-col w-full">
                    <h2 className="text-3xl font-semibold text-center">
                      Customer reviews
                    </h2>
                    <div className="flex flex-wrap items-center mt-2 mb-1 space-x-2">
                      <div className="flex">
                        <button
                          type="button"
                          title="Rate 1 stars"
                          aria-label="Rate 1 stars"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-6 h-6 dark:text-yellow-500"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        </button>
                        <button
                          type="button"
                          title="Rate 2 stars"
                          aria-label="Rate 2 stars"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-6 h-6 dark:text-yellow-500"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        </button>
                        <button
                          type="button"
                          title="Rate 3 stars"
                          aria-label="Rate 3 stars"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-6 h-6 dark:text-yellow-500"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        </button>
                        <button
                          type="button"
                          title="Rate 4 stars"
                          aria-label="Rate 4 stars"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-6 h-6 dark:text-gray-600"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        </button>
                        <button
                          type="button"
                          title="Rate 5 stars"
                          aria-label="Rate 5 stars"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-6 h-6 dark:text-gray-600"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        </button>
                      </div>
                      <span className="dark:text-gray-400">3 out of 5</span>
                    </div>
                    <p className="text-sm dark:text-gray-400">
                      861 customer ratings
                    </p>
                    <div className="flex flex-col mt-4">
                      <RatingBar
                        label="5"
                        percentage={Math.ceil(ratingPercentage?.rating5)}
                      />
                      <RatingBar
                        label="4"
                        percentage={Math.ceil(ratingPercentage?.rating4)}
                      />
                      <RatingBar
                        label="3"
                        percentage={Math.ceil(ratingPercentage?.rating3)}
                      />
                      <RatingBar
                        label="2"
                        percentage={Math.ceil(ratingPercentage?.rating2)}
                      />
                      <RatingBar
                        label="1"
                        percentage={Math.ceil(ratingPercentage?.rating1)}
                      />
                    </div>
                  </div>
                </div>
                {reviews.map((item, i) => (
                  <div key={i}>
                    <div className="flex lg:flex-row flex-col gap-3">
                      <div>
                        <i className="fal fa-user-circle text-3xl"></i>
                      </div>
                      <div className="">
                        <div className="flex flex-row justify-between">
                          <div>
                            <p className="font-semibold text-gray-600">
                              {item.userId?.firstName +
                                " " +
                                item.userId?.lastName}
                            </p>
                            <p className="text-sm text-gray font-normal text-gray-600">
                              {item.updatedAt.substring(0, 10)}
                            </p>
                          </div>
                          <RatingReview
                            ratings={item.rating}
                            review_count={5}
                          />
                        </div>
                        <p className="text-sm text-gray-600">
                          {reviews && htmr(item.reviewDescription)}
                        </p>
                        <div className="flex flex-row justify-start w-[50%] gap-4 py-3">
                          {item.images.map((image, i) => (
                            <img
                              key={i}
                              src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/review/${image.fileName}`}
                              alt={image.fileName}
                              className="object-contain w-[15rem] h-[10rem] rounded"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <hr className="my-2" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="lg:text-sm text-xs tracking-wider text-gray-600">
                No reviews available for this product yet. Be the first to share
                your thoughts and experiences with us. Your feedback is valuable
                in helping others make informed decisions about this product.
              </p>
            )}
          </div>
          <div className="flex flex-row justify-end py-2">
            <button
              onClick={openReviewForm}
              className="bg-orange-500 px-2 py-1 rounded-full text-sm text-white mt-2 mr-3"
            >
              Write Review
            </button>
          </div>
          {reviewForm && (
            <ReviewForm
              closeReviewForm={closeReviewForm}
              productId={product._id}
              updateReviews={updateReviews}
            />
          )}
        </div>
        <div className={currentTab == 3 ? "block py-4 px-3" : "hidden"}>
          <div>
            <p>specification</p>
          </div>
        </div>
        <div className={currentTab == 4 ? "block py-4 lg:px-3 px-0" : "hidden"}>
          <div className="grid lg:grid-cols-5 grid-cols-2 lg:gap-4 gap-2">
            {vendorProducts &&
              vendorProducts.map((item, index) => (
                <Product_card
                  key={index}
                  title={item.title}
                  slug={item.slug}
                  price={item.sellingPrice}
                  _id={item._id}
                  image={item.featureImage}
                  description={item.description}
                  markPrice={item.markPrice}
                  discount={item.discount}
                  adminId={item.adminId}
                  innerCatslug={item?.innerCatId?.slug}
                  product={item}
                />
              ))}
          </div>
        </div>
        {/* <div className={currentTab == 5 ? "block py-4 px-3" : "hidden"}>
          <Faq />
        </div> */}
      </div>
    </>
  );
};

export default ProductDesc;
