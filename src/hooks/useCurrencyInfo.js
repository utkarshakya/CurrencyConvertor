import { useEffect } from "react"
import { useCurrency } from "./../Context/CurrencyContext"

function useCurrencyInfo(currency) {

    const { setCurrentCurrencyRates } = useCurrency()

    useEffect(() => {
        (async () => {
            try {
                await fetch(`https://api.frankfurter.dev/v1/latest?base=${currency}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setCurrentCurrencyRates(data.rates)
                    })
            } catch (error) {
                console.log("Error in fetching data in useCurrencyInfo Hook", error);
            }
        })();
    }, [currency])

}

export default useCurrencyInfo;