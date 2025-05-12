import React from "react";

const Faq = () => {
  
  const faqData = [
    {
      question: "Hello World Verified:",
      title: "Get exactly what you ordered!",
      answer:
        "The “Hello World Verified” badge is a sign of reliability, safety and trust for the product.Hello World Verified products are either shipped directly from Hello World Warehouses or from exclusively selected trusted sellers. <br/> Hello World Verified products are easily identifiable via the 'Hello World verified' tag under the product image or the 'Hello World Verified' notification under the delivery section of the product page.<br/>You can easily look for 'Hello World Verified' products by using the filter under 'services' on search result pages or category navigation pages.",
    },
    {
      question: "7 Days Returns:",
      title: "Change of mind is not applicable",
      answer:
        "7 Days Returns - Change of mind is not applicable as a Return Reason for this product. Product can only be returned if it has arrived in damaged/defective/expired state at the time of delivery.",
    },
    {
      question: "Warranty not available:",
      title: "Warranty not available",
      answer:
        "If your product does not come with any warranty, then you can still benefit from our return policy. Please read the return policy conditions",
    },
    // Add more FAQ items as needed
  ];
  return (
    <div className=" container mx-auto">
      <div className="w-[100%] ">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="group flex flex-col gap-2 rounded-lg bg-gray-700 p-5 text-white mb-4"
            tabindex={index}
          >
            <div className="flex cursor-pointer items-center justify-between">
              <span>{faq.question} </span>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png"
                className="h-2 w-3 transition-all duration-500 group-focus:-rotate-180"
              />
            </div>
            <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
