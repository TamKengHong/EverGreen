import { Box, Flex, Square, IconButton, Link, Text } from '@chakra-ui/react'
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai'
import { useState } from 'react'
import AddReply from './AddReply'

const Card = (props) => {
  const [isLikeActive, setIsLikeActive] = useState(false)
  const [isDislikeActive, setIsDislikeActive] = useState(false)
  const [isReplyActive, setIsReplyActive] = useState(false)
  const isComment = props.post
  const isPost = !isComment
  const isCommentReply = isComment && props.parent != null
  console.log(props.content)

  return (
    <>
      <Flex border="1px" bg="whiteAlpha.900">
        <Box w="70px" >
          <Square size="60px" bg="gray.300" mt="5px" ml="5px"> image </Square>
        </Box>
        <Box w="calc(100% - 70px)" >
          <Box borderBottom="1px" borderColor="gray.400">
            {props.name},
            {" " + new Date(props.date).toLocaleDateString()},
            {(isComment ? " Comment id: " : " Post id: ") + props.id}
            {isCommentReply ? " | Replying to comment id: " + props.parent : null}
          </Box>
          <Box minH="120" >
            <Text as="b" fontSize="xl">{isPost ? "Title: " + props.title + " " : null}</Text>
            <pre >{props.content}</pre>
          </Box>
          <Box borderTop="1px" borderColor="gray.400">
            {isLikeActive ? props.likes + 1 : props.likes}
            <IconButton
              _focus={{ outline: "none" }}
              bg="None"
              aria-label="Likes"
              size="sm"
              icon={!isLikeActive ? <AiOutlineLike size="22" /> : <AiFillLike size="22" />}
              onClick={() => {
                setIsLikeActive(!isLikeActive)
                setIsDislikeActive(false)
              }}
            />
            {isDislikeActive ? props.dislikes + 1 : props.dislikes}
            <IconButton
              _focus={{ outline: "none" }}
              bg="None"
              aria-label="Dislikes"
              size="sm"
              icon={!isDislikeActive ? <AiOutlineDislike size="22" /> : <AiFillDislike size="22" />}
              onClick={() => {
                setIsDislikeActive(!isDislikeActive)
                setIsLikeActive(false)
              }}
            />
            <Link onClick={() => { setIsReplyActive(!isReplyActive) }}>Reply</Link>
            {isReplyActive ? <AddReply {...props} /> : null}
          </Box>
        </Box>
      </Flex>
      <Flex>
        <Box w="30px"></Box>
        <Box w="calc(100% - 30px)">
          {props.comments ? props.comments.map(obj => <Card {...obj} />) : null}
        </Box>
      </Flex>
    </>
  )
}

export default Card
