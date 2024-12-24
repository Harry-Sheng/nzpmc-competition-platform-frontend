import { Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"
import eventService from "../services/Events"
import CreateEventForm from "./CreateEventForm"
import competitionService from "../services/Competitions"
import attemptService from "../services/Attempts"
import CreateCompetitionForm from "./CreateCompetitionForm"
import ResultModal from "./ResultModal"
import AdminEventCard from "./AdminEventCard"
import AdminCompetitionCard from "./AdminCompetitionCard"
import AdminAccountCard from "./AdminAccountCard"

const AdminDashboard = ({ users }) => {
  const [events, setEvents] = useState([])
  const [competitions, setCompetitions] = useState([])
  const [showResultModal, setShowResultModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [results, setResults] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const updatedEvents = await eventService.fetchEvents()
      const updatedCompetitions = await competitionService.fetchCompetitions()
      setEvents(updatedEvents.data)
      setCompetitions(updatedCompetitions.data)
      // This is very important it set the data immediately after fetching
      console.log("Events after fetchData:", updatedEvents.data)
      console.log("Competitions after fetchData :", updatedCompetitions.data)
    } catch (error) {
      console.error("Failed to fetch events:", error)
    }
  }

  const handleCompetitionSelect = (competitionTitle, eventName) => {
    eventService.linkCompetitionToEvent(eventName, competitionTitle)
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.name === eventName
          ? { ...event, competitionId: competitionTitle }
          : event
      )
    )
  }

  const generateResult = async (event) => {
    if (!event.competitionId) {
      console.log("No competition linked to generate results!")
      return
    }

    const competition = competitions.find(
      (comp) => comp.title === event.competitionId
    )

    if (competition) {
      try {
        const result = await attemptService.generateResults(competition.title)
        setResults(result.data)
        if (result.data.length === 0) {
          setResults(null)
        }
        setSelectedEvent(event)
        setShowResultModal(true)
        console.log("Results generated successfully:", result.data)
      } catch (error) {
        console.error("Error generating results:", error)
        alert("An error occurred while generating results. Please try again.")
      }
    } else {
      alert("Competition not found. Unable to generate results.")
    }
  }

  const closeResultModal = () => {
    setShowResultModal(false)
    setResults(null)
    setSelectedEvent(null)
  }

  return (
    <>
      <Row className="g-4">
        <Col md={8}>
          {/* Events Section */}
          <h2 className="mb-4"> Events</h2>
          {events.map((event, index) => (
            <AdminEventCard
              key={index}
              event={event}
              competitions={competitions}
              handleCompetitionSelect={handleCompetitionSelect}
              generateResult={generateResult}
            />
          ))}

          <ResultModal
            show={showResultModal}
            results={results}
            selectedEvent={selectedEvent}
            onClose={closeResultModal}
          />

          {/* Competition Section */}
          <h2 className="mb-4"> Competitions</h2>
          {competitions.map((competition, index) => (
            <AdminCompetitionCard key={index} competition={competition} />
          ))}

          {/* Accounts Section */}
          <h2 className="mb-4"> Accounts</h2>
          {users.map((user, index) => (
            <AdminAccountCard key={index} user={user} />
          ))}
        </Col>

        {/* Create Section */}
        <Col md={4}>
          <CreateEventForm fetchData={fetchData} />
          <br />
          <CreateCompetitionForm fetchData={fetchData} />
        </Col>
      </Row>
    </>
  )
}

export default AdminDashboard
