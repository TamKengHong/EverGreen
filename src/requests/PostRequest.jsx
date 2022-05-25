import { useEffect } from 'react'

// Takes in a JSON object, sends it to the server to validate login info 
function PostRequest(info) {
  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
    }
    fetch('https://reqres.in/api/posts', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data.id))
  }, [])
}

export default PostRequest
