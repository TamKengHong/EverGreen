import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Select } from 'chakra-react-select'
import { stocks } from '../stocks'

const SearchBar = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [options, setOptions] = useState([])

  useEffect(() => {
    setOptions(stocks.filter((stock) => stock.label.toLowerCase().includes(query)).slice(0, 100))
  }, [query])

  return (
    <Select
      placeholderColor="gray.500"
      w="200px"
      name="stocks"
      size='lg'
      placeholder='Search Ticker'
      options={options}
      onInputChange={input => setQuery(input.toLowerCase())}
      onChange={e => navigate('/stock/' + e.value)}
    />
  )
}

export default SearchBar
