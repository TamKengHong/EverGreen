import { useEffect } from 'react'

// Takes in a JSON object, sends it to the server to validate login info

const info = {
  "username": "tamkenghong",
  "password": "tamkenghong"
}

function PostRequest() {
  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
    }
    fetch('https://ever-green-production.herokuapp.com/stockmarket/auth/', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])
}

export default PostRequest
