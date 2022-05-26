import { AdvancedChart, CompanyProfile, FundamentalData, SymbolInfo, TechnicalAnalysis } from "react-tradingview-embed"
import { Box } from '@chakra-ui/react'
import AppBar from '../components/AppBar'

const StockPage = () => {
  return (
    <Box bg="gray.300">
      <AppBar />
      <Box margin="auto" w="80%">
        <Box h="5"></Box>
        <SymbolInfo widgetProps={{ symbol: "AAPL", colorTheme: "light", width: "100%" }} />
        <Box h="5"></Box>
        <AdvancedChart widgetProps={{ symbol: "AAPL", theme: "light" }} />
        <Box h="5"></Box>
        <CompanyProfile widgetProps={{ symbol: "AAPL", colorTheme: "light", width: "100%" }} />
        <Box h="5"></Box>
        <TechnicalAnalysis widgetProps={{ symbol: "AAPL", colorTheme: "light", width: "100%" }} />
        <Box h="5"></Box>
        <FundamentalData widgetProps={{ symbol: "AAPL", colorTheme: "light", width: "100%" }} />
        <Box h="5"></Box>
      </Box>
    </Box>
  )
}

export default StockPage
