import { SymbolInfo } from 'react-tradingview-embed'
import { Box, Text } from '@chakra-ui/react'
import AppBar from '../components/AppBar'
import { useParams } from 'react-router-dom'
import StockTabs from '../components/StockTabs'
import background from '../assets/oak_wood_texture.jpg'

const StockPage = () => {
  let { ticker } = useParams()
  return (
    <Box bgImage={background} bgSize="contain" bgPos="center" >
      <AppBar />
      <Box margin="auto" w="90%">
        <Box h="5"></Box>
        <Box boxShadow="lg">
          <SymbolInfo widgetProps={{ symbol: ticker, colorTheme: "light", width: "100%" }} />
        </Box>
      </Box>
      <Box h="10"></Box>
      <StockTabs />
      <Box h="5"></Box>
      <Text fontSize="50" alignSelf="center">Posts & Comments Section</Text>
    </Box>
  )
}

export default StockPage
