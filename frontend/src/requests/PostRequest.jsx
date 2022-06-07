import { useEffect } from 'react'

// Takes in a JSON object, sends it to the server to validate login info
// Username is set as email.

const info = {
  "username": "testaccount",
  "email": "test@gmail.com",
  "password": "12345678910"
}

function PostRequest(info) {
  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
    }
    fetch('https://ever-green-production.herokuapp.com/stockmarket/users/', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])
}

export default PostRequest
