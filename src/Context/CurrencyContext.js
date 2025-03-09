import { createContext, useContext, useState } from 'react'

const CurrencyContext = createContext()

export function CurrencyProvider({ children }) {
    const [allCurrencyDetails, setAllCurrencyDetails] = useState([])
    const [currencyCurrencyRates, setCurrentCurrencyRates] = useState([])
    const [convertCurrencyFrom, setConvertCurrencyFrom] = useState("usd")
    const [convertCurrencyTo, setConvertCurrencyTo] = useState("inr")
    const [fromAmount, setFromAmount] = useState(null)
    const [toAmount, setToAmount] = useState(null)

    return (
        <CurrencyContext.Provider value={{ allCurrencyDetails, setAllCurrencyDetails, currencyCurrencyRates, setCurrentCurrencyRates, convertCurrencyFrom, setConvertCurrencyFrom, convertCurrencyTo, setConvertCurrencyTo, fromAmount, setFromAmount, toAmount, setToAmount }}>
            {children}
        </CurrencyContext.Provider>
    )
}

export const useCurrency = () => useContext(CurrencyContext)