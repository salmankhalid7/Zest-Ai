import React from "react";

const Card = ({ title, children }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow duration-200 mb-4">
      <h3 className="text-lg font-semibold text-green-800 mb-3">
        {title}
      </h3>
      <div className="text-gray-600">
        {children}
      </div>
    </div>
  );
};

export default Card;