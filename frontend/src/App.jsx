import React from 'react'
import { useEffect } from 'react'
import { Box, Text, Flex, Link, Spacer } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { TickerTape, Timeline } from 'react-tradingview-embed'
import { Link as RouterLink } from 'react-router-dom'
import AppBar from './components/AppBar'
import pineBackground from './assets/pine_tree_fog.jpg'
import woodBackground from './assets/oak_wood_texture.jpg'
import darkWoodBackground from './assets/dark_wood_texture.jpg'
import SentimentAnalysis from './components/Home/SentimentAnalysis'

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
        minH="700px"
        bgImage={pineBackground}
        bgSize="cover">
        <Flex
          h="75vh"
          minH="550px"
          direction="column"
          alignItems="center"
          justifyContent="center">
          <Flex mt="20" p="2" rounded={10} bg="whiteAlpha.700">
            <Text fontSize="70" alignSelf="center">EverGreen🚀</Text>
          </Flex>
          <Flex mt="10" p="4" rounded={10} bg="whiteAlpha.800" maxW="1000px">
            <Text fontSize="xl" alignSelf="center">
              <Box fontSize="2xl" textAlign="center">
                A forest-themed Stock Aggregator website for all your needs.<br /> <br />
              </Box>
              <Text as="u">
                Includes:
              </Text> <br />
              1. <Link as={RouterLink} to='/stock/AAPL'>
                Stock Page containing various information about the stock. (Chart, Indicators, News)
              </Link> <br />
              2. <Link as={RouterLink} to={localStorage.getItem('username') ?
                '/user/' + localStorage.getItem('username') : '/login'}>
                Customise your user page & view other peoples profiles.
              </Link> <br />

              3. Posts & Comments Section where people can discuss about the stock. <br />
              4. Bookmarks, User watchlist & Earnings Calendar. <br />
              5. Sentiment Analysis (scrape websites for number of mentions of a stock ticker).
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Box bgImage={darkWoodBackground} bgSize="auto" >
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
            Upcoming Earnings:
          </Text>
        </Flex>
        <Box h="10"></Box>
      </Box>
    </>
  )
}

export default App
