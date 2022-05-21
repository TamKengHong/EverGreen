import { Flex, Button, Heading, Input, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom'

const SignUp = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading alignSelf="center" mb={9}>Sign Up</Heading>
        <Input
          border="1px"
          borderColor="gray.400"
          placeholder="New Email"
          variant="filled"
          mb={3}
          type="email" />
        <Input
          border="1px"
          borderColor="gray.400"
          placeholder="New Password"
          variant="filled"
          mb={3}
          type="password" />
        <Input
          border="1px"
          borderColor="gray.400"
          placeholder="Confirm Password"
          variant="filled"
          mb={9}
          type="password" />
        <Button colorScheme="blue" mb={3}>Sign Up</Button>
        <Link fontSize="s" as={RouterLink} to='../login'>Back</Link>
      </Flex>
    </Flex>
  )
}

export default SignUp
