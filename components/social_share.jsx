import React, { useEffect, useState } from "react";
const SocialShare = ({ product }) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <div className="article-footer flex justify-between lg:flex-row flex-row rounded shadow p-4">
        <div className="flex items-center">
          <p className="lg:text-base text-xs font-semibold text-gray-600 ">
            Share product
          </p>
          <i class="fas fa-share ml-2 lg:text-lg text-xs font-semibold text-orange-600"></i>
        </div>
        {product && (
          <div className="flex gap-4 lg:text-2xl text-xl items-center">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                product.title
              )}%0A${encodeURIComponent(
                process.env.NEXT_PUBLIC_CLIENT_URL + "/product/" + product.slug
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              title="whatsapp"
            >
              <i className="fab fa-whatsapp text-green-600"></i>
            </a>
            <a
              href={`viber://forward?text=${
                process.env.NEXT_PUBLIC_CLIENT_URL + "/product/" + product.title
              }%0A${
                process.env.NEXT_PUBLIC_CLIENT_URL + "/product/" + product.slug
              }`}
              target="_blank"
              rel="noopener noreferrer"
              title="viber"
            >
              <i className="fab fa-viber text-violet-800"></i>
            </a>
            <a
              href={`https://www.facebook.com/sharer.php?u=${
                process.env.NEXT_PUBLIC_CLIENT_URL + "/product/" + product.slug
              }`}
              title="facebook"
            >
              <i className="fab fa-facebook-square text-blue-500"></i>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                process.env.NEXT_PUBLIC_CLIENT_URL + "/product/" + product.slug
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              title="linkedin"
            >
              <i className="fab fa-linkedin text-blue-800"></i>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                product.title
              )}&url=${encodeURIComponent(
                process.env.NEXT_PUBLIC_CLIENT_URL + "/product/" + product.slug
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              title="twitter"
            >
              <i className="fab fa-twitter-square text-blue-600"></i>
            </a>

            <a
              href={`fb-messenger://share/?link=${encodeURIComponent(
                process.env.NEXT_PUBLIC_CLIENT_URL + "/product/" + product.slug
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="messenger"
            >
              <i className="fab fa-messenger text-blue-500"></i>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialShare;
