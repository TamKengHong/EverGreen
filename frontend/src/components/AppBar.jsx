import {
  Box, Flex, Spacer, Center, Link, Input, InputGroup, InputLeftAddon, IconButton
} from '@chakra-ui/react'
import { BiUserCircle, BiSearch } from 'react-icons/bi'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import woodBackground from '../assets/oak_wood_texture.jpg'


const SearchBar = () => {
  const navigate = useNavigate()
  const [ticker, setTicker] = useState()
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      navigate(`/stock/${ticker.toUpperCase()}`)
    }
  }
  return (
    <InputGroup size='lg' w="85%" >
      <InputLeftAddon
        border="1px"
        borderColor="gray.400"
        bgColor="#dccbb3"
        ml={5}
        children={<BiSearch size="20" />}
      />
      <Input
        border="1px"
        borderColor="gray.400"
        placeholder='Search Ticker'
        bgColor="#f4efe7"
        mr={5}
        onChange={e => { setTicker(e.target.value) }}
        onKeyPress={e => handleKeyPress(e)}
      />
    </InputGroup>
  )
}

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
      <SearchBar />
      <Spacer />
      <IconButton
        onClick={() => navigate('../login')}
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
