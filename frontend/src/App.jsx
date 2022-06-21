import React from 'react'
import { Box, Text, VStack, Flex, Spacer, Link, Center } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { TickerTape, Timeline } from 'react-tradingview-embed'
import { Link as RouterLink } from 'react-router-dom'
import AppBar from './components/AppBar'
import PostBar from './components/PostBar'
import pineBackground from './assets/pine_tree_fog.jpg'
import woodBackground from './assets/oak_wood_texture.jpg'
import darkWoodBackground from './assets/dark_wood_texture.jpg'

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
      <Box bg="#f3efe8" border="1px" borderColor="gray.400">
        <TickerTape widgetProps={{ colorTheme: "light", symbols: tickerList, isTransparent: true }} />
      </Box>
      <Box
        h="88vh"
        bgImage={pineBackground}
        bgSize="cover">
        <Flex
          h="75vh"
          alignItems="center"
          justifyContent="center">
          <Flex p="2" rounded={10} bg="whiteAlpha.500" direction="column">
            <Text fontSize="70" alignSelf="center">EverGreen🚀</Text>
            <Flex fontSize="25" alignItems="center" justifyContent="center">
              <Box mr="2">
                <RouterLink to='/login'>Login</RouterLink>  |{" "}
              </Box>
              <Box mr="2">

                <RouterLink ml="2" mr="2" to='/signup'>Signup</RouterLink> |{" "}
              </Box>
              <RouterLink ml="2" to='/stock/AAPL'>Stocks</RouterLink>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <Box bgImage={woodBackground} bgSize="cover" >
        <Text ml="3" mb="5" fontSize="30">Trending News:</Text>
        <Box margin="auto" w="90%" boxShadow="md">
          <Timeline widgetProps={{ colorTheme: "light", width: "100%", height: "500" }} />
        </Box>
        <Link ml="5%" href={`https://www.tradingview.com/news/`} isExternal>
          More News <ExternalLinkIcon mx="2px" />
        </Link>
        <Box h="10"></Box>
      </Box>
      <Box bgImage={darkWoodBackground} bgSize="cover" >
        <Flex mb="5">
          <Text ml="3" fontSize="30" color="gray.50">Trending Posts:</Text>
          <Spacer />
          <Text alignSelf="right" mr="20vw" color="gray.50" fontSize="30"> Filter by:</Text>
        </Flex>
        <PostBar />
        <Box h="10"></Box>
      </Box>
    </>
  )
}

export default App
