import React, { useState, useEffect } from 'react'

function PostRequest() {
  const [postId, setPostId] = useState(null)

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React Hooks POST Request Example' })
    }
    fetch('https://reqres.in/api/posts', requestOptions)
      .then(response => response.json())
      .then(data => setPostId(data.id))
  }, [])

  return (
    <div className="card text-center m-3">
      <h5 className="card-header">POST Request with React Hooks</h5>
      <div className="card-body">
        Returned Id: {postId}
      </div>
    </div>
  )
}

export default PostRequest
