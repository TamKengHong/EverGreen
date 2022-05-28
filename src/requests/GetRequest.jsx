import { useState, useEffect } from 'react'

function GetRequest() {
  const [totalReactPackages, setTotalReactPackages] = useState(null)

  useEffect(() => {
    fetch('https://ever-green-production.herokuapp.com/stockmarket/')
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])
}

export default GetRequest
