import {
  Flex, Button, Heading, Input, Link, Box,
  FormControl, FormErrorMessage, Alert, AlertIcon,
  AlertDescription
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
  const [requestData, setRequestData] = useState('')
  const obj = {
    "username": username, "email": email,
    "password1": password, "password2": confirmPassword
  }
  const navigate = useNavigate()

  const isValidEmail = email === '' || email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  const pwMismatch = password !== confirmPassword
  const pwTooShort = confirmPassword !== '' && confirmPassword.length < 8
  const pwError = pwMismatch || pwTooShort
  const fieldsEmpty = email === '' || password === '' || confirmPassword === '' || username === ''

  const firstKey = Object.keys(requestData)[0]
  const errorMessage = firstKey === "key" ? null : requestData[firstKey]

  if (requestData.key) { navigate('../login') }

  function handleClick() {
    if (!(pwError || !isValidEmail || fieldsEmpty)) {
      PostRequest(obj)
    }
  }

  function PostRequest(info) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
    }
    fetch('https://ever-green-production.herokuapp.com/dj-rest-auth/registration/', requestOptions)
      .then(response => response.json())
      .then(data => setRequestData(data))
  }

  return (
    <Box h="100%" bgImage={pineBackground} bgSize="cover">
      <AppBar />
      <Flex h="85vh" alignItems="center" justifyContent="center">
        <Flex direction="column" bg="rgba(237,242,247,0.8)" p={12} rounded={6} boxShadow="lg">
          <Heading alignSelf="center" mb={9}>Sign Up</Heading>
          <Input
            border="1px"
            borderColor="gray.400"
            placeholder="Username"
            mb={3}
            type="text"
            variant="filled"
            onChange={e => setUsername(e.target.value)}
          />
          <FormControl isInvalid={!isValidEmail}>
            <Input
              border="1px"
              borderColor="gray.400"
              placeholder="Email"
              type="email"
              variant="filled"
              onChange={e => setEmail(e.target.value)}
            />
            {!isValidEmail ? <FormErrorMessage>Invalid Email.</FormErrorMessage> : null}
          </FormControl>
          <Input
            border="1px"
            borderColor="gray.400"
            placeholder="Password"
            mb={3}
            mt={3}
            type="password"
            variant="filled"
            onChange={e => setPassword(e.target.value)}
          />
          <FormControl isInvalid={pwError}>
            <Input
              border="1px"
              borderColor="gray.400"
              placeholder="Confirm Password"
              type="password"
              variant="filled"
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
      {errorMessage ? (
        <Alert status="error" h="8.7vh">
          <AlertIcon />
          <AlertDescription> {String(errorMessage).replace("CustomUser", "User")}  </AlertDescription>
        </Alert>
      ) : <Box h="8.7vh"></Box>}
    </Box>
  )
}

export default SignUp
