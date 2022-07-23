import {
  Box, InputGroup, Input, InputLeftAddon
} from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserSearchBar = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState()
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      navigate(`/user/${user}`)
      window.location.reload(false)
    }
  }
  return (
    <Box bg="rgba(237,242,247,0.8)" p="5" rounded="10" boxShadow="2xl"
      m="auto" w="75%" mb="10" mt="50px" >
      <InputGroup size='lg'>
        <InputLeftAddon
          border="1px"
          borderColor="gray.400"
          bgColor="#dccbb3"
          ml={5}
          children={<BiSearch size="20" />}
        />
        <Input
          border="1px"
          borderColor="gray.400"
          placeholder='Search User'
          bgColor="#f4efe7"
          mr={5}
          onChange={e => { setUser(e.target.value) }}
          onKeyPress={e => handleKeyPress(e)}
        />
      </InputGroup>
    </Box >
  )
}

export default UserSearchBar
