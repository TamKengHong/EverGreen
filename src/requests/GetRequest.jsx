import { useState, useEffect } from 'react'

function GetRequest() {
  const [totalReactPackages, setTotalReactPackages] = useState(null)

  useEffect(() => {
    fetch('https://api.npms.io/v2/search?q=react')
      .then(response => response.json())
      .then(data => setTotalReactPackages(data.total))
  }, [])
}

export default GetRequest
