import React from "react";

const RatingReview = ({ ratings, review_count }) => {
  const starLimit = 5;

  const fullStarCount = () => {
    return ratings ? Math.floor(ratings) : 0;
  };

  const halfStarCount = () => {
    return ratings % 1 === 0 ? 0 : 1;
  };

  const emptyStarCount = () => {
    return starLimit - Math.ceil(ratings);
  };

  const renderStar = (type, index) => (
    <i
      className={`fa${type} fa-star text-xs mr-1 ${
        ratings ? "text-[#F18E0C]" : "text-[#5d5d5d]"
      }`}
      key={index}
    ></i>
  );

  return (
    <div className="flex flex-row">
      {ratings !== undefined && (
        <div className="ratings-star">
          {[...Array(fullStarCount())].map((_, index) => renderStar("", index))}
          {[...Array(halfStarCount())].map((_, index) =>
            renderStar("-half-alt", 5 + index)
          )}
          {[...Array(emptyStarCount())].map((_, index) =>
            renderStar("-empty", 10 + index)
          )}
        </div>
      )}
      {review_count !== undefined && (
        <div className="ml-3 text-sm item-center mt-1 text-gray-600 dark:text-gray-400 font-medium">
          {ratings !== undefined && `${ratings} ratings`} -{" "}
          {parseInt(review_count) < 2
            ? review_count + " review"
            : review_count + " reviews"}
        </div>
      )}
      {review_count === 0 && ratings == undefined && (
        <div className="ml-3 text-sm item-center mt-1 text-gray-600 font-medium">
          {[...Array(starLimit)].map((_, index) => renderStar("", index))}
        </div>
      )}
    </div>
  );
};

export default RatingReview;
