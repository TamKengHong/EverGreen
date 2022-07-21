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

const UserEventElement = (props) => {
  const event = props
  const stock = event?.title.split(" ")[0]

  return (
    event ?
      <UnorderedList key={event.id}>
        <ListItem>
          <Text as="b">
            {formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' }) + " "}
          </Text>
          <Link as={RouterLink} to={'/stock/' + stock}>
            {event.title}
          </Link>
        </ListItem>
      </UnorderedList>
      : null
  )
}

const Calendar = (props) => {
  const bookmarks = props?.bookmarks?.map(x => x.stockTicker)
  const isUserCalendar = props.isUserCalendar
  const [allEvents, setAllEvents] = useState([])
  const [stocksData, setStocksData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const url = 'https://ever-green-production.herokuapp.com/stockmarket/earnings/'
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Token ' + localStorage.getItem('key') }
    }
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => setStocksData(isUserCalendar ? data[0].data : data[0].processedData))
  }, [])

  useEffect(() => {
    let arr = []
    if (isUserCalendar) {
      for (let i = 0; i < stocksData.length; i++) {
        if (bookmarks.includes(stocksData[i].ticker)) {
          const obj = {
            id: i,
            title: stocksData[i].ticker + " Earnings",
            start: stocksData[i].date
          }
          arr.push(obj)
        }
      }
    } else {
      for (var key in stocksData) {
        for (let i = 0; i < stocksData[key].length; i += 20) {
          const obj = {
            id: key + " " + i / 20,
            title: "Earnings: " + stocksData[key].slice(i, i + 20).reduce((a, b) => a + ", " + b, "").substring(2),
            start: key
          }
          arr.push(obj)
        }
      }
    }
    setAllEvents(arr)
  }, [stocksData])

  function handleEventClick(clickInfo) {
    if (window.confirm(`Go to ${clickInfo.event.title.split(" ")[0]} Stock Page?`)) {
      navigate('/stock/' + clickInfo.event.title.split(" ")[0])
    }
  }

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
        selectable={!isUserCalendar} // resize issue with selection + user tabs switching
        dayMaxEvents={true}
        weekends={true}
        events={allEvents}
        eventClick={isUserCalendar ? e => handleEventClick(e) : null}
        contentHeight="700px"
      // eventColor='green'
      // eventTextColor='white'
      />
      <Box ml="5">
        {isUserCalendar ?
          <Text fontSize="xl" as="b">
            All Events ({allEvents.length})
          </Text> : null
        }
        {isUserCalendar ? allEvents.map((x, i) => <UserEventElement {...x} key={i} />) : null}
      </Box>
    </Box>
  )
}

export default Calendar
