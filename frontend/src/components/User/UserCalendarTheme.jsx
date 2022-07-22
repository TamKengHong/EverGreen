import { Box, Text, Flex, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { SketchPicker } from 'react-color'

const UserCalendarTheme = () => {
  const [eventColor, setEventColor] = useState({ hex: "#3788d8" })
  const [eventTextColor, setEventTextColor] = useState({ hex: "#FFFFFF" })
  const colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3",
    "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107",
    "#ff9800", "#ff5722", "#795548", "#607d8b", "#000000", "#FFFFFF", "#3788d8"]

  function handleClick() {
    localStorage.setItem("eventColor", eventColor.hex)
    localStorage.setItem("eventTextColor", eventTextColor.hex)
    window.location.reload(false)
  }

  return (
    <Box borderBottom="1px" borderColor="gray.400" mb="5">
      <Text m="2" as="u" fontSize="2xl">Calendar Theme:</Text>
      <Flex mt="4" wrap="wrap">
        <Flex direction="column" mr="5" justifyContent="center" alignItems="center">
          <SketchPicker
            disableAlpha={true}
            presetColors={colors}
            color={eventColor}
            onChange={color => setEventColor(color)}
          />
          <Text m="2">Customise Event Color</Text>
        </Flex>
        <Flex direction="column" mr="5" justifyContent="center" alignItems="center">
          <SketchPicker
            disableAlpha={true}
            presetColors={colors}
            color={eventTextColor}
            onChange={color => setEventTextColor(color)}
          />
          <Text m="2">Customise Event Text Color</Text>
        </Flex>
      </Flex>
      <Button mb="4" colorScheme="teal" onClick={() => handleClick()}>
        Submit
      </Button>
    </Box>
  )
}

export default UserCalendarTheme
