import {
  Box, Text, ListItem, UnorderedList, Link
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { Link as RouterLink, useNavigate } from "react-router-dom"

const UserCalendar = () => {
  const [currentEvents, setCurrentEvents] = useState([])
  const navigate = useNavigate()

  let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

  function renderAllEvents(event) {
    return (
      <UnorderedList key={event.id}>
        <ListItem>
          <Text as="b">
            {formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' }) + " "}
          </Text>
          <Link as={RouterLink} to={'/stock/' + event.title.split(" ")[0]}>
            {event.title}
          </Link>
        </ListItem>
      </UnorderedList>
    )
  }

  function handleEventClick(clickInfo) {
    if (window.confirm(`Go to ${clickInfo.event.title.split(" ")[0]} Stock Page?`)) {
      navigate('/stock/' + clickInfo.event.title.split(" ")[0])
    }
  }

  const INITIAL_EVENTS = [
    {
      id: 1,
      title: 'AAPL Earnings',
      start: todayStr
    },
    {
      id: 3,
      title: 'F Earnings',
      start: todayStr
    },
    {
      id: 4,
      title: 'BB Earnings',
      start: todayStr
    },
    {
      id: 5,
      title: 'GME Earnings',
      start: todayStr
    },
  ]
  useEffect(() => {
    setCurrentEvents(INITIAL_EVENTS)
  }, [])

  return (
    <Box>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={currentEvents}
        eventClick={(e) => handleEventClick(e)}
        contentHeight="700px"
      />
      <Box ml="5">
        <Text fontSize="xl" as="b">
          All Events ({currentEvents.length})
        </Text>
        {currentEvents.map(renderAllEvents)}
      </Box>
    </Box>
  )
}

export default UserCalendar
