import React from 'react'
import { useEffect } from 'react'
import { Box, Text, Flex, Link, Spacer } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { TickerTape, Timeline } from 'react-tradingview-embed'
import { Link as RouterLink } from 'react-router-dom'
import AppBar from './components/AppBar'
import PostBar from './components/PostBar'
import pineBackground from './assets/pine_tree_fog.jpg'
import woodBackground from './assets/oak_wood_texture.jpg'
import darkWoodBackground from './assets/dark_wood_texture.jpg'
import SentimentAnalysis from './components/Home/SentimentAnalysis'
import SelectSubreddit from './components/Home/SelectSubreddit'

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
  useEffect(() => { // pings the server once to stop heroku from being slow at startup.  
    fetch('https://ever-green-production.herokuapp.com/stockmarket/users/', { method: 'GET' })
      .then(res => res.json)
      .then(data => console.log(data))
  }, [])

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
        <Flex mb="5">
          <Text
            p="2"
            bg="green.600"
            roundedRight="20"
            fontSize="4xl"
            color="white"
            boxShadow="xl"
            fontWeight="thin">
            Trending News:
          </Text>
        </Flex>
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
          <Text
            p="2"
            bg="green.600"
            roundedRight="20"
            fontSize="4xl"
            color="white"
            boxShadow="xl"
            fontWeight="thin">
            Trending Stocks:
          </Text>
          <Spacer />
          <SelectSubreddit />
        </Flex>
        <SentimentAnalysis />
        <Box h="10"></Box>
      </Box>
      <Box bgImage={woodBackground} bgSize="cover" >
        <Flex mb="5">
          <Text
            p="2"
            bg="green.600"
            roundedRight="20"
            fontSize="4xl"
            color="white"
            boxShadow="xl"
            fontWeight="thin">
            Upcoming Earnings:
          </Text>
        </Flex>
        <Box h="10"></Box>
      </Box>
    </>
  )
}

export default App
