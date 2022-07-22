import { Text, Box } from '@chakra-ui/react'
import ImpliedEarningsMove from '../components/ImpliedEarningsMove'
import UserCalendarTheme from '../components/User/UserCalendarTheme'

const Test = () => {
  return (
    <Box bg="gray.300">
      <Text fontSize="60">
        Test
      </Text>
      <Box w="90%" margin="auto" bg="gray.50">
        <UserCalendarTheme />
      </Box>
    </Box >
  )
}

export default Test
