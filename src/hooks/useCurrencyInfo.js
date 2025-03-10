import { useEffect } from "react"
import { useCurrency } from "./../Context/CurrencyContext"

function useCurrencyInfo(currency) {
  const { setCurrentCurrencyRates, setIsRatesLoading } = useCurrency()

  useEffect(() => {
    const abortController = new AbortController();

      (async () => {
        setIsRatesLoading(true)
        try {
          const res = await fetch(
            `https://api.frankfurter.dev/v1/latest?base=${currency}`,
            { signal: abortController.signal }
          )
          const data = await res.json()
          setCurrentCurrencyRates(data.rates)
        } catch (error) {
          if (error.name !== 'AbortError') console.log("Error:", error)
        } finally {
          setIsRatesLoading(false)
        }
      })();

    return () => abortController.abort()
  }, [currency, setCurrentCurrencyRates, setIsRatesLoading])
}

export default useCurrencyInfo