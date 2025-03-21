import React from "react";
import { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [allCurrencyDetails, setAllCurrencyDetails] = useState([]);
  const [currentCurrencyRates, setCurrentCurrencyRates] = useState({});
  const [convertCurrencyFrom, setConvertCurrencyFrom] = useState(
    `USD - $ (United States Dollar), United States`
  );
  const [convertCurrencyTo, setConvertCurrencyTo] = useState(
    `INR - ₹ (Indian Rupee), India`
  );
  const [fromAmount, setFromAmount] = useState(null);
  const [toAmount, setToAmount] = useState(null);
  const [isMetadataLoading, setIsMetadataLoading] = useState(true);
  const [isRatesLoading, setIsRatesLoading] = useState(true);

  return (
    <CurrencyContext.Provider
      value={{
        allCurrencyDetails, setAllCurrencyDetails,
        currentCurrencyRates, setCurrentCurrencyRates,
        convertCurrencyFrom, setConvertCurrencyFrom,
        convertCurrencyTo, setConvertCurrencyTo,
        fromAmount, setFromAmount,
        toAmount, setToAmount,
        isMetadataLoading, setIsMetadataLoading,
        isRatesLoading, setIsRatesLoading
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
