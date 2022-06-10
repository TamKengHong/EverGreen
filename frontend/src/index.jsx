import React, { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import UserPage from './pages/UserPage'
import StockPage from './pages/StockPage'
import Test from './pages/Test'
import { ChakraProvider } from '@chakra-ui/react'
import UserContext from './context/UserContext'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <UserContext>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/user/:email' element={<UserPage />} />
            <Route path='/stock/:ticker' element={<StockPage />} />
            <Route path='/test' element={<Test />} />
          </Routes>
        </UserContext>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
)
