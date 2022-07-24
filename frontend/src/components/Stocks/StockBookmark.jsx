import { Box, IconButton } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { useParams } from 'react-router-dom'

const StockBookmark = () => {
  const { ticker } = useParams()
  // do not remove these parts! will lead to undefined error.
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  let stock = bookmarks.find(x => x.stockTicker === ticker)
  let stockId = stock ? stock.id : null // fixes undefined error.
  const [isBookmarked, setIsBookmarked] = useState(stockId)

  useEffect(() => {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    stock = bookmarks.find(x => x.stockTicker === ticker)
    stockId = stock ? stock.id : null // fixes undefined error.
    setIsBookmarked(stockId)
  }, [ticker])

  function handleClick() {
    const bookmarkUrl = 'https://ever-green-production.herokuapp.com/stockmarket/bookmarks/'
    const obj = {
      "name": localStorage.getItem('username'),
      "stockTicker": ticker
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('key')
      },
      body: JSON.stringify(obj)
    }
    const requestOptions2 = {
      method: 'DELETE',
      headers: { 'Authorization': 'Token ' + localStorage.getItem('key') },
    }
    if (!isBookmarked) {
      fetch(bookmarkUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
          bookmarks.push(data)
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
        })
    } else {
      fetch(bookmarkUrl + stockId + '/', requestOptions2)
        .then(response => response.json())
        .then(() => {
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks.filter(x => x.id !== stockId)))
        })
    }
  }

  return (
    <Box w="40px" >
      <IconButton
        ml="7px"
        bg="tan"
        aria-label="Bookmark"
        size="sm"
        icon={!isBookmarked ? <BsBookmark size="28" /> : <BsBookmarkFill size="28" />}
        onClick={() => {
          handleClick()
          setIsBookmarked(!isBookmarked)
        }}
      />
    </Box>
  )
}

export default StockBookmark
