import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Product_card } from "..";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateWishlistState } from "../../redux/wishlist/wishlistActions";
import Spinner from "../loaders/spinner";
import ProductLoaderOne from "../loaders/productLoader";

const MyWishlist = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.wishlistState.stateData);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("user-token")
        ? Cookies.get("user-token")
        : null;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/wishlist/get`,
          {
            headers: {
              "user-token": token,
            },
          }
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [state]);
  return (
    <>
      <div className="container mx-auto">
      <p className='capitalize font-semibold font-serif text-gray-600 text-xl p-4'>My Wishlist</p>
        {loading == true ? (
          <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-4 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
              <ProductLoaderOne key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-4 gap-2">
              {product &&
                product.map((item, index) => (
                  <Product_card
                    key={index}
                    title={item.title}
                    price={item.sellingPrice}
                    _id={item._id}
                    images={item.images}
                    description={item.description}
                    markPrice={item.markPrice}
                    discount={item.discount}
                    slug={item.slug}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyWishlist;
