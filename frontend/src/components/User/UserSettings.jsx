import { Image, Spacer, Box, Button, Flex, Text, Textarea } from '@chakra-ui/react'
import { Select } from "chakra-react-select"
import countryList from 'react-select-country-list'
import { useState, useMemo } from 'react'
import Identicon from 'react-identicons'

const UserInfo = (props) => {
  const profileUrl = props.profilePicture
  return (
    <Box
      p="5"
      rounded="5"
      border="1px"
      borderColor="gray.600"
      direction="column"
      alignItems="left"
      justifyContent="left">
      {props.email ?
        <>
          <Text as='u' fontSize="xl">User Info:</Text>
          <Box ml="3">
            <Text> User Id: {props.id} </Text>
            <Text> Username: {props.username} </Text>
            <Text> Email: {props.email} </Text>
            <Text> Country: {props.country} </Text>
            <Text> Total Likes: {props.totalLikes}, Total Dislikes: {props.totalDislikes} </Text>
          </Box>
          <Text as='u' fontSize="xl"> Profile Summary:  </Text>
          <Text ml="3" whiteSpace="pre-wrap">{props.summary}</Text>
          <Text as='u' fontSize="xl"> Profile Picture: </Text>
          <Image ml="3" w="60px" h="60px" src={profileUrl}
            fallback={
              <Identicon size="60" string={props.username} bg="#FFFFFF" />
            } />
        </> :
        <Text fontSize="xl">User not found.</Text>}
    </Box>
  )
}

const UserSettings = (props) => {
  const userObj = props
  const [country, setCountry] = useState('')
  const [summary, setSummary] = useState('')
  const [image, setImage] = useState('')
  const options = useMemo(() => countryList().getData(), [])
  const isEmpty = !(image || summary || country)

  function PatchRequest() {
    let formData = new FormData()
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
      .then(() => window.location.reload(false)) //refresh the page to update 
  }

  return (
    <Box w="90%" margin="auto">
      <UserInfo {...userObj} />
      {props.isOwnPage ?
        <>
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
            <Text fontSize="xl" mb="1">Edit Profile Picture:</Text>
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
              onClick={() => isEmpty ? null : PatchRequest()}
            >
              Submit
            </Button>
            <Spacer />
          </Flex>
        </> : null}
    </Box >
  )
}

export default UserSettings
