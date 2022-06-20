import { Spacer, Box, Button, Flex, Text, Textarea } from '@chakra-ui/react'
import { Select } from "chakra-react-select";
import countryList from 'react-select-country-list'
import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

const UserInfo = (props) => {
  return <Box>
    <Text as='u' fontSize="xl">User Info:</Text>
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
  const options = useMemo(() => countryList().getData(), [])
  const editedInfo = {
    country: country,
    summary: summary
  }

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

  function PutRequest(info) {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('key')
      },
      body: JSON.stringify(info)
    }
    fetch('https://ever-green-production.herokuapp.com/stockmarket/users/' + userObj.id, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
  }

  console.log(userObj)

  if (userObj && localStorage.getItem('email') === userObj.email) {
    // You are accessing your own userpage.
    localStorage.setItem('username', userObj.username)
  }

  return (
    <Box>
      <UserInfo {...userObj} />
      <Text mt="5" fontSize="xl">Edit Country:</Text>
      <Box bg="gray.100" border="1px" borderColor="gray.400" rounded="5">
        <Select
          options={options}
          value={country}
          onChange={v => setCountry(v)} />
      </Box>
      <Text mt="5" fontSize="xl">Edit Profile Summary:</Text>
      <Flex mb="5" bg="gray.50">
        <Textarea
          h="150"
          bg="gray.100"
          border="1px"
          borderColor="gray.400"
          placeholder="Write something here"
          onChange={e => setSummary(e.target.value)}
        />
      </Flex >
      <Box>
        <input type="file" onChange={e => console.log(e.target.files[0])} />
      </Box>
      <Flex>
        <Spacer />
        <Button
          mt="5"
          alignSelf="right"
          colorScheme="teal"
          w="200px"
          h="50px"
          onClick={() => PutRequest(editedInfo)}
        >
          Submit
        </Button>
        <Spacer />
      </Flex>
    </Box >
  )
}

export default UserSettings
