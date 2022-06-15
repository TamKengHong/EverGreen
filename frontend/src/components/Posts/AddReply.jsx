import { Box, Flex, Square, Textarea, Button } from '@chakra-ui/react'
import { useState } from 'react'

const AddReply = (props) => {
  const [content, setContent] = useState('')
  // Different if we replying to posts (1st level comments), or replying to comments.
  const isComment = props.post
  let obj
  console.log(props)

  if (isComment) {
    obj = {
      "name": "ryan",
      "content": content,
      "post": props.post, // this is the parent post.
      "parent": props.id // this is the parent comment
    }
  } else {
    obj = {
      "name": "ryan",
      "content": content,
      "post": props.id // this replies to the post id.
    }
  }


  function PostRequest(info) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + "ecc0d3db5ace35df3e1d32f0ba80ff85e81a0832"
      },
      body: JSON.stringify(info)
    }
    fetch('https://ever-green-production.herokuapp.com/stockmarket/comments/', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
  }

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
            onChange={e => setContent(e.target.value)}
          />
        </Box>
        <Box w="80px">
          <Button
            colorScheme="teal"
            w="100%"
            h="100%"
            onClick={() => {
              PostRequest(obj)
            }}
          >
            Submit
          </Button>
        </Box>
      </Flex >
      <Flex>
        <Box bg="blackAlpha.700" w="30px"></Box>
        <Box w="calc(100% - 30px)">
        </Box>
      </Flex>
      <Box h="10"></Box>
    </Box >
  )
}

export default AddReply
