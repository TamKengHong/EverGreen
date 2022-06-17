import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

const UserInfo = () => {
  return <Box>
    <Text as='u' fontSize="20">User Info:</Text>
    <Text>Username: {localStorage.getItem('username')} </Text>
    <Text> Email: {localStorage.getItem('email')} </Text>
  </Box>
}

const UserSettings = () => {
  const [newUsername, setNewUsername] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
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
    <Box>
      <UserInfo />
      <Flex>
        <Input
          border="1px"
          borderColor="gray.400"
          placeholder="Change username"
          type="text"
          variant="filled"
          onChange={e => setNewUsername(e.target.value)}
        />
        <Button size='md' colorScheme="teal">Submit</Button>
      </Flex>
      <Box h="5"></Box>
      <Flex>
        <Input
          border="1px"
          borderColor="gray.400"
          placeholder="Change email"
          type="email"
          variant="filled"
          onChange={e => setNewEmail(e.target.value)}
        />
        <Button size='md' colorScheme="teal">Submit</Button>
      </Flex>
      <Box h="5" ></Box >
      <Flex>
        <Input
          border="1px"
          borderColor="gray.400"
          placeholder="Change password"
          type="password"
          variant="filled"
          onChange={e => setNewPassword(e.target.value)}
        />
        <Button size='md' colorScheme="teal">Submit</Button>
      </Flex>
      <Box h="5" ></Box >
    </Box >
  )
}

export default UserSettings
