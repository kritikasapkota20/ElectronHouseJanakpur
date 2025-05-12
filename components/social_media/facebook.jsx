import React from "react";

const Facebook = ({ link }) => {
  return (
    <a target="_blank" href={link}>
      <button title="facebook">
        <i className="fab fa-facebook-square text-blue-500"></i>
      </button>
    </a>
  );
};

export default Facebook;
