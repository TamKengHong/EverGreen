import { useEffect } from 'react'

// Takes in a JSON object, sends it to the server to validate login info

const info = {
  "email": "test@gmail.com",
  "username": "test",
  "summary": null,
  "profilePicture": null,
  "country": null,
  "totalLikes": 0,
  "totalDislikes": 0,
  "id": 2,
  "password": "asdjoieasdc"
}


function PostRequest() {
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
