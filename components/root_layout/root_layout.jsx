import React from "react";
import Header from "../new/Header";
import Footer from "../new/Footer";

const Root_layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div style={{ fontFamily: 'stem' }} className="flex-grow">
        <Header />
        <main className="mx-auto w-full max-w-7xl  px-4 sm:px-6 md:px-8 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Root_layout;
