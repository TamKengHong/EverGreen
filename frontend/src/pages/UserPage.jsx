import AppBar from '../components/AppBar'
import { Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import UserTabs from '../components/User/UserTabs'
import UserBar from '../components/User/UserBar'
import background from '../assets/cream_wood_texture.jpg'

const UserPage = () => {
  const [userObj, setUserObj] = useState('')
  useEffect(() => { // call fetch only once.
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Token ' + localStorage.getItem('key') }
    }
    fetch('https://ever-green-production.herokuapp.com/stockmarket/users/?search='
      + localStorage.getItem('email'), requestOptions)
      .then(response => response.json())
      .then(data => setUserObj(data))
  }, [])

  console.log(userObj[0])

  if (userObj && localStorage.getItem('email') === userObj[0].email) {
    // You are accessing your own userpage.
    localStorage.setItem('username', userObj[0].username)
  }


  return (
    <Box bgImage={background} bgSize="contain">
      <AppBar />
      <UserBar />
      <UserTabs bg="gray.100" />
      <Box h="10" />
    </Box>
  )
}

export default UserPage
