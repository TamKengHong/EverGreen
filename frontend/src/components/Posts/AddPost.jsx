import { Box, Text, Flex, Square, Link, Textarea, Button } from '@chakra-ui/react'
import { useState } from 'react'

const AddPost = () => {
  const [text, setText] = useState('')

  return (
    <Box w="95%" margin="auto">
      <Flex border="1px">
        <Box w="80px" bg="gray.100" >
          <Square size="60px" bg="gray.300" mt="5px" ml="10px"> User</Square>
        </Box>
        <Box w="calc(100% - 80px - 80px)">
          <Textarea
            h="200"
            bg="blue.100"
            placeholder="Write something here"
            onChange={e => setText(e.target.value)}
          />
        </Box>
        <Box w="80px">
          <Button
            colorScheme="teal"
            w="100%"
            h="100%"
            onClick={() => console.log(text)}
          >
            Submit
          </Button>
        </Box>
      </Flex>
      <Flex>
        <Box bg="blackAlpha.700" w="30px"></Box>
        <Box w="calc(100% - 30px)">
        </Box>
      </Flex>
      <Box h="10"></Box>
    </Box>
  )
}

export default AddPost
