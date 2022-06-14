import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
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


const Posts = (props) => {
  const [postArr, setPostArr] = useState([])
  useEffect(() => { // call fetch only once.
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Token ' + "ecc0d3db5ace35df3e1d32f0ba80ff85e81a0832" }
    }
    fetch('https://ever-green-production.herokuapp.com/stockmarket/posts/', requestOptions)
      .then(response => response.json())
      .then(data => setPostArr(data))
  }, [])
  console.log(postArr)
  return (
    <Box w="95%" margin="auto">
      {postArr ? postArr.map(obj => <Card {...obj} />) : null}
      <Box h="5vh"></Box>
    </Box>
  )
}

export default Posts
