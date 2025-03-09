import React, { useEffect, useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { Input, Select } from "./components";


export default function App() {

  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");
  const [amount, setAmount] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const { data, loading } = useCurrencyInfo(fromCurrency);
  
  useEffect(() => {
    if (!loading && Object.keys(data).length != 0) {
      const currencyRates = data["rates"][fromCurrency]
      setCurrencies(Object.keys(currencyRates));
    }
  }, [loading, data]);

  function convert(e, from2To = true) {
    if (!e.target.value) {
      setAmount(null);
      setConvertedAmount(null);
      return;
    }
    if (from2To) {
      const userInput = Number(e.target.value);
      setAmount(userInput);
      const valueOfOneUnit = data[toCurrency];
      setConvertedAmount(userInput * valueOfOneUnit);
    } else {
      const userInput = Number(e.target.value);
      setConvertedAmount(userInput);
      const valueOfOneUnit = data[toCurrency];
      setAmount(userInput * (1 / valueOfOneUnit));
    }
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
                currency={fromCurrency}
                onCurrencyChange={setFromCurrency}
                currencyArray={currencies}
              />
              <Input
                amount={amount}
                onAmountChange={convert}
                placeholder="From"
              />
            </div>
            <div className="w-full flex flex-col items-center px-3">
              <Select
                currency={toCurrency}
                onCurrencyChange={setToCurrency}
                currencyArray={currencies}
              />
              <Input
                amount={convertedAmount}
                onAmountChange={convert}
                placeholder="To"
                from2To={false}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
