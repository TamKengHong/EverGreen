import { Square, Flex, Spacer } from '@chakra-ui/react'


const PostBar = () => {
  return (
    <Flex wrap="wrap">
      <Square size="30vh" bg="purple.300" boxShadow="lg"></Square>
      <Spacer />
      <Square size="30vh" bg="teal.300" boxShadow="lg"></Square>
      <Spacer />
      <Square size="30vh" bg="gray.300" boxShadow="lg"></Square>
      <Spacer />
      <Square size="30vh" bg="pink.300" boxShadow="lg"></Square>
    </Flex>
  )
}

export default PostBar 
