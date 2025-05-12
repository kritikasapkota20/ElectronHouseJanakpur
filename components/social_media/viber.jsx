import React from "react";

const ViberLink = ({number}) => {
  const defaultMessage = "Hello! I am contacting you from the website.";
  const viberLink = `viber://forward?text=${encodeURIComponent(
    defaultMessage
  )}&phone=${number}`;

  return (
    <div>
      <a href={viberLink} target="_blank" rel="noopener noreferrer">
        <button title="viber">
          <i className="fab fa-viber text-violet-800"></i>
        </button>
      </a>
    </div>
  );
};

export default ViberLink;
