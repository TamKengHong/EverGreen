import {
  Flex, Spacer, Center, Link, Input, InputGroup, InputLeftAddon
} from '@chakra-ui/react';
import { BiUserCircle, BiSearch } from 'react-icons/bi'
import { Link as RouterLink } from 'react-router-dom';


const SearchBar = () => {

  return (
    <InputGroup size='lg' w="75%" >
      <InputLeftAddon
        border="1px"
        borderColor="gray.400"
        ml={5}
        children={<BiSearch size="20" />}
      />
      <Input
        border="1px"
        borderColor="gray.400"
        placeholder='Search'
        bg="white"
        mr={5}
      />
    </InputGroup>
  )

}

const AppBar = () => {
  return (
    <Flex w="100%" alignItems="center" position="static" bg="gray.200" >
      <Center w="100px" h="50px" bg="green" color="white">
        <Link as={RouterLink} to='/'>
          EverGreen
        </Link>
      </Center>
      <Spacer />
      <SearchBar />
      <Spacer />
      <BiUserCircle size="50" />
    </Flex>
  )
}

export default AppBar
