import { AdvancedChart, CompanyProfile, FundamentalData, SymbolInfo, TechnicalAnalysis } from "react-tradingview-embed"
import { Box } from '@chakra-ui/react'
import AppBar from '../components/AppBar'
import { useParams } from "react-router-dom"

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
        <Box h="5"></Box>
        <Box boxShadow="lg">
          <AdvancedChart widgetProps={{ symbol: ticker, theme: "light" }} />
        </Box>
        <Box h="5"></Box>
        <Box boxShadow="lg">
          <CompanyProfile widgetProps={{ symbol: ticker, colorTheme: "light", width: "100%" }} />
        </Box>
        <Box h="5"></Box>
        <Box boxShadow="lg">
          <TechnicalAnalysis widgetProps={{ symbol: ticker, colorTheme: "light", width: "100%" }} />
        </Box>
        <Box h="5"></Box>
        <Box boxShadow="lg">
          <FundamentalData widgetProps={{ symbol: ticker, colorTheme: "light", width: "100%" }} />
        </Box>
        <Box h="5"></Box>
      </Box>
    </Box>
  )
}

export default StockPage
