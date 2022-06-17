import { Box, Center, VStack, Link, Text, Flex, Spacer } from '@chakra-ui/react'
import pineBackground from '../assets/pine_tree_fog.jpg'

const Test = () => {
  return (
    <>
      <VStack h="88vh" bgImage={pineBackground} bgSize="cover" alignItems="center">
        <Text fontSize="70" mt="28vh" bg="whiteAlpha.500">EverGreen🚀</Text>
        <Box fontSize="25" bg="whiteAlpha.500">
          <Link to='/login'>Login</Link> |{" "}
          <Link to='/signup'>Signup</Link> |{" "}
          <Link to='/stock/AAPL'>Stocks</Link>
        </Box>
      </VStack>
      <Flex alignItems="center" justifyContent="center">
        <Flex bg="gray.200" direction="column">
          <Text fontSize="70" alignSelf="center">EverGreen🚀</Text>
          <Flex fontSize="25" bg="whiteAlpha.500" alignItems="center" justifyContent="center">
            <Link mr="2" to='/login'>Login</Link>  |{" "}
            <Link ml="2" mr="2" to='/signup'>Signup</Link> |{" "}
            <Link ml="2" to='/stock/AAPL'>Stocks</Link>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default Test
