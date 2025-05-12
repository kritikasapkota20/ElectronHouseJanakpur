import React, { useState, useEffect } from "react";

const TimeAgo = ({ createdAt }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentTime = new Date();
      const previousTime = new Date(createdAt);
      const timeDifference = currentTime - previousTime;
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days >= 2) {
        setTimeAgo(createdAt.toLocaleString().slice(0, 10)); // Display the full timestamp
      } else if (hours >= 1) {
        setTimeAgo(`${hours} hour${hours === 1 ? "" : "s"} ago`);
      } else if (minutes >= 1) {
        setTimeAgo(`${minutes} minute${minutes === 1 ? "" : "s"} ago`);
      } else {
        setTimeAgo(`${seconds} second${seconds === 1 ? "" : "s"} ago`);
      }
    };

    calculateTimeAgo();

  }, [createdAt]);

  return <p className="text-xs">{timeAgo}</p>;
};

export default TimeAgo;
