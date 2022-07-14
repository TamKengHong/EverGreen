import { Box, Radio, RadioGroup, Stack, Flex } from '@chakra-ui/react'

const SelectSubreddit = (props) => {
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
      <RadioGroup onChange={props.onSelectionChange} value={props.selection}>
        <Stack >
          <Radio value='wallstreetbets' colorScheme="red">r/wallstreetbets</Radio>
          <Radio value='stocks' colorScheme="red">r/stocks</Radio>
          <Radio value='pennystocks' colorScheme="red">r/pennystocks</Radio>
        </Stack>
      </RadioGroup>
    </Flex>
  )
}

export default SelectSubreddit
