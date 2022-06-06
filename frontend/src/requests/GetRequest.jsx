import { useEffect } from 'react'

const headers = {
  'Authorization': 'Token ' + '25140262eae033670ffbac069e03052ead6b1e35',
};

function GetRequest() {
  useEffect(() => {
    fetch('https://ever-green-production.herokuapp.com/stockmarket/users/', { headers })
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])
}

export default GetRequest
