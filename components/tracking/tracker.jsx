import React from "react";

const OrderTrackingComponent = ({ status, createdAt, updatedAt }) => {
  const getStatusClass = (statusValue) => {
    if (status === statusValue) {
      return "complete";
    }
    return null;
  };

  const calculateEstimatedDate = (baseDate, days) => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + days);
    return date.toDateString();
  };

  return (
    <div className="flex items-center lg:overflow-x-hidden overflow-x-auto cursor-progress">
      <ul className="timeline" id="timeline">
        <li className={`li ${getStatusClass("pending")}`}>
          <div className="timestamp lg:block hidden text-sm tracking-wider">
            <span className="date lg:block hidden">
              {calculateEstimatedDate(updatedAt, 0)}
            </span>
          </div>
          <div className="status flex flex-col justify-center">
            <p className="lg:hidden block">
              {calculateEstimatedDate(updatedAt, 0)}
            </p>
            <h4>Order Pending</h4>
          </div>
        </li>
        <li className={`li ${getStatusClass("confirmed")}`}>
          <div className="timestamp text-sm tracking-wider">
            <span className="date">{calculateEstimatedDate(updatedAt, 0)}</span>
          </div>
          <div className="status flex flex-col justify-center">
            <p className="lg:hidden block">
              {calculateEstimatedDate(updatedAt, 0)}
            </p>
            <h4>Order Confirmed</h4>
          </div>
        </li>
        <li className={`li ${getStatusClass("dispatched")}`}>
          <div className="timestamp text-sm tracking-wider">
            <span className="date">{calculateEstimatedDate(updatedAt, 1)}</span>
          </div>
          <div className="status flex flex-col justify-center">
            <p className="lg:hidden block">
              {calculateEstimatedDate(updatedAt, 1)}
            </p>
            <h4>Order Dispatched</h4>
          </div>
        </li>
        <li className={`li ${getStatusClass("arrived")}`}>
          <div className="timestamp text-sm tracking-wider">
            <span className="date">{calculateEstimatedDate(updatedAt, 1)}</span>
          </div>
          <div className="status flex flex-col justify-center">
            <p className="lg:hidden block">
              {calculateEstimatedDate(updatedAt, 1)}
            </p>
            <h4>Order Arrived</h4>
          </div>
        </li>
        <li className={`li ${getStatusClass("completed")}`}>
          <div className="timestamp text-sm tracking-wider">
            <span className="date">{calculateEstimatedDate(updatedAt, 1)}</span>
          </div>
          <div className="status flex flex-col justify-center">
            <p className="lg:hidden block">
              {calculateEstimatedDate(updatedAt, 1)}
            </p>
            <h4>Order Completed</h4>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default OrderTrackingComponent;
