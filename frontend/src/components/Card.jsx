import { Box, Text, Flex, Square, IconButton, Link } from '@chakra-ui/react'
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai'
import { useState } from 'react'

const Card = (props) => {
  let [isLikeActive, setIsLikeActive] = useState(false)
  let [isDislikeActive, setIsDislikeActive] = useState(false)

  return (
    <>
      <Flex border="1px">
        <Box w="80px" bg="gray.100" >
          <Square size="60px" bg="gray.300" mt="5px" ml="10px"> {props.image}</Square>
        </Box>
        <Box w="calc(100% - 80px)">
          <Box bg="green.300"> {props.username}, {props.date} </Box>
          <Box h="200" bg="blue.100"> {props.text}</Box>
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
            <Link>Reply</Link>
          </Box>
        </Box>
      </Flex>
      <Flex>
        <Box bg="blackAlpha.700" w="30px"></Box>
        <Box w="calc(100% - 30px)">
          {props.children ? props.children.map(obj => <Card {...obj} />) : null}
        </Box>
      </Flex>
    </>
  )
}

export default Card
