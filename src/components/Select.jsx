import React from "react";

function Select({currency, onCurrencyChange, currencyArray}) {
  return (
    <select
      value={currency}
      onChange={(e) => onCurrencyChange(e.target.value)}
      className="w-full rounded p-1 bg-gray-800 text-gray-400 cursor-pointer border-b"
    >
      {currencyArray.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
}

export default Select;
