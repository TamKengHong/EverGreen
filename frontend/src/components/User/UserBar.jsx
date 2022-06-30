import { Text, Flex, Button } from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'

const UserBar = () => {
  const navigate = useNavigate()
  const { username } = useParams()
  const isOwnPage = localStorage.getItem("username") === username

  function handleClick() {
    localStorage.removeItem("key")
    localStorage.removeItem("email")
    localStorage.removeItem("username")
    localStorage.removeItem("profilePicture")
    navigate('/')
  }
  const message = isOwnPage ? "Welcome " + username + "!" : "User: " + username

  return (
    <Flex h="400px" alignItems="center" justifyContent="center">
      <Flex direction="column" bg="rgba(237,242,247,0.8)" p="10" rounded="10" boxShadow="2xl">
        <Text fontSize="6xl" >{message}</Text>
        {isOwnPage ?
          <Button
            mt="3"
            alignSelf="center"
            size="lg"
            w="250px"
            colorScheme="red"
            onClick={() => handleClick()}>
            Log out
          </Button> :
          null}
      </Flex>
    </Flex >
  )
}

export default UserBar
