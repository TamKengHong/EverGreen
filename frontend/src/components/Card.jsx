import { VStack, Box, Text, Flex, Square, IconButton } from '@chakra-ui/react'
import { BiLike, BiDislike } from 'react-icons/bi'

const Card = (props) => {
  return (
    <Flex border="1px">
      <Box w="80px" bg="gray.100" >
        <Square size="60px" bg="gray.300" mt="5px" ml="10px"> {props.image}</Square>
      </Box>
      <Box w="calc(100% - 80px)">
        <Box bg="green.300"> {props.username}, {props.date} </Box>
        <Box h="200" bg="blue.100"> {props.text}</Box>
        <Box bg="red.100">
          {props.likes}
          <IconButton
            bg="None"
            aria-label="Log in"
            size="sm"
            icon={<BiLike size="22" />}
          />
          {props.dislikes}
          <IconButton
            bg="None"
            aria-label="Log in"
            size="sm"
            icon={<BiDislike size="22" />}
          />
          Reply</Box>
      </Box>
    </Flex>
  )
}

export default Card
