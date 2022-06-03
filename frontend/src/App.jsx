import React from 'react'
import { Box, Text, VStack, Flex, Spacer, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { TickerTape, Timeline } from 'react-tradingview-embed'
import { Link as RouterLink } from 'react-router-dom'
import AppBar from './components/AppBar'
import PostBar from './components/PostBar'
import GetRequest from './requests/GetRequest'
import PostRequest from './requests/PostRequest'

// The Home Page.
const tickerList = [
  { "title": "S&P 500", "proName": "FOREXCOM:SPXUSD" },
  { "title": "Invesco Nasdaq 100 ETF", "proName": "NASDAQ:QQQ" },
  { "title": "Apple Inc.", "proName": "NASDAQ:AAPL" },
  { "title": "Tesla", "proName": "NASDAQ:TSLA" },
  { "title": "Vanguard World ETF", "proName": "AMEX:VT" },
  { "title": "USD/SGD", "proName": "OANDA:USDSGD" }
]

function App() {
  return (
    <>
      <AppBar />
      <Box bg="gray.100" border="1px" borderColor="gray.400">
        <TickerTape widgetProps={{ colorTheme: "light", symbols: tickerList, isTransparent: true }} />
      </Box>
      <VStack h="88vh" bg="gray.100" alignItems="center">
        <Text fontSize="70" mt="28vh">EverGreen🚀</Text>
        <Box fontSize="25">
          <RouterLink to='/login'>Login</RouterLink> |{" "}
          <RouterLink to='/signup'>Signup</RouterLink> |{" "}
          <RouterLink to='/stock/AAPL'>Stocks</RouterLink>
        </Box>
      </VStack>

      <Box bg="gray.200" >
        <Text ml="3" mb="5" fontSize="30">Trending News:</Text>
        <Box margin="auto" w="90%" boxShadow="md">
          <Timeline widgetProps={{ colorTheme: "light", width: "100%", height: "500" }} />
        </Box>
        <Link ml="5%" href={`https://www.tradingview.com/news/`} isExternal>
          More News <ExternalLinkIcon mx="2px" />
        </Link>
        <Box h="10"></Box>
      </Box>
      <Box bg="gray.100" >
        <Flex mb="5">
          <Text ml="3" fontSize="30">Trending Posts:</Text>
          <Spacer />
          <Text alignSelf="right" mr="20vw" fontSize="30"> Filter by:</Text>
        </Flex>
        <PostBar />
        <Box h="10"></Box>
      </Box>
      <PostRequest />
    </>
  )
}

export default App
