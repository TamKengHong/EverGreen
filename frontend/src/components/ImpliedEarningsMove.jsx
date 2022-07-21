import {
  InputGroup, Input, InputLeftAddon, Text, Flex, Spinner
} from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'
import { useState } from 'react'

const ImpliedEarningsMove = () => {
  const [stock, setStock] = useState("")
  const [stockDisplay, setStockDisplay] = useState("-")
  const [loading, setLoading] = useState(false)
  const [impliedEarningsMove, setImpliedEarningsMove] = useState(0)

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      const url = 'https://ever-green-production.herokuapp.com/stockmarket/earningsmove/'
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': 'Token ' + localStorage.getItem('key'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ "stock": stock })
      }
      setLoading(true)
      setStockDisplay(stock)
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => setImpliedEarningsMove(data.implied_earnings_move))
        .then(() => setLoading(false))
    }
  }
  return (
    <Flex direction="column" bg="rgba(237,242,247,0.95)" p="5" rounded="10" boxshadow="2xl"
      m="auto" w="90%" mb="10" mt="50px" justifycontent="center" alignitems="center">
      <Text fontSize="xl" mb="5">Calculate Implied Earnings Move:</Text>
      <Flex>
        <InputGroup size='lg'>
          <InputLeftAddon
            border="1px"
            borderColor="gray.400"
            bgColor="#dccbb3"
            children={<BiSearch size="20" />}
          />
          <Input
            border="1px"
            borderColor="gray.400"
            placeholder='Search Stock'
            bgColor="#f4efe7"
            mr={5}
            onChange={e => { setStock(e.target.value) }}
            onKeyPress={e => handleKeyPress(e)}
          />
        </InputGroup>
        {loading ? <Spinner /> :
          <Text whiteSpace="pre-wrap" w="320px">
            {"Stock: " + stockDisplay + "\nImplied Earnings Move: (" + impliedEarningsMove + "%)"}
          </Text>
        }
      </Flex >
    </Flex>
  )
}

export default ImpliedEarningsMove
