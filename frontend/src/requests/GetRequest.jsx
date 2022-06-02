import { useEffect } from 'react'

function GetRequest() {
  useEffect(() => {
    fetch('https://ever-green-production.herokuapp.com/stockmarket/users/')
      .then(response => response.json())
      .then(data => console.log(data[0]))
  }, [])
}

export default GetRequest
