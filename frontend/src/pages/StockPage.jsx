import { SymbolInfo } from 'react-tradingview-embed'
import { useState, useEffect } from 'react'
import { Box, Flex, IconButton, Spacer, Text } from '@chakra-ui/react'
import AppBar from '../components/AppBar'
import { useParams } from 'react-router-dom'
import StockTabs from '../components/Stocks/StockTabs'
import Posts from '../components/Posts/Posts'
import AddPost from '../components/Posts/AddPost'
import background from '../assets/oak_wood_texture.jpg'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'

const Bookmark = () => { // this fixes the whole page rerendering issue.
  // TODO: abstract this out to its own component.
  const { ticker } = useParams()
  // do not remove these parts! will lead to undefined error.
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  let stock = bookmarks.find(x => x.stockTicker === ticker)
  let stockId = stock ? stock.id : null // fixes undefined error.
  const [isBookmarked, setIsBookmarked] = useState(stockId)

  useEffect(() => { // fixed rerendering issue.
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    stock = bookmarks.find(x => x.stockTicker === ticker)
    stockId = stock ? stock.id : null // fixes undefined error.
    setIsBookmarked(stockId)
  }, [ticker])

  function handleClick() {
    const bookmarkUrl = 'https://ever-green-production.herokuapp.com/stockmarket/bookmarks/'
    const obj = {
      "name": localStorage.getItem('username'),
      "stockTicker": ticker
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('key')
      },
      body: JSON.stringify(obj)
    }
    const requestOptions2 = {
      method: 'DELETE',
      headers: { 'Authorization': 'Token ' + localStorage.getItem('key') },
    }
    if (!isBookmarked) {
      fetch(bookmarkUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
          bookmarks.push(data)
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
        })
    } else {
      fetch(bookmarkUrl + stockId + '/', requestOptions2)
        .then(response => response.json())
        .then(data => console.log(data))
        .then(() => localStorage.setItem('bookmarks', JSON.stringify(bookmarks.filter(x => x.id !== stockId))))
    }
  }

  return (
    <Box w="40px" >
      <IconButton
        ml="7px"
        colorScheme="yellow"
        aria-label="Bookmark"
        size="sm"
        icon={!isBookmarked ? <BsBookmark size="28" /> : <BsBookmarkFill size="28" />}
        onClick={() => {
          handleClick()
          setIsBookmarked(!isBookmarked)
        }}
      />
    </Box>
  )
}

const StockPage = () => {
  const { ticker } = useParams()
  return (
    <Box bgImage={background} bgSize="contain" bgPos="center" >
      <AppBar />
      <Box margin="auto" w="95%">
        <Box h="5"></Box>
        <Flex boxShadow="lg" bg="white">
          <Box w="calc(100% - 40px)">
            <SymbolInfo widgetProps={{ symbol: ticker, colorTheme: "light", width: "100%" }} />
          </Box>
          {localStorage.getItem('key') ?
            <Bookmark /> : null}
        </Flex>
      </Box>
      <Box h="10"></Box>
      <StockTabs />
      <Box h="5"></Box>
      <Flex mt="10" mb="5">
        <Text
          p="2"
          bg="green.600"
          roundedRight="20"
          fontSize="4xl"
          color="white"
          boxShadow="xl"
          fontWeight="thin"
        >
          Posts & Comments:
        </Text>
      </Flex>
      {localStorage.getItem('key') ?
        <AddPost /> :
        <Flex >
          <Spacer />
          <Text mb="10" bg="whiteAlpha.700" p="2" rounded="5" fontSize="4xl" color="red">
            ***Please log in to add / view posts & comments.***
          </Text>
          <Spacer />
        </Flex>}
      {localStorage.getItem('key') ? <Posts /> : null}
    </Box>
  )
}

export default StockPage
