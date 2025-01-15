import { AboutSection } from "./../components/LandingPage/AboutSection"
import { HeroSection } from "./../components/LandingPage/HeroSection"
import { useState, useEffect } from "react"
import Notification from "../components/Notification"
import EventList from "../components/EventList"
import eventsService from "../services/Events"
import { Container } from "react-bootstrap"
import NavBar from "../components/NavBar"
import ChatBotPopUp from "../components/ChatBot/ChatBotPopUp"

const LandingPageNotLogged = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    eventsService.fetchEvents().then((response) => {
      console.log("event promise fulfilled")
      console.log(response.data)
      setEvents(response.data)
    })
  }, [])

  return (
    <>
      <NavBar />
      <HeroSection />
      <br />
      <AboutSection />
      <Container>
        <Notification
          message="You are not logged in. Click login to register for event"
          variant="info"
        />
        <EventList events={events} />
      </Container>
      <ChatBotPopUp />
    </>
  )
}

export default LandingPageNotLogged
