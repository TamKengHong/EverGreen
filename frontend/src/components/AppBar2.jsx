import { Box, Flex, Spacer, Center, Link, IconButton, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { BiUserCircle, BiSearch } from 'react-icons/bi'
import { Link as RouterLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'

const AppBar = () => {
  const navigate = useNavigate()
  return (
    <Flex w="100%" alignItems="center" bg="gray.200" >
      <Center w="100px" h="50px" bg="green" color="white">
        <Link as={RouterLink} to='/'> EverGreen </Link>
      </Center>
      <Spacer />
      <Box w="80%" bg="white" rounded="lg" border="1px" borderColor="gray.400">
        <SearchBar />
      </Box>
      <Spacer />
      <IconButton
        onClick={() => navigate('../login')}
        bg="gray.200"
        aria-label="Log in"
        size="lg"
        icon={<BiUserCircle size="35" />}
      />
    </Flex >
  )
}

export default AppBar
