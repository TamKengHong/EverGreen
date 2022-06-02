import { Box, Tab, Tabs, TabList, TabPanels, TabPanel, Link } from '@chakra-ui/react'
import { AdvancedChart, CompanyProfile, FundamentalData, TechnicalAnalysis, } from 'react-tradingview-embed'
import Timeline from './Timeline'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useParams } from 'react-router-dom'

const StockTabs = () => {
  let { ticker } = useParams()

  return (
    <Tabs margin="auto" w="92%" isFitted variant="enclosed" bg="gray.200" isLazy="true" lazyBehavior="keepMounted" >
      <TabList mb='1em' border="1px" borderColor="gray.400">
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Chart</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Company Profile</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Indicators</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>News</Tab>
      </TabList>
      <TabPanels border="1px" borderColor="gray.400">
        <TabPanel>
          <Box boxShadow="lg">
            <AdvancedChart widgetProps={{ symbol: ticker, theme: "light" }} />
          </Box>
        </TabPanel>
        <TabPanel>
          <Box boxShadow="lg">
            <CompanyProfile widgetProps={{
              symbol: ticker,
              colorTheme: "light", width: "100%"
            }} />
          </Box>
        </TabPanel>
        <TabPanel>
          <Box boxShadow="lg">
            <TechnicalAnalysis widgetProps={{
              symbol: ticker,
              colorTheme: "light", width: "100%"
            }} />
          </Box>
          <Box h="5"></Box>
          <Box boxShadow="lg">
            <FundamentalData widgetProps={{
              symbol: ticker,
              colorTheme: "light", width: "100%"
            }} />
          </Box>
        </TabPanel>
        <TabPanel>
          <Timeline />
          <Link href={`https://www.google.com/search?q=${ticker}&tbm=nws`} isExternal>
            More News <ExternalLinkIcon mx="2px" />
          </Link>
        </TabPanel>
      </TabPanels>
    </Tabs >
  )
}

export default StockTabs
