import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const UserCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <Flex justifyContent="center">
      <Calendar onChange={onChange} value={value} />
    </Flex>
  )
}

export default UserCalendar
