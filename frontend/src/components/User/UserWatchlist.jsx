import {
  Box, Table, Thead, Tbody, Tr, Th, Td,
  TableCaption, TableContainer, Link, Text
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const WatchlistElement = (props) => {
  const stocksData = props.stocksData
  const isLimitExceeded = stocksData.message === 'Limit Exceeded'
  // prevents undefined errors when rate limit exceeded
  const price = stocksData && stocksData.quoteResponse ?
    stocksData.quoteResponse.result[props.no].regularMarketPrice : null
  const priceChange = stocksData && stocksData.quoteResponse ?
    stocksData.quoteResponse.result[props.no].regularMarketChange : null
  return (
    <Tr>
      <Td>{props.no + 1}</Td>
      <Td>
        <Link
          as={RouterLink}
          to={'/stock/' + props.stockTicker}
          onClick={() => window.scrollTo(0, 0)}
        >
          {props.stockTicker}
        </Link>
      </Td>
      <Td>
        {isLimitExceeded ? "API limit exceeded" : price}
      </Td>
      <Td isNumeric>
        {isLimitExceeded ? "API limit exceeded" : null}
        <Text textColor={priceChange > 0 ? '#22ab94' : 'red.100'} > {priceChange}</Text>
      </Td>
    </Tr>
  )
}

const UserWatchlist = (props) => {
  const bookmarks = props.bookmarks
  const [stocksData, setStocksData] = useState()

  //For now, the request only works for <= 10 tickers. Will add more functionality soon.
  const tickerString = props.bookmarks ?
    props.bookmarks.reduce((a, b) => a + "%2C" + b.stockTicker, "").substring(3) : null
  console.log(tickerString)
  useEffect(() => {
    const url = 'https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=' + tickerString
    const requestOptions = { // 100 reqs a day limit
      method: 'GET',
      headers: { 'x-api-key': 'Vuw1uVBtM73adi1nrJDTZjXETzt9YvU9f162gi6g' }
    }
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => setStocksData(data))
  }, [])
  console.log(stocksData)

  return (
    <Box w="95%" margin="auto">
      <TableContainer bg="gray.50" border="1px">
        <Table variant='striped'>
          <TableCaption>{props.username + "'s watchlist"}</TableCaption>
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Stock Ticker</Th>
              <Th>Price (USD)</Th>
              <Th isNumeric>% change (24h)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookmarks ? bookmarks.map((x, i) => <WatchlistElement
              key={i}
              no={i}
              {...x}
              stocksData={stocksData} />)
              : null}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default UserWatchlist
