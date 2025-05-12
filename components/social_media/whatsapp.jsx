import React from "react";

const WhatsAppLink = ({ number }) => {
  const defaultMessage = "Hello! I am contacting you from the website.";
  const whatsappLink = `https://wa.me/${number}?text=${encodeURIComponent(
    defaultMessage
  )}`;
  return (
    <div>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <button title="whatsapp">
          <i className={`fab fa-whatsapp text-green-600`}></i>
        </button>
      </a>
    </div>
  );
};

export default WhatsAppLink;
