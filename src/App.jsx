import React from 'react';
import { Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AppBar from './components/AppBar';

// The Home Page.

//TODO: NewsBar

function App() {
  return (
    <>
      <AppBar />
      <Center w="100%" h="500px" bg="gray.100" fontSize={70}>
        EverGreen.
      </Center>
      {/* <NewsBar/>  should be a component by itself */}

      <Link to='/login'>Login</Link> |{" "}
      <Link to='/signup'>Signup</Link>
    </>
  );
}

export default App;
