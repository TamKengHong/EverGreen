import { Flex, Button, Heading, Input, Link, Box } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '../components/AppBar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const obj = { "email": email, "password": password } // for http requests next time.
  const navigate = useNavigate()


  return (
    <Box height="100%" bg="gray.300">
      <AppBar />
      <Flex height="85vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
          <Heading mb={9} alignSelf="center">Log in</Heading>
          <Input
            border="1px"
            borderColor="gray.400"
            placeholder="Email"
            variant="filled"
            mb={3}
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            border="1px"
            borderColor="gray.400"
            placeholder="Password"
            variant="filled"
            mb={9}
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button colorScheme="teal" mb={3}
            onClick={() => navigate('../user', { state: { name: email } })}>Log in</Button>
          <Link fontSize="s" >Forgot your password?</Link>
          <Link fontSize="s" as={RouterLink} to='../signup'>Sign Up</Link>
        </Flex>
      </Flex>
      <Box h="8.7vh"> </Box>
    </Box>
  )
}

export default Login
