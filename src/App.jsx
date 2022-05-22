import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AppBar from './components/AppBar';

// The Home Page.

//TODO: NewsBar

function App() {
  return (
    <>
      <AppBar />
      <VStack h="500px" bg="gray.100" alignItems="center">
        <Text fontSize="70" mt="150px">EverGreen.</Text>
        <Box>
          <Link to='/login'>Login</Link> |{" "}
          <Link to='/signup'>Signup</Link>
        </Box>
      </VStack>
      {/* <NewsBar/>  should be a component by itself */}

      <Box h="300px" bg="gray.200" >
        <Text ml="3" fontSize="30">Trending News:</Text>
      </Box>

    </>
  );
}

export default App;
