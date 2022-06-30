import { Tab, Tabs, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import UserSettings from './UserSettings'


const UserTabs = (props) => {
  return (
    <Tabs margin="auto" w="95%" isFitted variant='enclosed' bg="rgba(237,242,247,0.9)" minH="500" >
      <TabList mb='1em' border="1px" borderColor="gray.400">
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Settings</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Posts</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Watchlist</Tab>
        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Calendar</Tab>
      </TabList>
      <TabPanels border="1px" borderColor="gray.400">
        <TabPanel>
          <UserSettings {...props} />
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
