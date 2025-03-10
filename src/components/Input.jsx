import React from "react";

function Input({ amount, onAmountChange, placeholder, from2To = true }) {
  return (
    <input
      type="number"
      placeholder={placeholder}
      value={amount ?? ""}
      onChange={(e) => {onAmountChange(e, from2To)}}
      className="h-14 w-full px-3 py-2 bg-gray-800 rounded"
    />
  );
}

export default Input;
