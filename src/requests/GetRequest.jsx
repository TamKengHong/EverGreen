import React, { useState, useEffect } from 'react'

function GetRequest() {
  const [totalReactPackages, setTotalReactPackages] = useState(null)

  useEffect(() => {
    fetch('https://api.npms.io/v2/search?q=react')
      .then(response => response.json())
      .then(data => setTotalReactPackages(data.total))
  }, [])

  return (
    <div className="card text-center m-3">
      <h5 className="card-header">GET Request with React Hooks</h5>
      <div className="card-body">
        Total react packages: {totalReactPackages}
      </div>
    </div>
  )
}

export default GetRequest
