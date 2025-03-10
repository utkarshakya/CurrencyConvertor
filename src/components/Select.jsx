import React from "react";

function Select({ currency, onCurrencyChange, currencyArray }) {
  function stringifyOptions(obj) {
    return `${obj["currencyCode"]} - ${obj["currencySymbol"]} (${obj["currencyName"]}), ${obj["countryName"]}`;
  }
  return (
    <select
      value={currency}
      onChange={(e) => onCurrencyChange(e.target.value)}
      className="w-full rounded px-2 py-3 bg-gray-800 text-gray-400 cursor-pointer outline-0"
    >
      {currencyArray.length !== 0 ? (
        currencyArray.map((data) => (
          <option key={data["currencyCode"]} value={stringifyOptions(data)}>
            {stringifyOptions(data)}
          </option>
        ))
      ) : (
        <option>{currency}</option>
      )}
    </select>
  );
}

export default Select;
