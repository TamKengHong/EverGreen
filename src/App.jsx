import React from 'react'
import { Box, Text, VStack, Flex, Spacer } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import AppBar from './components/AppBar'
import NewsBar from './components/NewsBar'
import PostBar from './components/PostBar'
import PostRequest from './requests/PostRequest'

// The Home Page.

function App() {
  return (
    <>
      <AppBar />
      <VStack h="95vh" bg="gray.100" alignItems="center">
        <Text fontSize="70" mt="30vh">EverGreen.</Text>
        <Box fontSize="25">
          <Link to='/login'>Login</Link> |{" "}
          <Link to='/signup'>Signup</Link> |{" "}
          <Link to='/stock'>Stocks</Link>
        </Box>
      </VStack>

      <Box h="400px" bg="gray.200" >
        <Text ml="3" mb="5" fontSize="30">Trending News:</Text>
        <NewsBar />
      </Box>
      <Box h="400px" bg="gray.100" >
        <Flex mb="5">
          <Text ml="3" fontSize="30">Trending Posts:</Text>
          <Spacer />
          <Text alignSelf="right" mr="20vw" fontSize="30"> Filter by:</Text>
        </Flex>
        <PostBar />
      </Box>
      <PostRequest />
    </>
  )
}

export default App
