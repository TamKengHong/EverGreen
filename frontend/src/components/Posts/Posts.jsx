import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Card from './Card'
import { useParams } from 'react-router-dom'

const Posts = () => {
  const { ticker } = useParams()
  const [postArr, setPostArr] = useState([])
  useEffect(() => { // call fetch only once.
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Token ' + localStorage.getItem('key') }
    }
    fetch('https://ever-green-production.herokuapp.com/stockmarket/posts/?search=' +
      ticker, requestOptions)
      .then(response => response.json())
      .then(data => setPostArr(data))
  }, [])
  return (
    <Box w="95%" margin="auto">
      {console.log(postArr)}
      {postArr ? postArr.map(obj => <Card {...obj} key={obj.id} />) : null}
      <Box h="5vh"></Box>
    </Box>
  )
}

export default Posts
