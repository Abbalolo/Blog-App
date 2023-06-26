 import { useState, useEffect } from "react";
 
 const useFetch = (url) => { 
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
      const abortcont = new AbortController()
          fetch(url, {signal: abortcont.signal} )
          .then(res => {
            if(!res.ok) {
              throw Error("could not fetch the data for that resources")
            }
            return res.json();
          })
          .then(data => {
             setData(data)
             setIsPending(false)
             setError(null)
          })
          .catch(error => {
            if(error.name == "AbortError") {
              console.log("aborted")
            } else {
              setIsPending(false)
              setError(error.message)

            }
          })
          
        return () => abortcont.abort();
        },[url])

        return { data, isPending, error}
}

export default useFetch