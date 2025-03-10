import { useEffect } from 'react'
import { useCurrency } from '../Context/CurrencyContext'

function useCurrencyMetaData() {

    const { setAllCurrencyDetails } = useCurrency()

    function prepareData(data) {
        if (Object.keys(data).length === 0) return

        const currencyCodes = Object.keys(data)
        currencyCodes.forEach((value) => {
            (async () => {
                try {
                    await fetch(`https://currency-rate-exchange-api.onrender.com/${value}`).then((res) => res.json()).then((data) => {
                        const obj = {
                            currencyCode: data.currencyCode,
                            currencyName: data.currencyName,
                            currencySymbol: data.currencySymbol,
                            countryName: data.countryName,
                        }
                        setAllCurrencyDetails((prev) => [...prev, obj])
                    })
                } catch (error) {
                    console.log("Error In PrepareData Function", error)
                }
            })()
        })

    }

    useEffect(() => {
        (async () => {
            try {
                await fetch(`https://api.frankfurter.dev/v1/currencies`)
                    .then((res) => (res.json()))
                    .then((data) => {
                        prepareData(data)
                    })
            } catch (error) {
                console.log("Sorry", error)
            }
        })()
    }, [])
}

export default useCurrencyMetaData