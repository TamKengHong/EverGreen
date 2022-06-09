import AppBar from '../components/AppBar'
import { Box, Text, VStack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import UserTabs from '../components/User/UserTabs'
import background from '../assets/cream_wood_texture.jpg'
import UserContext from '../context/UserContext'
import { useContext } from 'react'

const UserPage = () => {
  const { email } = useParams()
  // const [context, setContext] = useContext(UserContext)

  return (
    <Box bgImage={background} bgSize="contain">
      <AppBar />
      <VStack h="500px" alignItems="center">
        <Text fontSize="70" mt="150px">Welcome {email}!</Text>
      </VStack>

      <UserTabs bg="gray.100" />

    </Box>
  )
}

export default UserPage
