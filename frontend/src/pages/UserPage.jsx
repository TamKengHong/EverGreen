import AppBar from '../components/AppBar'
import { Box, Text, VStack, Button } from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import UserTabs from '../components/User/UserTabs'
import background from '../assets/cream_wood_texture.jpg'

const UserPage = () => {
  const { email } = useParams()
  const navigate = useNavigate()

  function handleClick() {
    localStorage.removeItem("key")
    localStorage.removeItem("email")
    navigate('/')
  }

  return (
    <Box bgImage={background} bgSize="contain">
      <AppBar />
      <VStack h="500px" alignItems="center">
        <Text fontSize="70" mt="150px">Welcome {email}!</Text>
        <Button size="lg"
          colorScheme="red"
          onClick={() => handleClick()}>
          Log out
        </Button>
      </VStack>

      <UserTabs bg="gray.100" />
      <Box h="10" />
    </Box>
  )
}

export default UserPage
