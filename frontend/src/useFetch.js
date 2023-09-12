import { useEffect, useState } from "react"

export function useFetch(url) {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setData(undefined)
    setIsError(false)
    setIsLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, [url])

  return { data, isLoading, isError }
}
