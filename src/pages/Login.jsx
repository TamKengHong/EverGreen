import { Flex, Button, Heading, Input, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom'

const Login = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading mb={9} alignSelf="center">Log in</Heading>
        <Input
          border="1px"
          borderColor="gray.400"
          placeholder="Email"
          variant="filled"
          mb={3}
          type="email" />
        <Input
          border="1px"
          borderColor="gray.400"
          placeholder="Password"
          variant="filled"
          mb={9}
          type="password" />
        <Button colorScheme="teal" mb={3}>Log in</Button>
        <Button colorScheme="orange" mb={3}>Sign in with Google</Button>
        <Link fontSize="s" >Forgot your password?</Link>
        <Link fontSize="s" as={RouterLink} to='../signup'>Sign Up</Link>
      </Flex>
    </Flex>
  )
}

export default Login
