import { useState, useEffect } from "react";

const Banner2 = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 24,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let interval = null;

    if (
      countdown.days > 0 ||
      countdown.hours > 0 ||
      countdown.minutes > 0 ||
      countdown.seconds > 0
    ) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          const { days, hours, minutes, seconds } = prevCountdown;

          if (seconds > 0) {
            return { days, hours, minutes, seconds: seconds - 1 };
          } else if (minutes > 0) {
            return { days, hours, minutes: minutes - 1, seconds: 59 };
          } else if (hours > 0) {
            return { days, hours: hours - 1, minutes: 59, seconds: 59 };
          } else if (days > 0) {
            return { days: days - 1, hours: 23, minutes: 59, seconds: 59 };
          } else {
            return { days, hours, minutes, seconds };
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
      // Countdown finished message
      alert("Deal Ends!");
    }

    return () => clearInterval(interval);
  }, [countdown]);

  const startCountdown = () => {
    // Set your desired countdown time in seconds (e.g., 3600 for 1 hour)
    const totalSeconds = 2 * 24 * 60 * 60;
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    setCountdown({ days, hours, minutes, seconds });
  };
  return (
    <div>
      <div className="flex flex-col justify-center">
        <div className="flex justify-between items-center gap-4 mx-auto lg:w-[85%] w-[95%]">
          <p className="block lg:text-4xl text-xl font-semibold leading-relaxed  text-gray-600 text-center py-4">
            Meals of the Day
          </p>
          <div className="mt-2">
            <h1 className="text-sm font-semibold text-rose-600 capitalize">
              Deals end in
            </h1>
            <div className="text-lg font-semibold">
              {countdown.days}d {countdown.hours}h {countdown.minutes}m{" "}
              {countdown.seconds}s
            </div>
          </div>
        </div>
        <div className="relative m-3 grid lg:grid-cols-2 grid-cols-1 container mx-auto justify-center gap-4 w-[100%]">
          <div
            data-aos="zoom-in"
            className=" bg-gray-600 flex flex-col group shadow w-[100%]  backdrop-filter backdrop-blur-lg bg-opacity-25"
          >
            <div className="h-[20rem] md:h-[20rem] lg:h-[24rem] w-full bg-rose-500 border-2 border-white flex items-center justify-center text-white text-base mb-3 md:mb-5 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D"
                className="object-cover w-full h-full scale-100 group-hover:scale-110 transition-all duration-400"
                alt=""
              />

              <div className="absolute z-10 border-4 border-primary w-[95%] h-[95%] invisible group-hover:visible opacity-0 group-hover:opacity-100 group-hover:scale-90 transition-all duration-500"></div>
            </div>
            <p className=" block text-black text-center hover:text-primary transition-colors duration-150 text-lg md:text-xl mb-1">
              Chicken Burger with french fries
            </p>

            <p className="mb-4 font-light  text-sm md:text-sm text-center text-gray-800">
              Lorem ipsum dolor sit amet, consectetur adipisicing.
            </p>

            <div className="flex justify-center gap-x-3 pb-4">
              <button className="group relative inline-block overflow-hidden rounded-full border border-gray-100 bg-gray-200  px-12 py-3 text-sm font-medium text-slate-800 hover:text-rose-600 focus:outline-none focus:ring active:bg-indigo-600 active:text-white">
                Order Now
              </button>
            </div>
          </div>
          <div
            data-aos="zoom-in"
            className="w-[100%] flex flex-col group shadow  backdrop-filter backdrop-blur-lg bg-opacity-25 bg-gray-600"
          >
            <div className="h-[20rem] md:h-[20rem] lg:h-[24rem]  w-full bg-rose-500 border-2 border-white flex items-center justify-center text-white text-base mb-3 md:mb-5 overflow-hidden relative">
              <img
                src="https://plus.unsplash.com/premium_photo-1673769108271-84536883f7e9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fG1vbW9zfGVufDB8fDB8fHww"
                className="object-cover w-full h-full scale-100 group-hover:scale-110 transition-all duration-400"
                alt=""
              />

              <div className="absolute z-10 border-4 border-primary w-[95%] h-[95%] invisible group-hover:visible opacity-0 group-hover:opacity-100 group-hover:scale-90 transition-all duration-500"></div>
            </div>
            <p className=" block text-black text-center hover:text-primary transition-colors duration-150 text-lg md:text-xl mb-1">
              Chicken Momo
            </p>

            <p className="mb-4 font-light  text-sm md:text-sm text-center text-gray-800">
              Lorem ipsum dolor sit amet, consectetur adipisicing.
            </p>

            <div className="flex justify-center gap-x-3 pb-4">
              <button className="group relative inline-block overflow-hidden rounded-full border border-gray-100 bg-gray-200  px-12 py-3 text-sm font-medium text-slate-800 hover:text-rose-600 focus:outline-none focus:ring active:bg-indigo-600 active:text-white">
                {/* <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-rose-600 transition-all duration-200 group-hover:w-full"></span>
                <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-rose-600 transition-all duration-200 group-hover:h-full"></span>
                <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-rose-600 transition-all duration-200 group-hover:w-full"></span>
                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-rose-600 transition-all duration-200 group-hover:h-full"></span> */}
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner2;
