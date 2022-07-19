import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Spacer,
  TableCaption, TableContainer, Link, Button, Text
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const colors = {
  greenText: "#22ab94",
  redText: "red.400",
  greenBgDark: "#d7ffe1",
  greenBgLight: "#f0fff4",
  redBgDark: "#ffdcdc",
  redBgLight: "red.50",
  woodBgHeader: "#d9c09e",
  woodBgDark: "#eee3d4",
  woodBgLight: "#f5efe6"
}

const TableRow = (props) => {
  const woodenBg = props.no % 2 === 0 ? colors.woodBgLight : colors.woodBgDark
  const change = props.change_in_number_of_mentions
  const percentChange = props.percentage_change_in_number_of_mentions
  const changeBgColor = change === 0 ? woodenBg
    : change > 0 && props.no % 2 === 0 ? colors.greenBgLight
      : change > 0 && props.no % 2 === 1 ? colors.greenBgDark
        : change <= 0 && props.no % 2 === 0 ? colors.redBgLight
          : colors.redBgDark
  const changeTextColor = change === 0 ? "black" : change > 0 ? colors.greenText : colors.redText

  return (
    <Tr bg={woodenBg} border="1px" borderColor="gray.400">
      <Td textAlign="center">
        {props.no + 1 + '. '}
      </Td>
      <Td border="1px" borderColor="gray.400" textAlign="center">
        <Link
          as={RouterLink}
          to={'/stock/' + props.ticker}
          onClick={() => window.scrollTo(0, 0)}
        >
          {props.ticker}
        </Link>
      </Td>
      <Td border="1px" borderColor="gray.400" textAlign="center">
        {props.mentions}
      </Td>
      <Td bg={changeBgColor} border="1px" borderColor="gray.400" textAlign="center">
        <Text textColor={changeTextColor} >
          {change > 0 ? "+" : null}
          {change + " ("}
          {percentChange > 0 ? "+" : null}
          {percentChange + "%)"}
        </Text>
      </Td>
    </Tr >
  )
}

const SentimentAnalysisTable = (props) => {
  const [stocksData, setStocksData] = useState('')
  const [displayStocks, setDisplayStocks] = useState(stocksData)
  const [counter, setCounter] = useState(1)

  useEffect(() => {
    const url = 'https://ever-green-production.herokuapp.com/stockmarket/scrape/?search=' + props.selection
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Token ' + localStorage.getItem('key') }
    }
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => setStocksData(data[0].packagedData))
    setCounter(1)
  }, [props.selection])

  useEffect(() => {
    setDisplayStocks(stocksData.slice(0, 10 * counter))
  }, [stocksData, counter])

  return (
    <Box w="90%" margin="auto">
      <TableContainer bg="gray.50" >
        <Table
          variant="unstyled"
          sx={{ borderCollapse: 'collapse' }}
          border="1px"
          borderColor="gray.400"
        >
          <TableCaption fontSize="xl">
            Sentiment Analysis
          </TableCaption>
          <Thead bg={colors.woodBgHeader}>
            <Tr>
              <Th textAlign="center">No.</Th>
              <Th textAlign="center">Stock Ticker</Th>
              <Th textAlign="center">Number of Mentions (Past 24h)</Th>
              <Th textAlign="center">Change (Past 1h)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayStocks ? displayStocks.map((x, i) => <TableRow
              key={i}
              no={i}
              {...x}
            />)
              : null}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex bg="gray.100" alignItems="center">
        <Spacer />
        <>
          <Text>{Math.min(counter * 10, stocksData.length)} {" / "} {stocksData.length} items</Text>
          <Button
            size="lg"
            m="3"
            onClick={() => setCounter(counter + 1)}
            colorScheme="orange"
          >
            Load more
          </Button>
        </>
      </Flex>
    </Box>
  )
}

export default SentimentAnalysisTable
