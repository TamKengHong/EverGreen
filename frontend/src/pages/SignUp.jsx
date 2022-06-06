import {
  Flex, Button, Heading, Input, Link, Box,
  FormControl, FormErrorMessage
} from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import AppBar from '../components/AppBar'
import { useState } from 'react'
import pineBackground from '../assets/pine_tree_fog.jpg'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const obj = { "email": email, "Password": password, "confirmPassword": confirmPassword }
  const navigate = useNavigate()

  const isValidEmail = email === '' || email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

  const pwMismatch = password !== confirmPassword
  const pwTooShort = confirmPassword !== '' && confirmPassword.length < 8
  const pwError = pwMismatch || pwTooShort

  function handleClick() {
    if (!(pwError || !isValidEmail || email === '||' || password === '' || confirmPassword === '' || username === '')) {
      navigate(-1)
    }
  }

  return (
    <Box h="100%" bgImage={pineBackground} bgSize="100% 100%">
      <AppBar />
      <Flex h="85vh" alignItems="center" justifyContent="center">
        <Flex direction="column" bg="gray.100" p={12} rounded={6} boxShadow="lg">
          <Heading alignSelf="center" mb={9}>Sign Up</Heading>
          <Input
            border="1px"
            borderColor="gray.400"
            placeholder="Username"
            variant="filled"
            mb={3}
            type="text"
            onChange={e => setUsername(e.target.value)}
          />
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
            mb={3}
            mt={3}
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <FormControl isInvalid={pwError}>
            <Input
              border="1px"
              borderColor="gray.400"
              placeholder="Confirm Password"
              variant="filled"
              type="password"
              onChange={e => setConfirmPassword(e.target.value)}
            />
            {pwMismatch ? <FormErrorMessage>Password Mismatch.</FormErrorMessage>
              : pwTooShort ? <FormErrorMessage>Password must be at least 8 characters. </FormErrorMessage>
                : null
            }
          </FormControl>
          <Button colorScheme="blue" mb={3} mt={6}
            onClick={() => handleClick()}>Sign Up</Button>
          <Link fontSize="s" as={RouterLink} to='../login'>Back</Link>
        </Flex>
      </Flex>
      <Box h="8.7vh"></Box>
    </Box>
  )
}

export default SignUp
