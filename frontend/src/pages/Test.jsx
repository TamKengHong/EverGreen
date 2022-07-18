import { Text, Box } from '@chakra-ui/react'
import UserCalendar from '../components/User/UserCalendar'

const Test = () => {
  return (
    <Box bg="gray.300">
      <Text fontSize="60">
        Test
      </Text>
      <Box w="90%" margin="auto" bg="gray.50">
        <UserCalendar />
      </Box>
    </Box >
  )
}

export default Test
