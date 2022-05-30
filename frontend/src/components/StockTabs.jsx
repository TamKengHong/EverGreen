import { Box, Tab, Tabs, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import { AdvancedChart, CompanyProfile, FundamentalData, TechnicalAnalysis } from "react-tradingview-embed"

const StockTabs = (props) => {
  return (
    <Tabs margin="auto" w="92%" isFitted variant='enclosed' bg="gray.200" isLazy="true" lazyBehavior="keepMounted" >
      <TabList mb='1em' border="1px" borderColor="gray.400">
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Chart</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Company Profile</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Technicals</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Financials</Tab>
      </TabList>
      <TabPanels border="1px" borderColor="gray.400">
        <TabPanel>
          <Box boxShadow="lg">
            <AdvancedChart widgetProps={{ symbol: props.ticker, theme: "light" }} />
          </Box>
        </TabPanel>
        <TabPanel>
          <Box boxShadow="lg">
            <CompanyProfile widgetProps={{
              symbol: props.ticker,
              colorTheme: "light", width: "100%"
            }} />
          </Box>
        </TabPanel>
        <TabPanel>
          <Box boxShadow="lg">
            <TechnicalAnalysis widgetProps={{
              symbol: props.ticker,
              colorTheme: "light", width: "100%"
            }} />
          </Box>
        </TabPanel>
        <TabPanel>
          <Box boxShadow="lg">
            <FundamentalData widgetProps={{
              symbol: props.ticker,
              colorTheme: "light", width: "100%"
            }} />
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs >
  )
}

export default StockTabs
