import { Text, Flex, Button } from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import UserSearchBar from './UserSearchBar'


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
    <>
      <Flex mt="75px" alignItems="center" justifyContent="center" flex="wrap">
        <Flex direction="column" alignItems="center" justifyContent="center"
          bg="rgba(237,242,247,0.8)" p="10" rounded="10" boxShadow="2xl">
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
      <UserSearchBar />
    </>
  )
}

export default UserBar
