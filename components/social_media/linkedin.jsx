import React from "react";

const Linkedin = ({ link }) => {
  return (
    <a target="_blank" href={link}>
      <button title="linkedin">
        <i className="fab fa-linkedin text-blue-800"></i>
      </button>
    </a>
  );
};

export default Linkedin;
