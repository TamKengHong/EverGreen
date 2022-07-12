import { Box, Radio, RadioGroup, Stack, Flex, Text, Spacer } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

const SelectSubreddit = () => {
  const [value, setValue] = useState('1')
  return (
    <Flex
      marginLeft="auto"
      bg="green.600"
      alignItems="center"
      p="3"
      roundedLeft="20"
      color="white"
    >
      <Box mr="5" fontSize="xl">Filter:</Box>
      <RadioGroup onChange={setValue} value={value}>
        <Stack >
          <Radio value='1' colorScheme="red">r/wallstreetbets</Radio>
          <Radio value='2' colorScheme="red">r/stocks</Radio>
          <Radio value='3' colorScheme="red">r/pennystocks</Radio>
        </Stack>
      </RadioGroup>
    </Flex>
  )
}

export default SelectSubreddit
