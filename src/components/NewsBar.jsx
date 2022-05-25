import { Square, Flex, Spacer } from '@chakra-ui/react'


const NewsBar = () => {
  return (
    <Flex>
      <Square size="30vh" bg="red.300"></Square>
      <Spacer />
      <Square size="30vh" bg="blue.300"></Square>
      <Spacer />
      <Square size="30vh" bg="yellow.300"></Square>
      <Spacer />
      <Square size="30vh" bg="green.300"></Square>
    </Flex>
  )
}

export default NewsBar
