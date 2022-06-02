import {
  Flex, Button, Heading, Input, Link, Box,
  FormControl, FormErrorMessage
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '../components/AppBar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostRequest from '../requests/PostRequest'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginInfo = { "email": email, "password": password }
  const navigate = useNavigate()

  const isValidEmail = email === '' || email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

  function handleClick() {
    if (!(email === '' || password === '' || !isValidEmail)) {
      navigate(`../user/${email.split("@")[0]}`)
    }
  }

  return (
    <Box h="100%" bg="gray.300">
      <AppBar />
      <Flex h="85vh" alignItems="center" justifyContent="center" >
        <Flex direction="column" bg="gray.100" p={12} rounded={6} boxShadow="lg">
          <Heading mb={9} alignSelf="center">Log in</Heading>
          <FormControl isInvalid={!isValidEmail}>
            <Input
              border="1px"
              borderColor="gray.400"
              placeholder="Email"
              variant="filled"
              type="email"
              onChange={e => setEmail(e.target.value)}
            />
            {!isValidEmail ? <FormErrorMessage>Invalid Email.</FormErrorMessage> : null}
          </FormControl>
          <Input
            border="1px"
            borderColor="gray.400"
            placeholder="Password"
            variant="filled"
            mb={9}
            mt={3}
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button colorScheme="teal" mb={3} onClick={() => handleClick()}>Log in</Button>
          <Link fontSize="s" >Forgot your password?</Link>
          <Link fontSize="s" as={RouterLink} to='../signup'>Sign Up</Link>
        </Flex>
      </Flex>
      <Box h="8.7vh"> </Box>
    </Box>
  )
}

export default Login
