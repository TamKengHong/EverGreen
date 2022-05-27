import { Square, Flex, Spacer } from '@chakra-ui/react'


const PostBar = () => {
  return (
    <Flex wrap="wrap">
      <Square size="30vh" bg="purple.300"></Square>
      <Spacer />
      <Square size="30vh" bg="teal.300"></Square>
      <Spacer />
      <Square size="30vh" bg="gray.300"></Square>
      <Spacer />
      <Square size="30vh" bg="pink.300"></Square>
    </Flex>
  )
}

export default PostBar 
