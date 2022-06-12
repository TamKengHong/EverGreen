import { SymbolInfo } from 'react-tradingview-embed'
import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import AppBar from '../components/AppBar'
import { useParams } from 'react-router-dom'
import StockTabs from '../components/StockTabs'
import Posts from '../components/Posts'
import background from '../assets/oak_wood_texture.jpg'
import { BiBookmark } from 'react-icons/bi'

const StockPage = () => {
  let { ticker } = useParams()
  return (
    <Box bgImage={background} bgSize="contain" bgPos="center" >
      <AppBar />
      <Box margin="auto" w="95%">
        <Box h="5"></Box>
        <Flex boxShadow="lg" bg="white">
          <Box w="calc(100% - 40px)">
            <SymbolInfo widgetProps={{ symbol: ticker, colorTheme: "light", width: "100%" }} />
          </Box>
          <Box w="40px">
            <IconButton
              ml="7px"
              position="bottom"
              aria-label="Bookmark"
              size="sm"
              icon={<BiBookmark size="30" />}
            />
          </Box>
        </Flex>
      </Box>
      <Box h="10"></Box>
      <StockTabs />
      <Box h="5"></Box>
      <Text fontSize="50" >Posts & Comments Section</Text>
      <Posts />
    </Box>
  )
}

export default StockPage
