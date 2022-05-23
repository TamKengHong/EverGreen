import { Flex, Button, Heading, Input, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '../components/AppBar';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState()
  const handleEmail = (e) => setEmail(e.target.value)
  const [password, setPassword] = useState()
  const handlePassword = (e) => setPassword(e.target.value)
  // const handleClick = () => {
  //   "email" : email,
  //   "password" : password,
  // };
  return (
    <>
      <AppBar />
      <Flex height="87vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
          <Heading mb={9} alignSelf="center">Log in</Heading>
          <Input
            border="1px"
            borderColor="gray.400"
            placeholder="Email"
            variant="filled"
            mb={3}
            type="email"
            onChange={handleEmail}
          />
          <Input
            border="1px"
            borderColor="gray.400"
            placeholder="Password"
            variant="filled"
            mb={9}
            type="password"
            onChange={handlePassword}
          />
          <Button colorScheme="teal" mb={3}
            onClick={() => console.log(email + password)}>Log in</Button>
          <Button colorScheme="orange" mb={3}>Sign in with Google</Button>
          <Link fontSize="s" >Forgot your password?</Link>
          <Link fontSize="s" as={RouterLink} to='../signup'>Sign Up</Link>
        </Flex>
      </Flex>
    </>
  )
}

export default Login
