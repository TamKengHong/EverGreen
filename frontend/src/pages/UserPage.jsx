import AppBar from '../components/AppBar'
import { Box, Text, VStack } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'


const UserPage = () => {
  const location = useLocation()
  const data = location.state

  return (
    <>
      <AppBar />
      <VStack h="500px" bg="gray.100" alignItems="center">
        <Text fontSize="70" mt="150px">Welcome {data.name.split("@")[0]}!</Text>
      </VStack>

      <Box h="300px" bg="gray.200">
        <Text ml="3" fontSize="30">Settings:</Text>
      </Box>
    </>
  )
}

export default UserPage
