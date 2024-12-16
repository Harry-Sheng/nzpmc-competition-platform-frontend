import { createContext, useState, useEffect } from "react"

export const UserContext = createContext()

//wrapper for children inside it have access to the user and setUser state
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check localStorage for logged-in user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      try {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
      } catch (error) {
        console.error("Failed to parse user JSON:", error)
      }
    }
    setLoading(false)
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
