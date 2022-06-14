import { SymbolInfo } from 'react-tradingview-embed'
import { useState } from 'react'
import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import AppBar from '../components/AppBar'
import { useParams } from 'react-router-dom'
import StockTabs from '../components/Stocks/StockTabs'
import Posts from '../components/Posts/Posts'
import AddPost from '../components/Posts/AddPost'
import background from '../assets/oak_wood_texture.jpg'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'

const StockPage = () => {

  // function getRequest() {
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: { 'Authorization': 'Token ' + "ecc0d3db5ace35df3e1d32f0ba80ff85e81a0832" }
  //   }
  //   fetch('https://ever-green-production.herokuapp.com/stockmarket/posts/', requestOptions)
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  // }

  const { ticker } = useParams()
  const [isBookmarked, setIsBookmarked] = useState(false)
  return (
    <Box bgImage={background} bgSize="contain" bgPos="center" >
      <AppBar />
      <Box margin="auto" w="95%">
        <Box h="5"></Box>
        <Flex boxShadow="lg" bg="white">
          <Box w="calc(100% - 40px)">
            <SymbolInfo widgetProps={{ symbol: ticker, colorTheme: "light", width: "100%" }} />
          </Box>
          <Box w="40px" >
            <IconButton
              ml="7px"
              colorScheme="yellow"
              aria-label="Bookmark"
              size="sm"
              icon={!isBookmarked ? <BsBookmark size="28" /> : <BsBookmarkFill size="28" />}
              onClick={() => setIsBookmarked(!isBookmarked)}
            />
          </Box>
        </Flex>
      </Box>
      <Box h="10"></Box>
      <StockTabs />
      <Box h="5"></Box>
      <Text fontSize="50" >Posts & Comments Section</Text>
      <AddPost />
      <Posts />
    </Box>
  )
}

export default StockPage
