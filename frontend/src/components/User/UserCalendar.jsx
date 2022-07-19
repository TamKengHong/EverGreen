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

const UserCalendar = (props) => {
  const [currentEvents, setCurrentEvents] = useState([])
  const [allEvents, setAllEvents] = useState([])
  const [stocksData, setStocksData] = useState([])
  const navigate = useNavigate()

  let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

  useEffect(() => {
    const url = 'https://ever-green-production.herokuapp.com/stockmarket/earnings/'
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Token ' + localStorage.getItem('key') }
    }
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => setStocksData(data[0].processedData))
  }, [])

  useEffect(() => {
    let arr = []
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
    setAllEvents(arr)
  }, [stocksData])

  console.log(allEvents)


  // useEffect(() => {
  //   setAllEvents(stocksData.map((x, i) => {
  //     return {
  //       id: i,
  //       title: x.ticker + " Earnings",
  //       start: x.date
  //     }
  //   }))
  // }, [stocksData])
  // console.log(allEvents)


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
        dayMaxEvents={true}
        weekends={true}
        events={allEvents}
        eventClick={props.isUserCalendar ? e => handleEventClick(e) : null}
        contentHeight="700px"
      />
      <Box ml="5">
        {props.isUserCalendar ?
          <Text fontSize="xl" as="b">
            All Events ({currentEvents.length})
          </Text> : null
        }
        {props.isUserCalendar ? currentEvents.map(renderAllEvents) : null}
      </Box>
    </Box>
  )
}

export default UserCalendar
