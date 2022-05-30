import AppBar from '../components/AppBar'
import { Box, Text, VStack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import UserTabs from '../components/User/UserTabs'

const UserPage = () => {
  let { email } = useParams()

  return (
    <Box bg="gray.300">
      <AppBar />
      <VStack h="500px" alignItems="center">
        <Text fontSize="70" mt="150px">Welcome {email}!</Text>
      </VStack>

      <UserTabs bg="gray.100" />

    </Box>
  )
}

export default UserPage
