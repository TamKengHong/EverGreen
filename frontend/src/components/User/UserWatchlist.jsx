import {
  Box, Table, Thead, Tbody, Tr, Th, Td,
  TableCaption, TableContainer, Link, Text
} from '@chakra-ui/react'
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

const WatchlistElement = (props) => {
  const ticker = props?.stockTicker
  const stocksData = props.stocksData
  const isLimitExceeded = stocksData?.message === 'Limit Exceeded'
  // prevents undefined errors when rate limit exceeded
  const price = stocksData?.quoteResponse?.result[props.no]?.regularMarketPrice
  const priceChange = stocksData?.quoteResponse?.result[props.no]?.regularMarketChange
  const pricePercentChange = stocksData?.quoteResponse?.result[props.no]?.regularMarketChangePercent
  const averageAnalystRating = stocksData?.quoteResponse?.result[props.no]?.averageAnalystRating
  const analystScore = Number.parseFloat(averageAnalystRating)

  const priceBgColor = priceChange > 0 && props.no % 2 === 0 ? colors.greenBgLight
    : priceChange > 0 && props.no % 2 === 1 ? colors.greenBgDark
      : priceChange <= 0 && props.no % 2 === 0 ? colors.redBgLight
        : colors.redBgDark

  const analystBgColor = analystScore < 3 && props.no % 2 === 0 ? colors.greenBgLight
    : analystScore < 3 && props.no % 2 === 1 ? colors.greenBgDark
      : analystScore >= 3 && props.no % 2 === 0 ? colors.redBgLight
        : colors.redBgDark

  const woodenBg = props.no % 2 === 0 ? colors.woodBgLight : colors.woodBgDark

  return (
    <Tr bg={woodenBg} border="1px" borderColor="gray.400">
      <Td>
        {props.no + 1 + '. '}
        <Link
          as={RouterLink}
          to={'/stock/' + props.stockTicker}
          onClick={() => window.scrollTo(0, 0)}
        >
          {props.stockTicker}
        </Link>
      </Td>
      <Td border="1px" borderColor="gray.400">
        {isLimitExceeded ? "API limit exceeded" : price}
      </Td>
      <Td bg={isLimitExceeded ? woodenBg : priceBgColor} border="1px" borderColor="gray.400">
        {isLimitExceeded ? "API limit exceeded" :
          <Text textColor={priceChange > 0 ? "green.500" : colors.redText}>
            {priceChange > 0 ? "+" : null}
            {Math.round(priceChange * 100) / 100 + " ("}
            {pricePercentChange > 0 ? "+" : null}
            {Math.round(pricePercentChange * 100) / 100 + "%)"}
          </Text>
        }
      </Td>
      <Td bg={analystScore ? analystBgColor : woodenBg} border="1px" borderColor="gray.400" >
        <Link href={"https://finance.yahoo.com/quote/" + ticker + "/analysis?p=" + ticker}
          textColor={analystScore < 3 ? "green.500" : colors.redText}
        >
          {isLimitExceeded ? <Link textColor="black"> API limit exceeded </Link> :
            averageAnalystRating ? averageAnalystRating : <Link textColor="black">No Rating</Link>
          }
        </Link>
      </Td>
    </Tr>
  )
}

const UserWatchlist = (props) => {
  const bookmarks = props?.bookmarks?.sort((a, b) => a.id - b.id)

  return (
    <Box w="95%" margin="auto">
      <TableContainer bg="gray.50" >
        <Table
          variant="unstyled"
          sx={{ borderCollapse: 'collapse' }}
          border="1px"
          borderColor="gray.400"
        >
          <TableCaption fontSize="xl">
            {props.username + "'s watchlist"}
          </TableCaption>
          <Thead bg={colors.woodBgHeader}>
            <Tr>
              <Th>Stock Ticker</Th>
              <Th>Price (USD)</Th>
              <Th>% change (24h)</Th>
              <Th> Average Analyst Rating (1 - 5) </Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookmarks ? bookmarks.map((x, i) => <WatchlistElement
              key={i}
              no={i}
              {...x}
              stocksData={props.stocksData} />)
              : null}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default UserWatchlist
