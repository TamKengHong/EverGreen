import { SymbolInfo } from "react-tradingview-embed"
import { Box, Text } from '@chakra-ui/react'
import AppBar from '../components/AppBar'
import { useParams } from "react-router-dom"
import StockTabs from '../components/StockTabs'

const StockPage = () => {
  let { ticker } = useParams()
  return (
    <Box bg="gray.300" >
      <AppBar />
      <Box margin="auto" w="90%">
        <Box h="5"></Box>
        <Box boxShadow="lg">
          <SymbolInfo widgetProps={{ symbol: ticker, colorTheme: "light", width: "100%" }} />
        </Box>
      </Box>
      <Box h="10"></Box>
      <StockTabs props={ticker} />
      <Box h="5"></Box>
      <Text fontSize="50" alignSelf="center">Posts & Comments Section</Text>
    </Box>
  )
}

export default StockPage
