import { Root_layout } from "../components";
import "../styles/globals.css";
import AOS from "aos";
import "../styles/font.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import "swiper/css";
import "aos/dist/aos.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cards";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
    
      <Provider store={store}>
        <Root_layout>
          <Component {...pageProps} />
        </Root_layout>
      </Provider>
    </>
  );
}

export default MyApp;
