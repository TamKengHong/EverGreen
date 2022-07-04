import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Card from '../Posts/Card'
import { useParams } from 'react-router-dom'

const UserPosts = () => {
  const { username } = useParams()
  const [postArr, setPostArr] = useState([])
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Token ' + localStorage.getItem('key') }
    }
    fetch('https://ever-green-production.herokuapp.com/stockmarket/posts/?search=' +
      username + "&username_only=yes", requestOptions)
      .then(response => response.json())
      .then(data => setPostArr(data))
  }, [username])
  postArr.sort((a, b) => a.id - b.id)
  return (
    <Box w="95%" margin="auto">
      {postArr ? postArr.map(obj => <Card {...obj} key={obj.id} />) : null}
    </Box>
  )
}

export default UserPosts
