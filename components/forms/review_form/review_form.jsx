import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Spinner } from "@/components";

const ReviewForm = ({ closeReviewForm, productId, updateReview }) => {
  const [rating, setrating] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  const onDrop = (acceptedFiles) => {
    setImages([...images, ...acceptedFiles]);
  };

  const removeImage = (imageIndex) => {
    const newImages = images.filter((img, index) => index !== imageIndex);
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("rating", rating.toString());
    formData.append("productId", productId);
    formData.append("description", description);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    // const token = Cookies.get('user-token') ? Cookies.get('user-token') : null
    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/product_review/add`, {
      method: "POST",
      headers: {
        "user-token": Cookies.get("user-token"),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            title: data.message,
          });
          setLoading(false);
          closeReviewForm();
          updateReview();
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: data.error,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="fixed container mx-auto lg:top-8 top-0 lg:left-32 left-0 lg:w-[80%] w-[100%] bg-gray-50 shadow rounded z-[999] backdrop-filter backdrop-blur-lg bg-opacity-25 h-[100%]">
      <div className="overflow-scroll h-[100%] overflow-box">
        {loading && <Spinner />}
        <div className="p-4">
          <button
            onClick={closeReviewForm}
            className="bg-red-600 px-2 rounded text-white font-semibold float-right mb-3"
          >
            X
          </button>
          <div className="mt-3">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="write your review here"
            ></textarea>
          </div>
          <div>
            <p className="font-medium text-base py-3">YOUR RATING</p>
            <section className="divide-x space-x-3 divide-gray-600 text-yellow-400 cursor-pointer">
              <span
                onClick={() => {
                  setrating(1);
                }}
                className="pl-2"
              >
                {rating == 1 ? (
                  <i className="fa fa-star"></i>
                ) : (
                  <i className="far fa-star"></i>
                )}
              </span>
              <span
                onClick={() => {
                  setrating(2);
                }}
                className="pl-2"
              >
                {rating == 2 ? (
                  <>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </>
                ) : (
                  <>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                  </>
                )}
              </span>
              <span
                onClick={() => {
                  setrating(3);
                }}
                className="pl-2"
              >
                {rating == 3 ? (
                  <>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </>
                ) : (
                  <>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                  </>
                )}
              </span>
              <span
                onClick={() => {
                  setrating(4);
                }}
                className="pl-2"
              >
                {rating == 4 ? (
                  <>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </>
                ) : (
                  <>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                  </>
                )}
              </span>
              <span
                onClick={() => {
                  setrating(5);
                }}
                className="pl-2"
              >
                {rating == 5 ? (
                  <>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </>
                ) : (
                  <>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                  </>
                )}
              </span>
            </section>
          </div>
          <div className="mt-6 lg:w-[30%] w-[100%]">
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="bg-gray-50 shadow text-gray-600 rounded p-4 cursor-pointer"
                >
                  <input {...getInputProps()} />
                  Click here to select images
                </div>
              )}
            </Dropzone>
          </div>
          <div className="grid lg:grid-cols-5 grid-cols-3 gap-4 py-2">
            {images.map((image, index) => (
              <div className="h-[100%] mb-4" key={index}>
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="lg:w-[10rem] w-[15rem] lg:h-[10rem] h-[8rem] rounded"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="bg-red-600 text-white px-2 rounded mt-2 hover:bg-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-row justify-end py-8 mb-4">
            <button
              onClick={handleSubmit}
              className="bg-red-600 text-sm px-2 py-1 rounded text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
