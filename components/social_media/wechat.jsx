import React from "react";

const Wechat = ({number}) => {
  const phoneNumber = "+9779808811027"; // Replace with the desired phone number

  // Create a link to open the WeChat app
  const wechatLink = `weixin://dl/chat?chat_type=wexin&version=7.0.8&phone=${number}`;

  return (
    <div>
      <a href={wechatLink}>
        <button title="wechat">
          <i className="fab fa-weixin text-green-600"></i>
        </button>
      </a>
    </div>
  );
};

export default Wechat;
