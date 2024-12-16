import { useState, useEffect, useContext } from "react"
import Header from "../components/Header"
import EventListLogged from "../components/EventListLogged"
import { UserContext } from "../context/UserContext"
import eventsService from "../services/Events"
import userService from "../services/User"

const LandingPageLogged = () => {
  const [events, setEvents] = useState([])
  const [userEvents, setUserEvents] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    eventsService.fetchEvents().then((response) => {
      console.log("event promise fulfilled")
      console.log(response.data)
      setEvents(response.data)
    })
    const loadUserEvents = async () => {
      const userEvents = await userService.fetchUserEvents(user.token)
      setUserEvents(userEvents)
    }

    loadUserEvents()
  }, [])

  return (
    <div>
      <Header
        title={"Welcome to NZPMC"}
        subtitle={"Portal for NZPMC event registration."}
      />
      <div className="container">
        <EventListLogged
          events={events}
          userEvents={userEvents}
          setUserEvents={setUserEvents}
        />
      </div>
    </div>
  )
}

export default LandingPageLogged
