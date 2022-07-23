import {
  Box, Flex, Spacer, Link, Input, InputGroup, InputLeftAddon, IconButton
} from '@chakra-ui/react'
import { BiUserCircle, BiSearch } from 'react-icons/bi'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import woodBackground from '../assets/oak_wood_texture.jpg'
import SearchBar from './SearchBar'

const AppBar = () => {
  const navigate = useNavigate()
  return (
    <Flex
      w="100%"
      alignItems="center"
      bgImage={woodBackground}
      bgPos="center"
      boxShadow="lg"
    >
      <Link
        padding="13px"
        roundedRight={5}
        bg="green.700"
        color="white"
        textAlign="center"
        as={RouterLink} to='/'
        display="block"
        _hover={{ backgroundColor: "green.600" }}
      >
        EverGreen
      </Link>
      <Spacer />
      <Box ml="5" mr="5" w="80%" bg="#f4efe7" rounded="lg" border="1px" borderColor="gray.500">
        <SearchBar />
      </Box>
      <Spacer />
      <IconButton
        onClick={() => localStorage.getItem('username') ?
          navigate('../user/' + localStorage.getItem('username')) : navigate('../login')}
        bg="None"
        aria-label="Log in"
        size="lg"
        icon={<BiUserCircle size="35" />}
        _hover={{ backgroundColor: "whiteAlpha.500" }}
      />
    </Flex >
  )
}

export default AppBar
