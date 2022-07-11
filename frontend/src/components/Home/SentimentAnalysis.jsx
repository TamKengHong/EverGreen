import {
  Box, Table, Thead, Tbody, Tr, Th, Td,
  TableCaption, TableContainer, Link, Text
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
      <Td border="1px" borderColor="gray.400" textAlign="center">
        -
      </Td>
    </Tr>
  )
}

const SentimentAnalysis = () => {
  const [stocksData, setStocksData] = useState('')

  useEffect(() => {
    const url = 'https://ever-green-production.herokuapp.com/stockmarket/scrape/'
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Token ' + localStorage.getItem('key') }
    }
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => setStocksData(data[0].packagedData.slice(0, 20)))
  }, [])
  console.log(stocksData)


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
            {stocksData ? stocksData.map((x, i) => <TableRow
              key={i}
              no={i}
              {...x}
            />)
              : null}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default SentimentAnalysis
