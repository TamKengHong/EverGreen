import { Image, Box, Flex, Textarea, Button, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const AddPost = () => {
  const { ticker } = useParams()
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const obj = {
    "content": content,
    "title": title,
    "name": localStorage.getItem('username'),
    "stockTicker": ticker
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
    fetch('https://ever-green-production.herokuapp.com/stockmarket/posts/', requestOptions)
      .then(response => response.json())
      .then(() => window.location.reload(false))
  }

  const defaultImgUrl = "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg"

  const profileUrl = localStorage.getItem('profilePicture') ?
    localStorage.getItem('profilePicture') : defaultImgUrl

  return (
    <Box w="95%" margin="auto">
      <Flex border="1px" bg="gray.50">
        <Box w="70px" >
          <Image w="60px" h="60px" mt="5px" ml="5px" src={profileUrl} fallbackSrc={defaultImgUrl} />
        </Box>
        <Box w="calc(100% - 70px - 80px)">
          <Input
            bg="gray.200"
            placeholder="Add Post Title"
            size="sm"
            onChange={e => setTitle(e.target.value)}
          />
          <Textarea
            h="150"
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
            }}>
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
