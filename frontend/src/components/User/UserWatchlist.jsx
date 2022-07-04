import {
  Box, Table, Thead, Tbody, Tr, Th, Td,
  TableCaption, TableContainer,
} from '@chakra-ui/react'

const WatchlistElement = (props) => {
  return (
    <Tr>
      <Td>{props.no + 1}</Td>
      <Td>{props.stockTicker}</Td>
      <Td>XX.XXX</Td>
      <Td isNumeric>X.XX%</Td>
    </Tr>
  )
}

const UserWatchlist = (props) => {
  const bookmarks = props.bookmarks
  return (
    <Box w="95%" margin="auto">
      <TableContainer bg="gray.50" border="1px">
        <Table variant='striped'>
          <TableCaption>{props.username + "'s watchlist"}</TableCaption>
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Stock Ticker</Th>
              <Th> Price </Th>
              <Th isNumeric>% change (24h)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookmarks ? bookmarks.map((x, i) => <WatchlistElement key={i} no={i} {...x} />) : null}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default UserWatchlist
