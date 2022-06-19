import { Box, Button, Flex, Input, Text, Textarea } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const UserInfo = (props) => {
  return <Box>
    <Text as='u' fontSize="20">User Info:</Text>
    <Text> Username: {props.username} </Text>
    <Text> Email: {props.email} </Text>
    <Text> Country: {props.country} </Text>
    <Text> User Id: {props.id} </Text>
    <Text> Profile Summary: {props.summary} </Text>
    <Text> Total Likes: {props.totalLikes} </Text>
    <Text> Total Dislikes: {props.totalDislikes} </Text>
  </Box>
}

const UserSettings = () => {
  const [userObj, setUserObj] = useState('')
  const [country, setCountry] = useState('')
  const [summary, setSummary] = useState('')
  const { username } = useParams() // we use this to search for username

  useEffect(() => { // call fetch only once.
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Token ' + localStorage.getItem('key') }
    }
    fetch('https://ever-green-production.herokuapp.com/stockmarket/users/?search='
      + username, requestOptions)
      .then(response => response.json())
      .then(data => setUserObj(data[0]))
  }, [])

  console.log(userObj)

  if (userObj && localStorage.getItem('email') === userObj.email) {
    // You are accessing your own userpage.
    localStorage.setItem('username', userObj.username)
  }

  return (
    <Box>
      <UserInfo {...userObj} />
      <Flex mt="5" mb="5">
        <Input
          border="1px"
          borderColor="gray.400"
          placeholder="Change Country"
          variant="filled"
          onChange={e => setCountry(e.target.value)}
        />
        <Button
          size='md'
          colorScheme="teal"
          onClick={() => console.log(country)}
        >Submit</Button>
      </Flex>
      <Flex bg="gray.50">
        <Textarea
          h="150"
          bg="gray.100"
          border="1px"
          borderColor="gray.400"
          placeholder="Edit Profile Summary"
          onChange={e => setSummary(e.target.value)}
        />
        <Box w="80px">
          <Button
            colorScheme="teal"
            w="100%"
            h="100%"
            onClick={() => console.log(summary)}
          >
            Submit
          </Button>
        </Box>
      </Flex >
    </Box >
  )
}

export default UserSettings
