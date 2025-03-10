import React from "react";
import { Button, Input, Select, Spinner } from "./components";
import {useCurrencyInfo, useCurrencyMetaData} from './hooks'
import { useCurrency } from "./Context/CurrencyContext";

function getCurrencyCodeFromString(value) {
  return value.slice(0, 3);
}

export default function App() {
  const {
    allCurrencyDetails,
    currentCurrencyRates,
    convertCurrencyFrom,
    setConvertCurrencyFrom,
    convertCurrencyTo,
    setConvertCurrencyTo,
    fromAmount,
    setFromAmount,
    toAmount,
    setToAmount,
    isMetadataLoading,
  } = useCurrency();

  useCurrencyMetaData();
  useCurrencyInfo(getCurrencyCodeFromString(convertCurrencyFrom));

  function convert(e, from2To = true) {
    if (!e.target.value) {
      setFromAmount(null);
      setToAmount(null);
      return;
    }

    const targetCurrencyCode = getCurrencyCodeFromString(convertCurrencyTo);
    const valueOfOneUnit = currentCurrencyRates[targetCurrencyCode] || 1; // Fallback to 1

    if (from2To) {
      const userInput = Number(e.target.value);
      setFromAmount(userInput);
      setToAmount((userInput * valueOfOneUnit).toFixed(2));
    } else {
      const userInput = Number(e.target.value);
      setToAmount(userInput);
      setFromAmount((userInput * (1 / valueOfOneUnit)).toFixed(2));
    }
  }

  function handleSwap(){
    const temp = convertCurrencyFrom;
    const tem = fromAmount;
    setConvertCurrencyFrom(convertCurrencyTo)
    setConvertCurrencyTo(temp)
    setFromAmount(toAmount)
    setToAmount(tem)
  }

  if (isMetadataLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center gap-10 px-5">
        <form className="w-full max-w-md flex flex-col items-center justify-center gap-5 rounded bg-gray-900 py-10 px-5 text-sm sm:text-base">
          <div className="w-full">
            <h1 className="text-center text-lg font-bold mb-2">
              Currency Converter
            </h1>
            <hr className="w-full text-gray-800" />
          </div>
          <div className="w-full flex flex-wrap gap-3">
            <div className="w-full flex flex-col items-center px-3">
              <Select
                currency={convertCurrencyFrom}
                onCurrencyChange={setConvertCurrencyFrom}
                alsoChangeAmount={convert}
                currencyArray={allCurrencyDetails}
              />
              <hr />
              <Input
                amount={fromAmount}
                onAmountChange={convert}
                placeholder="From"
              />
            </div>
            <div className="w-full flex flex-col items-center px-3">
              <Select
                currency={convertCurrencyTo}
                onCurrencyChange={setConvertCurrencyTo}
                alsoChangeAmount={convert}
                currencyArray={allCurrencyDetails}
                from2To={false}
              />
              <hr />
              <Input
                amount={toAmount}
                onAmountChange={convert}
                placeholder="To"
                from2To={false}
              />
            </div>
          </div>
          <div>
            <Button onClick={handleSwap} buttonName={"Swap"}/>
          </div>
        </form>
      </div>
    </>
  );
}
