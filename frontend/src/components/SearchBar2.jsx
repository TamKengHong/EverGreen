import { Box, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Select } from 'chakra-react-select'
import { stocks } from '../stocks'

const SearchBar2 = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  // function handleKeyPress(e) {
  //   if (e.key === "Enter") {
  //     navigate(`/stock/${ticker.toUpperCase()}`)
  //   }
  // }

  const colourOptions = [
    { label: "Blue", },
    { value: "purple", label: "Purple", color: "#5243AA" },
    { value: "red", label: "Red", color: "#FF5630" },
    { value: "orange", label: "Orange", color: "#FF8B00" },
    { value: "yellow", label: "Yellow", color: "#FFC400" },
    { value: "green", label: "Green", color: "#36B37E" }
  ];

  function handleOptions() {
    let options = stocks.filter((stock) =>
      stock.symbol.toLowerCase().includes(query) ||
      stock.name.toLowerCase().includes(query)
    )
    if (options.length > 10) {
      return { value: "please be more specific with your query" }
    } else {
      return options
    }
  }
  console.log(query)

  return (
    <>
      <Select
        name="stocks"
        size='lg'
        placeholder='Search Ticker'
        options={colourOptions}
      />
      {/* <Input */}
      {/*   border="1px" */}
      {/*   borderColor="gray.400" */}
      {/*   placeholder='Search Ticker' */}
      {/*   bg="white" */}
      {/*   mr={5} */}
      {/*   onChange={e => { setTicker(e.target.value) }} */}
      {/*   onKeyPress={e => handleKeyPress(e)} */}
      {/* /> */}
    </>
  )
}

export default SearchBar2
