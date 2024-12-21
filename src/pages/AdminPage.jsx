import { useState, useEffect } from "react"
import Header from "../components/Header"
import EventListLogged from "../components/EventListLogged"
import eventsService from "../services/Events"
import userService from "../services/User"
import AdminDashboard from "../components/AdminDashBoard"

const AdminPage = () => {
  const [events, setEvents] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    eventsService.fetchEvents().then((response) => {
      console.log("Events:", response.data)
      setEvents(response.data)
    })
    userService.getUsers().then((response) => {
      console.log("Users:", response.data)
      setUsers(response.data)
    })
  }, [])

  return (
    <div>
      <Header
        title={"Welcome Admin"}
        subtitle={"Here is the Admin Dashboard"}
      />
      <div className="container">
        <AdminDashboard users={users}></AdminDashboard>
      </div>
    </div>
  )
}

export default AdminPage
