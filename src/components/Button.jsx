import React from "react";

function Button({onClick, buttonName}) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="px-5 py-2 bg-gray-800 text-gray-300 font-semibold rounded shadow cursor-pointer text-sm"
    >
      {buttonName}
    </button>
  );
}

export default Button;
