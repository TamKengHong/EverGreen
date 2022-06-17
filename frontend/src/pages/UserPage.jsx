import AppBar from '../components/AppBar'
import { Box } from '@chakra-ui/react'
import UserTabs from '../components/User/UserTabs'
import UserBar from '../components/User/UserBar'
import background from '../assets/cream_wood_texture.jpg'

const UserPage = () => {
  return (
    <Box bgImage={background} bgSize="contain">
      <AppBar />
      <UserBar />
      <UserTabs bg="gray.100" />
      <Box h="10" />
    </Box>
  )
}

export default UserPage
