import { Box, Text } from '@chakra-ui/react'
import Card from '../Posts/Card'

// Posts and comments
const UserPosts = (props) => {
  const postArr = props.posts
  const commentArr = props.comments
  if (postArr) postArr.sort((a, b) => a.id - b.id)
  if (commentArr) commentArr.sort((a, b) => a.id - b.id)
  return (
    <Box w="95%" margin="auto">
      <Text fontSize="2xl" as="u">Posts:</Text>
      <Box h="2" />
      {postArr ? postArr.map(obj => <Card {...obj} comments={null} key={obj.id} />) : null}
      <Box h="10" />
      <Text fontSize="2xl" as="u" >Comments:</Text>
      <Box h="2" />
      {commentArr ? commentArr.map(obj => <Card {...obj} key={obj.id} />) : null}
    </Box>
  )
}

export default UserPosts
