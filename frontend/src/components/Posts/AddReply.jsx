import { Image, Box, Flex, Textarea, Button } from '@chakra-ui/react'
import { useState } from 'react'
import Identicon from 'react-identicons'

const AddReply = (props) => {
  const [content, setContent] = useState('')
  // Different if we replying to posts (1st level comments), or replying to comments.
  const isComment = props.post
  let obj

  if (isComment) {
    obj = {
      "name": localStorage.getItem('username'),
      "content": content,
      "post": props.post, // this is the parent post.
      "parent": props.id // this is the parent comment
    }
  } else {
    obj = {
      "name": localStorage.getItem('username'),
      "content": content,
      "post": props.id // this replies to the post id.
    }
  }

  function PostRequest(info) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('key')
      },
      body: JSON.stringify(info)
    }
    fetch('https://ever-green-production.herokuapp.com/stockmarket/comments/', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .then(() => window.location.reload(false))
  }

  const profileUrl = localStorage.getItem('profilePicture')

  return (
    <Box w="95%" margin="auto">
      <Flex border="1px" bg="gray.50" >
        <Box w="70px" >
          <Box ml="5px" mt="5px">
            <Image w="60px" h="60px" src={profileUrl}
              fallback={
                <Identicon size="60" string={localStorage.getItem("username")} bg="#FFFFFF" />
              } />
          </Box>
        </Box>
        <Box w="calc(100% - 70px - 80px)">
          <Textarea
            h="150"
            placeholder="Write something here (required)"
            onChange={e => setContent(e.target.value)}
          />
        </Box>
        <Box w="80px">
          <Button
            colorScheme="teal"
            w="100%"
            h="100%"
            onClick={() => content ? PostRequest(obj) : null}
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
