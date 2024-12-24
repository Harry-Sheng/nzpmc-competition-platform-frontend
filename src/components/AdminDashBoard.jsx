import {
  Card,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownButton,
  Modal,
} from "react-bootstrap"
import Exam from "../assets/exam.png"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/UserContext"
import eventService from "../services/Events"
import CreateEventForm from "./CreateEventForm"
import competitionService from "../services/Competitions"
import attemptService from "../services/Attempts"
import CreateCompetitionForm from "./CreateCompetitionForm"
import { Link } from "react-router-dom"
import ResultModal from "./ResultModal"

// To do: Refactor AdminDashboard components
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
            <Card key={index} className="mb-3 shadow-sm rounded">
              <Card.Body className="d-flex align-items-center">
                <Col xs={3}>
                  <img
                    src={Exam}
                    alt="Event"
                    className="img-fluid rounded"
                    style={{ maxHeight: "100px", objectFit: "cover" }}
                  />
                </Col>
                <Col xs={6} className="ps-3">
                  <h5 className="mb-1">{event.name}</h5>
                  <p className="text-muted mb-1">{event.description}</p>
                  <p className="text-muted mb-0">{event.date}</p>
                </Col>
                <Col xs={2} className="d-flex flex-column justify-content-end">
                  {/* Dropdown to Link Competition */}
                  <DropdownButton
                    title={event.competitionId ? event.competitionId : "None"}
                    variant="primary"
                    className="mb-2"
                    onSelect={(competitionTitle) =>
                      handleCompetitionSelect(
                        competitionTitle === "None" ? null : competitionTitle,
                        event.name
                      )
                    }
                  >
                    <Dropdown.Item eventKey="None">None</Dropdown.Item>
                    {competitions.map((competition) => (
                      <Dropdown.Item
                        key={competition.title}
                        eventKey={competition.title}
                      >
                        {competition.title}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                  {/* Generate Result Button */}
                  <Button
                    variant="success"
                    onClick={() => generateResult(event)}
                    disabled={!event.competitionId} // Disable if no competition linked
                  >
                    Result
                  </Button>
                </Col>
              </Card.Body>
            </Card>
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
            <Card key={index} className="mb-3 shadow-sm rounded">
              <Card.Body className="d-flex align-items-center">
                <Col xs={3}>
                  <img
                    src={Exam}
                    alt="Event"
                    className="img-fluid rounded"
                    style={{ maxHeight: "100px", objectFit: "cover" }}
                  />
                </Col>
                <Col xs={6} className="ps-3">
                  <h5 className="mb-1">{competition.title}</h5>
                </Col>
                <Col xs={2} className="d-flex justify-content-end">
                  {/* Add Question Button */}
                  <Link to={`/addquestion/${competition.title}`}>
                    <Button variant="primary">Add Question</Button>
                  </Link>
                </Col>
              </Card.Body>
            </Card>
          ))}

          {/* Accounts Section */}
          <h2 className="mb-4"> Accounts</h2>
          {users.map((user, index) => (
            <Card key={index} className="mb-3 shadow-sm rounded">
              <Card.Body className="d-flex align-items-center">
                <Col xs={3}>
                  <img
                    src={Exam}
                    alt="Event"
                    className="img-fluid rounded"
                    style={{ maxHeight: "100px", objectFit: "cover" }}
                  />
                </Col>
                <Col xs={7} className="ps-3">
                  <h5 className="mb-1">{user.name}</h5>
                  <p className="text-muted mb-1">{user.email}</p>
                  {user.events && user.events.length > 0 ? (
                    user.events.map((event, eventIndex) => (
                      <p key={eventIndex} className="text-muted mb-0">
                        {event.name}
                      </p>
                    ))
                  ) : (
                    <p className="text-muted mb-0">No Events Available</p>
                  )}
                </Col>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Create Section */}
        <Col md={4}>
          {/* Create Event */}
          <CreateEventForm fetchData={fetchData} />
          <br />
          <CreateCompetitionForm fetchData={fetchData} />
        </Col>
      </Row>
    </>
  )
}

export default AdminDashboard
