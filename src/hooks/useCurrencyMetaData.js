import { useEffect } from 'react'
import { useCurrency } from '../Context/CurrencyContext'

function useCurrencyMetaData() {

    const { setAllCurrencyDetails } = useCurrency()


    async function prepareData(data) {
        const currencyCodes = Object.keys(data);
        try {
            const promises = currencyCodes.map(async (code) => {
                const response = await fetch(`https://currency-rate-exchange-api.onrender.com/${code}`);
                const data = await response.json();
                return {
                    currencyCode: data.currencyCode,
                    currencyName: data.currencyName,
                    currencySymbol: data.currencySymbol,
                    countryName: data.countryName,
                };
            });
            const results = await Promise.all(promises);
            setAllCurrencyDetails(results.filter(item => item.currencyCode)); // Filter out invalid responses
        } catch (error) {
            console.log("Error in prepareData:", error);
        }
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