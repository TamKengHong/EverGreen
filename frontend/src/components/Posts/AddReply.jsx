import { Image, Box, Flex, Textarea, Button } from '@chakra-ui/react'
import { useState } from 'react'

const AddReply = (props) => {
  const [content, setContent] = useState('')
  // Different if we replying to posts (1st level comments), or replying to comments.
  const isComment = props.post
  let obj
  console.log(props)

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

  const defaultImgUrl = "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg"
  const profileUrl = localStorage.getItem('profilePicture') ?
    localStorage.getItem('profilePicture') : defaultImgUrl

  return (
    <Box w="95%" margin="auto">
      <Flex border="1px" bg="gray.50" >
        <Box w="70px" >
          <Image w="60px" h="60px" mt="5px" ml="5px" src={profileUrl} fallbackSrc={defaultImgUrl} />
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
