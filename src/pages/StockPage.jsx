import { AdvancedChart, CompanyProfile, FundamentalData, SymbolInfo, TechnicalAnalysis } from "react-tradingview-embed"
import { Box } from '@chakra-ui/react'
import AppBar from '../components/AppBar'
import { useParams } from "react-router-dom"

const StockPage = () => {
  let { ticker } = useParams()
  return (
    <Box bg="gray.300">
      <AppBar />
      <Box margin="auto" w="90%">
        <Box h="5"></Box>
        <SymbolInfo widgetProps={{ symbol: ticker, colorTheme: "light", width: "100%" }} />
        <Box h="5"></Box>
        <AdvancedChart widgetProps={{ symbol: ticker, theme: "light" }} />
        <Box h="5"></Box>
        <CompanyProfile widgetProps={{ symbol: ticker, colorTheme: "light", width: "100%" }} />
        <Box h="5"></Box>
        <TechnicalAnalysis widgetProps={{ symbol: ticker, colorTheme: "light", width: "100%" }} />
        <Box h="5"></Box>
        <FundamentalData widgetProps={{ symbol: ticker, colorTheme: "light", width: "100%" }} />
        <Box h="5"></Box>
      </Box>
    </Box>
  )
}

export default StockPage
