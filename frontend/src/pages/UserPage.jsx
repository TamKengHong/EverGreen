import AppBar from '../components/AppBar'
import { Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import UserTabs from '../components/User/UserTabs'
import UserBar from '../components/User/UserBar'
import background from '../assets/cream_wood_texture.jpg'

const UserPage = () => {
  const [userObj, setUserObj] = useState('')
  const [isOwnPage, setIsOwnPage] = useState(false)
  const { username } = useParams()
  const [stocksData, setStocksData] = useState()
  const tickerString = userObj?.bookmarks?.reduce((a, b) => a + "%2C" + b.stockTicker, "").substring(3)

  useEffect(() => {
    const url = 'https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=' + tickerString
    const requestOptions = { // 100 reqs a day limit
      method: 'GET',
      headers: { 'x-api-key': 'Vuw1uVBtM73adi1nrJDTZjXETzt9YvU9f162gi6g' }
    }
    if (tickerString) { // wont fetch from a null ticker
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => setStocksData(data))
    }
  }, [tickerString])

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Authorization': 'Token ' + localStorage.getItem('key') }
    }
    fetch('https://ever-green-production.herokuapp.com/stockmarket/users/?search='
      + username, requestOptions)
      .then(response => response.json())
      .then(data => setUserObj(data[0]))
  }, [username])

  useEffect(() => {
    if (userObj && (localStorage.getItem('email') === userObj.email)) {
      // You are accessing your own userpage.
      localStorage.setItem('username', userObj.username)
      localStorage.setItem('bookmarks', JSON.stringify(userObj.bookmarks))
      if (userObj.profilePicture) localStorage.setItem('profilePicture', userObj.profilePicture)
      setIsOwnPage(true)
    } else {
      setIsOwnPage(false)
    }
  }, [username, userObj])


  return (
    <Box bgImage={background} minH="100vh" bgSize="contain">
      <AppBar />
      <UserBar />
      <UserTabs {...userObj} stocksData={stocksData} isOwnPage={isOwnPage} />
      <Box h="10" />
    </Box>
  )
}

export default UserPage
