import { VStack, Box, Text } from '@chakra-ui/react'
import Card from './Card'

const samplePost = {
  username: "test",
  date: "1 Jan 2022",
  image: "image",
  likes: "5",
  dislikes: "1",
  text: "Hello this is my first post",
}

const Posts = () => {
  return (
    <Box w="95%" margin="auto">
      <Card {...samplePost} />
      <Card />
      <Card />
      <Card />
      <Card />
      <Box h="5vh"></Box>
    </Box>
  )
}

export default Posts
