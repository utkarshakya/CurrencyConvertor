import { useEffect } from "react"
import { useCurrency } from "./../Context/CurrencyContext"

function useCurrencyInfo(currency) {

    const { setCurrentCurrencyRates } = useCurrency()

    useEffect(() => {
        // 1. Create an AbortController
        const abortController = new AbortController();
      
        (async () => {
          try {
            // 2. Pass the signal to fetch
            const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${currency}`, {
              signal: abortController.signal, // <-- Attach signal
            });
            const data = await res.json();
            setCurrentCurrencyRates(data.rates);
          } catch (error) {
            // 3. Ignore errors caused by aborting
            if (error.name !== "AbortError") {
              console.log("Error:", error);
            }
          }
        })();
      
        // 4. Cleanup: Abort the request when currency changes
        return () => abortController.abort();
      }, [currency]); // <-- Dependency: re-run when currency changes

}

export default useCurrencyInfo;