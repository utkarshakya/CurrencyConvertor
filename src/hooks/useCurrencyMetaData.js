import { useEffect } from 'react'
import { useCurrency } from '../Context/CurrencyContext'

function useCurrencyMetaData() {
  const { setAllCurrencyDetails, setIsMetadataLoading } = useCurrency()

  async function prepareData(data) {
    const currencyCodes = Object.keys(data)
    try {
      const promises = currencyCodes.map(async (code) => {
        const res = await fetch(`https://currency-rate-exchange-api.onrender.com/${code}`)
        return await res.json()
      })
      const results = await Promise.all(promises)
      const filtered = results.filter(item => item.currencyCode)
      setAllCurrencyDetails(filtered)
    } catch (error) {
      console.log("Error:", error)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://api.frankfurter.dev/v1/currencies`)
        const data = await res.json()
        await prepareData(data)
      } catch (error) {
        console.log("Error:", error)
      } finally {
        setIsMetadataLoading(false)
      }
    })()
  }, [])
}

export default useCurrencyMetaData