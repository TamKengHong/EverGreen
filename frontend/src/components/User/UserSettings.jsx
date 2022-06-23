import { Image, Spacer, Box, Button, Flex, Text, Textarea } from '@chakra-ui/react'
import { Select } from "chakra-react-select";
import countryList from 'react-select-country-list'
import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

const UserInfo = (props) => {
  const profileUrl = props.profilePicture ?
    props.profilePicture :
    "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg"

  return <Flex
    p="5"
    rounded="5"
    bg="gray.100"
    direction="column"
    alignItems="center"
    justifyContent="center">
    <Text as='u' fontSize="xl">User Info:</Text>
    <Text> User Id: {props.id} </Text>
    <Text> Username: {props.username} </Text>
    <Text> Email: {props.email} </Text>
    <Text> Country: {props.country} </Text>
    <Text> Total Likes: {props.totalLikes}, Total Dislikes: {props.totalDislikes} </Text>
    <Text as='u' fontSize="xl"> Profile Summary:  </Text>
    <Text whiteSpace="pre-wrap">{props.summary}</Text>
    <Text as='u' fontSize="xl"> Profile Picture: </Text>
    <Image w="60px" h="60px" src={profileUrl} />
  </Flex>
}

const UserSettings = () => {
  const [userObj, setUserObj] = useState('')
  const [country, setCountry] = useState('')
  const [summary, setSummary] = useState('')
  const [image, setImage] = useState('')
  const { username } = useParams()
  const options = useMemo(() => countryList().getData(), [])

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

  function PatchRequest() {
    let formData = new FormData()
    console.log(image)
    if (image) formData.append('profilePicture', image)
    if (country) formData.append('country', country.label)
    if (summary) formData.append('summary', summary)
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('key')
      },
      body: formData
    }
    fetch('https://ever-green-production.herokuapp.com/stockmarket/users/' + userObj.id + "/", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .then(window.location.reload(false)) //refresh the page to update 
  }

  if (userObj && localStorage.getItem('email') === userObj.email) {
    // You are accessing your own userpage.
    localStorage.setItem('username', userObj.username)
    if (userObj.profilePicture) localStorage.setItem('profilePicture', userObj.profilePicture)
  }

  return (
    <Box>
      <Flex alignItems="center" justifyContent="center">
        <UserInfo {...userObj} />
      </Flex>
      <Text mt="5" fontSize="xl">Edit Country:</Text>
      <Box bg="gray.100" border="1px" borderColor="gray.400" rounded="5">
        <Select options={options} value={country} onChange={v => setCountry(v)} />
      </Box>
      <Text mt="5" fontSize="xl">Edit Profile Summary:</Text>
      <Textarea
        h="150px"
        bg="gray.100"
        border="1px"
        borderColor="gray.400"
        placeholder="Write something here"
        onChange={e => setSummary(e.target.value)}
      />
      <Box mt="5">
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
            PatchRequest()
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
