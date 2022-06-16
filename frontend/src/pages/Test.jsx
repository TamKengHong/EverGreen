import { Box, Center, VStack, Link, Text, Flex } from '@chakra-ui/react'
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
      {/* <Center> */}
      {/*   <Flex bg="gray.200" h="600" alignItems="center"> */}
      {/*     <Box mt="200"> */}
      {/*       <Text fontSize="70">Hello 1st text</Text> */}
      {/*     </Box> */}
      {/*     <Box> */}
      {/*       <Text fontSize="70">Hello 2nd text ajosd</Text> */}
      {/*     </Box> */}
      {/*   </Flex> */}
      {/* </Center> */}
    </>
  )
}

export default Test
