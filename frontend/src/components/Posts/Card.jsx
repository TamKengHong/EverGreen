import { Box, Text, Flex, Square, IconButton, Link } from '@chakra-ui/react'
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai'
import { useState } from 'react'
import AddPost from './AddPost'

const Card = (props) => {
  const [isLikeActive, setIsLikeActive] = useState(false)
  const [isDislikeActive, setIsDislikeActive] = useState(false)
  const [isReplyActive, setIsReplyActive] = useState(false)

  return (
    <>
      <Flex border="1px">
        <Box w="80px" bg="gray.100" >
          <Square size="60px" bg="gray.300" mt="5px" ml="10px"> image </Square>
        </Box>
        <Box w="calc(100% - 80px)">
          <Box bg="green.300"> {props.name}, {props.date} </Box>
          <Box h="200" bg="blue.100"> {props.content}</Box>
          <Box bg="red.100">
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
            {isReplyActive ? <AddPost /> : null}
          </Box>
        </Box>
      </Flex>
      <Flex>
        <Box bg="blackAlpha.700" w="30px"></Box>
        <Box w="calc(100% - 30px)">
          {props.comments ? props.comments.map(obj => <Card {...obj} />) : null}
        </Box>
      </Flex>
    </>
  )
}

export default Card
