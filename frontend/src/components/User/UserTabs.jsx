import { Tab, Tabs, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import UserSettings from './UserSettings'


const UserTabs = () => {
  return (
    <Tabs margin="auto" w="95%" isFitted variant='enclosed' bg="gray.200" minH="400" >
      <TabList mb='1em' border="1px" borderColor="gray.400">
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Settings</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Posts</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Watchlist</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Calendar</Tab>
      </TabList>
      <TabPanels border="1px" borderColor="gray.400">
        <TabPanel>
          <UserSettings />
        </TabPanel>
        <TabPanel>
          <p>Posts & Comments</p>
        </TabPanel>
        <TabPanel>
          <p>Watchlist</p>
        </TabPanel>
        <TabPanel>
          <p>Calendar</p>
        </TabPanel>
      </TabPanels>
    </Tabs >
  )
}

export default UserTabs
