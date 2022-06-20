import { Box, Text, Flex, Button } from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'

const UserBar = () => {
  const navigate = useNavigate()
  const { username } = useParams()

  function handleClick() {
    localStorage.removeItem("key")
    localStorage.removeItem("email")
    navigate('/')
  }
  return (
    <Flex h="500px" alignItems="center" justifyContent="center">
      <Flex direction="column">
        <Text fontSize="70">Welcome {username}!</Text>
        <Button
          alignSelf="center"
          size="lg"
          w="250px"
          colorScheme="red"
          onClick={() => handleClick()}>
          Log out
        </Button>
      </Flex>
    </Flex >
  )
}

export default UserBar
