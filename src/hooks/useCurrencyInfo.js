import { useEffect, useState } from "react"
import {useCurrency} from "./../Context/CurrencyContext"

function useCurrencyInfo(currency) {

    function makeDataMeaningFull(data) {
        if (Object.keys(data).length === 0) return

        const currencyDetails = []
        console.log(data)
        const currencyCodes = Object.keys(data)
        console.log(currencyCodes)

        currencyCodes.forEach((value) => {
            (async () => {
                await fetch(`https://currency-rate-exchange-api.onrender.com/${value}`).then((res) => res.json()).then((data) => {
                    const obj = {}
                    obj.currencyCode = data.currencyCode
                    obj.currencyName = data.currencyName
                    obj.currencySymbol = data.currencySymbol
                    obj.countryName = data.countryName
                    currencyDetails.push(obj)
                })
            })()
        })

        console.log(currencyDetails)

    }

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [currencyCode, setCurrencyCode] = useState({})

    useEffect(() => {
        (async () => {
            try {
                fetch(`https://api.frankfurter.dev/v1/currencies`)
                    .then((res) => (res.json()))
                    .then((data) => {
                        setCurrencyCode(Object.keys(data))
                        makeDataMeaningFull(data)
                    })
            } catch (error) {
                console.log("Sorry", error)
            }
        })()
    }, [])

    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                const response = await fetch(`https://currency-rate-exchange-api.onrender.com/${currency}`)
                const data = await response.json()
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        }
        fetchCurrency();
    }, [currency])

    return { data, loading }
}

export default useCurrencyInfo;