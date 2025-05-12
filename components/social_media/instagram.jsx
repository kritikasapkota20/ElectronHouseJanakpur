import React from "react";

const Instagram = ({ link }) => {
  return (
    <a target="_blank" href={link}>
      <button title="instagram">
        <i className="fab fa-instagram text-rose-600"></i>
      </button>
    </a>
  );
};

export default Instagram;
