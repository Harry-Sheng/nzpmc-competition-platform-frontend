import { Row, Col, Card } from "react-bootstrap"
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
import userService from "../services/User"

const AdminDashboard = ({ users, setUsers }) => {
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

  const deleteEvent = async (eventId) => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to delete " + eventId + "?"
      )
      if (confirmation) {
        await eventService.deleteEvent(eventId)
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.name !== eventId)
        )
      }
    } catch (error) {
      console.error("Failed to delete event:", error)
      alert("An error occurred while deleting the event. Please try again.")
    }
  }

  const deleteCompetition = async (competitionId) => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to delete " + competitionId + "?"
      )
      if (confirmation) {
        await competitionService.deleteCompetition(competitionId)
        setCompetitions((prevCompetitions) =>
          prevCompetitions.filter((c) => c.title !== competitionId)
        )
      }
    } catch (error) {
      console.error("Failed to delete competition:", error)
      alert(
        "An error occurred while deleting the competition. Please try again."
      )
    }
  }

  const deleteUser = async (userId) => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to delete user " + userId + "?"
      )
      if (confirmation) {
        await userService.deleteUser(userId)
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.email !== userId)
        )
      }
    } catch (error) {
      console.error("Failed to delete user:", error)
      alert("An error occurred while deleting the user. Please try again.")
    }
  }

  return (
    <>
      <Row className="g-4">
        <Col md={8}>
          {/* Events Section */}
          <Card className="mb-3 shadow-sm rounded">
            <Card.Header>
              <h4 className="mb-0">Events</h4>
            </Card.Header>
            <Card.Body className="scrollable-small">
              {events.map((event, index) => (
                <AdminEventCard
                  key={index}
                  event={event}
                  competitions={competitions}
                  handleCompetitionSelect={handleCompetitionSelect}
                  generateResult={generateResult}
                  deleteEvent={deleteEvent}
                />
              ))}
            </Card.Body>
          </Card>

          <ResultModal
            show={showResultModal}
            results={results}
            selectedEvent={selectedEvent}
            onClose={closeResultModal}
          />

          {/* Competition Section */}
          <Card className="mb-3 shadow-sm rounded">
            <Card.Header>
              <h4 className="mb-0">Competitions</h4>
            </Card.Header>
            <Card.Body className="scrollable-small">
              {competitions.map((competition, index) => (
                <AdminCompetitionCard
                  key={index}
                  competition={competition}
                  deleteCompetition={deleteCompetition}
                />
              ))}
            </Card.Body>
          </Card>

          {/* Accounts Section */}
          <Card className="mb-3 shadow-sm rounded">
            <Card.Header>
              <h4 className="mb-0">Accounts</h4>
            </Card.Header>
            <Card.Body className="scrollable-small">
              {users.map((user, index) => (
                <AdminAccountCard
                  key={index}
                  user={user}
                  deleteUser={deleteUser}
                />
              ))}
            </Card.Body>
          </Card>
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
