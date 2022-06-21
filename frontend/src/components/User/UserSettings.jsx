import { Spacer, Box, Button, Flex, Text, Textarea } from '@chakra-ui/react'
import { Select } from "chakra-react-select";
import countryList from 'react-select-country-list'
import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

const UserInfo = (props) => {
  return <Box>
    <Text as='u' fontSize="xl">User Info:</Text>
    <Text> User Id: {props.id} </Text>
    <Text> Username: {props.username} </Text>
    <Text> Email: {props.email} </Text>
    <Text> Country: {props.country} </Text>
    <Text> Total Likes: {props.totalLikes}, Total Dislikes: {props.totalDislikes} </Text>
    <Text as='u' fontSize="xl"> Profile Summary:  </Text>
    <Text whiteSpace="pre-wrap">{props.summary}</Text>
  </Box>
}

const UserSettings = () => {
  const [userObj, setUserObj] = useState('')
  const [country, setCountry] = useState('')
  const [summary, setSummary] = useState('')
  const [image, setImage] = useState('') // this works!
  const { username } = useParams() // we use this to search for username
  const options = useMemo(() => countryList().getData(), [])
  const editedInfo = {
    country: country.label,
    summary: summary,
    // profilePicture: image
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
      .then(() => setSummary(userObj.summary))
  }, [])

  function PatchRequest(info) {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Token ' + localStorage.getItem('key')
      },
      body: JSON.stringify(info)
    }
    fetch('https://ever-green-production.herokuapp.com/stockmarket/users/' + userObj.id + "/", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
  }

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
      <Textarea
        bg="gray.100"
        border="1px"
        borderColor="gray.400"
        placeholder="Write something here"
        onChange={e => setSummary(e.target.value)}
      />
      <Box>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={e => setImage(e.target.files[0])} />
      </Box>
      <Flex>
        <Spacer />
        <Button
          mt="5"
          alignSelf="right"
          colorScheme="teal"
          w="200px"
          h="50px"
          onClick={() => {
            PatchRequest(editedInfo)
            window.location.reload(false);  // refresh the page to update
          }}
        >
          Submit
        </Button>
        <Spacer />
      </Flex>
    </Box >
  )
}

export default UserSettings
