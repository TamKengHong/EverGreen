import { useEffect } from 'react'

const headers = {
  'Authorization': 'Token ' + '8d448df75ed17ef634fc9e8accd43c92055e948b',
};

function GetRequest() {
  useEffect(() => {
    fetch('https://ever-green-production.herokuapp.com/stockmarket/users/', { headers })
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])
}

export default GetRequest
