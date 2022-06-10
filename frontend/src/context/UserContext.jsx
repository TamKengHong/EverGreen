import { createContext, useContext, useState, useEffect } from "react"

const User = createContext("default")

const UserContext = ({ children }) => {
  const [token, setToken] = useState("hello")
  const [username, setUsername] = useState("hello")
  const [email, setEmail] = useState("hello")

  return <User.Provider value={{ token, setToken }}>
    {children}
  </User.Provider>

}

export default UserContext

export const UserState = () => {
  return useContext(User)
}
