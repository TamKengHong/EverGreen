import { Box, Radio, RadioGroup, Stack, Flex, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

const SelectSubreddit = () => {
  const [value, setValue] = useState('1')
  return (
    <Flex bg="green.600" alignItems="center" pl="5" pr="5" roundedLeft="20">
      <RadioGroup onChange={setValue} value={value}>
        <Stack direction='row' color="white">
          <Text fontSize="xl">Filter:</Text>
          <Radio value='1' colorScheme="red">r/wallstreetbets</Radio>
          <Radio value='2' colorScheme="red">r/stocks</Radio>
          <Radio value='3' colorScheme="red">r/pennystocks</Radio>
        </Stack>
      </RadioGroup>
    </Flex>
  )
}

export default SelectSubreddit
