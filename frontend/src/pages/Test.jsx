import { Text, Box } from '@chakra-ui/react'
import Calendar from '../components/Calendar'

const Test = () => {
  return (
    <Box bg="gray.300">
      <Text fontSize="60">
        Test
      </Text>
      <Box w="90%" margin="auto" bg="gray.50">
        <Calendar />
      </Box>
    </Box >
  )
}

export default Test
