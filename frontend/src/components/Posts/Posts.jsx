import { Box } from '@chakra-ui/react'
import Card from './Card'

const sampleChildrenArray = [ // props.children
  {
    name: "test",
    date: "1 Jan 2022",
    image: "image",
    likes: 5,
    dislikes: 1,
    content: "Hello this is my first comment",
    children: false
  },
  {
    name: "test",
    date: "1 Jan 2022",
    image: "image",
    likes: 5,
    dislikes: 1,
    content: "Hello this is my second comment",
    children: false
  },
  {
    name: "test",
    date: "1 Jan 2022",
    image: "image",
    likes: 5,
    dislikes: 1,
    content: "Hello this is my third comment",
    children: false
  }
]

const samplePostArray = [
  {
    name: "test",
    date: "1 Jan 2022",
    image: "image",
    likes: 5,
    dislikes: 1,
    content: "Hello this is my first post",
    comments: sampleChildrenArray
  },
  {
    name: "test",
    date: "1 Jan 2022",
    image: "image",
    likes: 5,
    dislikes: 1,
    content: "Hello this is my second post",
    comments: false
  },
  {
    name: "test",
    date: "1 Jan 2022",
    image: "image",
    likes: 5,
    dislikes: 1,
    content: "Hello this is my third post",
    comments: sampleChildrenArray
  }
]

function getRequest() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Authorization': 'Token ' + "21a5047a6173730e9452fe3767bddd57e66ded31" }
  }
  fetch('https://ever-green-production.herokuapp.com/stockmarket/posts/', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data))
}

const Posts = () => {
  // const postArr = getRequest()
  // console.log(postArr)
  return (
    <Box w="95%" margin="auto">
      {samplePostArray.map(obj => <Card {...obj} />)}
      <Box h="5vh"></Box>
    </Box>
  )
}

export default Posts
