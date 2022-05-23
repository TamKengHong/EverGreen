import { Flex, Button, Heading, Input, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '../components/AppBar';
import { useState } from 'react';

const SignUp = () => {
  const [email, setEmail] = useState()
  const handleEmail = (e) => setEmail(e.target.value)
  const [newPassword, setNewPassword] = useState()
  const handleNewPassword = (e) => setNewPassword(e.target.value)
  const [confirmPassword, setConfirmPassword] = useState()
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value)
  return (
    <>
      <AppBar />
      <Flex height="85vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
          <Heading alignSelf="center" mb={9}>Sign Up</Heading>
          <Input
            border="1px"
            borderColor="gray.400"
            placeholder="New Email"
            variant="filled"
            mb={3}
            type="email"
            onChange={handleEmail}
          />
          <Input
            border="1px"
            borderColor="gray.400"
            placeholder="New Password"
            variant="filled"
            mb={3}
            type="password"
            onChange={handleNewPassword}
          />
          <Input
            border="1px"
            borderColor="gray.400"
            placeholder="Confirm Password"
            variant="filled"
            mb={9}
            type="password"
            onChange={handleConfirmPassword}
          />
          <Button colorScheme="blue" mb={3}
            onClick={() => console.log(email + newPassword + confirmPassword)}>Sign Up</Button>
          <Link fontSize="s" as={RouterLink} to='../login'>Back</Link>
        </Flex>
      </Flex>
    </>
  )
}

export default SignUp
