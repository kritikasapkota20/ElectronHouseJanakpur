import React, { useState, useEffect, useRef } from "react";
import { TimeAgo } from "@/components";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
// import { io } from "socket.io-client";
import io from "socket.io-client";
import { useRouter } from "next/router";
const Add = ({
  user,
  vendor,
  product,
  closeAnswerForm,
  price,
  discount,
  image,
  title,
  slug,
}) => {
  const [content, setContent] = useState("");
  const [questions, setQuestions] = useState([]);
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [userPrice, setUserPrice] = useState(0);
  const [bargainHeight, setBargainHeight] = useState("0px");
  const bargainBox = useRef(null);
  const [difference, setDifference] = useState("");
  const [socket, setSocket] = useState(null);
  const [answers , setAnswers] = useState("");

  const userDetail = Cookies.get("user-detail")
    ? JSON.parse(Cookies.get("user-detail"))
    : null;
  const router = useRouter();
  const toggleBargain = () => {
    setActive((prevActive) => !prevActive);
    setBargainHeight((prevHeight) =>
      prevHeight === "0px" ? `${bargainBox.current.scrollHeight}px` : "0px"
    );
  };

  useEffect(() => { 
    setSocket(io("http://localhost:3001"));
  }, []);

  // useEffect(() => {
  //   socket?.emit("newUser", user);
  // }, [socket]);

  useEffect(() => {
    if (socket) {
      // socket.on("receiveGreet", (message) => {
      //   console.log("Received server message:", message);
      // });
      // socket.on("serverMessage", (message) => {
      //   console.log("Received server message:", message);
      // });

      socket.on("adminMessage", (message) => {
        setAnswers((prevAnswer) => [...prevAnswer, message.content]);
      });
    }
  }, [socket]);

  useEffect(() => {
    fetchQuestions();
  }, [state]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("user-token")
        ? Cookies.get("user-token")
        : null;
      if (!token) {
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
          title: "you must be logged in first",
        });
        setLoading(false);
        return router.push("/login");
      }
      const data = {
        user,
        vendor,
        product,
      };
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/question/get`,
        { params: data },
        {
          headers: {
            "user-token": token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        setQuestions(response.data);
        setLoading(false);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleSubmit = async (e) => {
       e.preventDefault();
    console.log("click to subbmit");
    const questionData = { user, vendor, product, content };
    socket.emit("NewQuestion", questionData);
 
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/question/ask`,
        { user, vendor, product, content },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        console.log("sucess");
        setContent("");
        // socket.emit("NewQuestion", content);
        setState(!state);
      } else {
        console.error("Failed to send question");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleDelete = async (questionId) => {
    try {
      setLoading(true);
      const token = Cookies.get("user-token")
        ? Cookies.get("user-token")
        : null;
      if (!token) {
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
          title: "you must be logged in first",
        });
        setLoading(false);
        return router.push("/login");
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/question/delete/${questionId}`,
        {},
        {
          headers: {
            "user-token": token,
          },
        }
      );
      if (response.data.message) {
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
          title: response.data.message,
        });

        fetchQuestions();
        setLoading(false);
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
          icon: "success",
          title: "failed to delete this question.",
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleBargain = (e) => {
    e.preventDefault();
    if (difference <= 400) {
      handleSubmit(e);
      setContent("");
    }
  };

  const handleSetThisPrice = (minimumPrice) => {
    setUserPrice(minimumPrice);
    setContent(`i want this item for Rs. ${minimumPrice}`);
    setDifference(Math.abs(price - minimumPrice));
  };

  return (
    <div className="relative">
      {/* <div className="lg:absolute fixed lg:left-8 left-0 lg:top-20 top-2 z-[999] lg:w-full w-[95%] mx-auto inset-0 rounded"> */}
      <div className="bg-gray-600 lg:w-[30rem] w-[100%] px-4 py-2 shadow backdrop-filter backdrop-blur-md bg-opacity-70 rounded lg:h-[88vh] h-[95vh] overflow-y-scroll overflow-box">
        <div className="flex justify-between items-center">
          <p className="text-gray-100 font-normal capitalize tracking-wider">
            Got any queries about this product ? Feel free to inquire.
          </p>

          <button
            onClick={closeAnswerForm}
            className="text-xl text-rose-600 font-bold text-center float-right"
          >
            <i className="far fa-times"></i>
          </button>
        </div>
        <div className="flex gap-4 items-center">
          <p
            onClick={toggleBargain}
            className=" text-gray-100 font-normal capitalize tracking-wider underline underline-offset-2"
          >
            Chat with Vendor?
          </p>
          <span
            onClick={toggleBargain}
            className="ml-0 text-center cursor-pointer border-2 px-2 rounded-full border-gray-100 hover:bg-rose-600 hover:text-gray-100 transition-all duration-200 hover:border-red-600 text-sm text-gray-100"
          >
            {active ? "Close" : "Click Here"}
            <i
              className={`fas fa-arrow-from-top ml-1 ${
                active ? "rotate-90" : ""
              }`}
            ></i>
          </span>
        </div>
        <div
          ref={bargainBox}
          style={{
            maxHeight: `${bargainHeight}`,
            transition: "max-height 0.3s ease",
          }}
          className="overflow-hidden"
        >
          <label
            htmlFor="bargain"
            className="tracking-wider inline-block mb-3 text-sm capitalize text-gray-100 mt-2"
          >
            Please enter the desired price for the product below. The product
            vendor will review your offer and respond accordingly.
          </label>
          <div className="flex gap-2 py-2">
            {image && (
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/product/${image}`}
                alt={image}
                className="object-cover w-[5rem] rounded"
                onClick={() => openProductPage(slug)}
              />
            )}
            <div>
              <p className="text-xs text-gray-50 tracking-wider capitalize">
                {title}
              </p>
              <p className="text-gray-50 tracking-wider">
                <span className="pr-3 text-red-600 font-semibold text-sm">
                  10% off
                </span>
                {"Rs." + " " + price}
              </p>
            </div>
          </div>

          <form className="pb-4" onSubmit={handleBargain}>
            <input
              type="number"
              id="bargain"
              value={userPrice}
              onChange={(e) => {
                setUserPrice(e.target.value);
                setContent(`i want this item for Rs. ${e.target.value}`);
                setDifference(Math.abs(price - e.target.value));
              }}
              placeholder="Enter your price here..."
              className="p-2 text-sm w-full shadow rounded-full focus:outline-none focus:shadow-lg"
            />
            {difference > 400 && (
              <div className="flex gap-2 py-2 items-center">
                <p className="text-red-600 text-sm tracking-wider capitalize">
                  {`the minimum price range for this product is Rs.${
                    price - 400
                  }`}{" "}
                  /-
                </p>
                <button
                  onClick={() => handleSetThisPrice(price - 400)}
                  className="text-white bg-green-600 text-xs h-6 px-2 rounded-full lg:w-[25%] w-[50%]"
                >
                  set this price
                </button>
              </div>
            )}
            {userPrice > price && (
              <p className="text-red-500 text-sm py-2">{`Your offer should be at smaller than or equals to the price of the product.`}</p>
            )}
            <button
              type="submit"
              className="bg-rose-500 hover:bg-rose-600 px-4 py-1 tracking-wider text-xs text-white capitalize rounded-full mt-4"
            >
              Offer price
            </button>
          </form>
        </div>
        <hr className="mt-2" />
        <div className="relative pb-16">
          {questions.length == 0 ? (
            <p className="text-gray-100 py-4 text-sm tracking-wider font-medium">
              Hello! Currently, there is no chat history available. Please feel
              free to drop any queries about the product, and we&#39;ll respond
              accordingly. We&#39;re here to assist you!
            </p>
          ) : (
            <div className="pt-4 h-[72vh] overflow-y-scroll overflow-box">
              <div>
                {questions.map((question) => (
                  <div key={question._id}>
                    <div className="flex flex-col flex-grow h-full p-0 overflow-auto">
                      <div className="flex w-full space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                          <div className="bg-rose-500 text-white p-3 rounded-l-lg rounded-br-lg">
                            <p className="text-sm">{question.content}</p>
                          </div>
                          <span className="text-xs text-gray-100 leading-none flex gap-2 justify-between">
                            <TimeAgo createdAt={question.createdAt} />{" "}
                            <p className="text-xs">
                              {question.replies.length === 0
                                ? "not seen yet"
                                : "replied"}
                            </p>
                            {!question.replies.length > 0 && (
                              <p
                                onClick={() => handleDelete(question._id)}
                                className="text-xs underline cursor-pointer"
                              >
                                delete
                              </p>
                            )}
                          </span>
                        </div>
                        <div className="flex-shrink-0 mr-2">
                          <img
                            src={userDetail.picture}
                            alt={
                              userDetail.firstName + " " + userDetail.lastName
                            }
                            className={`w-8 h-8 rounded-full cursor-pointer`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 my-2">
                      <div className="flex flex-col gap-2">
                        {question?.replies?.map((item, i) => (
                          <div key={i}>
                            <div className="flex flex-col flex-grow h-full p-0 overflow-auto">
                              <div className="flex w-full space-x-3 max-w-xs">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                                <div>
                                  <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                    <p className="text-sm">{item.content}</p>
                                  </div>
                                  <span className="text-xs text-gray-100 leading-none">
                                    <TimeAgo createdAt={item.createdAt} />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <h1>{answers}</h1>
              </div>
            </div>
          )}
          {loading && <div className="spinner"></div>}
          <div className="absolute bottom-0 w-full z-[999] left-0">
            <form onSubmit={handleSubmit}>
              <label for="chat" className="sr-only">
                Your message
              </label>
              <div className="flex items-center py-2 px-3 bg-gray-200 rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-100">
                <textarea
                  id="chat"
                  rows="1"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="write message."
                ></textarea>
                <button
                  type="submit"
                  className="inline-flex justify-center p-2 text-red-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 border-2 border-gray-600"
                >
                  <svg
                    className="w-6 h-6 rotate-90"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Add;
