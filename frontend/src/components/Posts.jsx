import { Box } from '@chakra-ui/react'
import Card from './Card'

const sampleChildrenArray = [ // props.children
  {
    username: "test",
    date: "1 Jan 2022",
    image: "image",
    likes: 5,
    dislikes: 1,
    text: "Hello this is my first comment",
    children: false
  },
  {
    username: "test",
    date: "1 Jan 2022",
    image: "image",
    likes: 5,
    dislikes: 1,
    text: "Hello this is my second comment",
    children: false
  },
  {
    username: "test",
    date: "1 Jan 2022",
    image: "image",
    likes: 5,
    dislikes: 1,
    text: "Hello this is my third comment",
    children: false
  }
]

const samplePostArray = [
  {
    username: "test",
    date: "1 Jan 2022",
    image: "image",
    likes: 5,
    dislikes: 1,
    text: "Hello this is my first post",
    children: sampleChildrenArray
  },
  {
    username: "test",
    date: "1 Jan 2022",
    image: "image",
    likes: 5,
    dislikes: 1,
    text: "Hello this is my second post",
    children: false
  },
  {
    username: "test",
    date: "1 Jan 2022",
    image: "image",
    likes: 5,
    dislikes: 1,
    text: "Hello this is my third post",
    children: sampleChildrenArray
  }
]

const Posts = () => {
  return (
    <Box w="95%" margin="auto">
      {samplePostArray.map(obj => <Card {...obj} />)}
      <Box h="5vh"></Box>
    </Box>
  )
}

export default Posts
