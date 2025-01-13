import { Card, Row, Col, Button, Modal, Form } from "react-bootstrap"
import Exam from "../assets/exam.png"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/UserContext"
import eventService from "../services/Events"
import competitionService from "../services/Competitions"
import userService from "../services/User"
import { useNavigate } from "react-router-dom"
import { formatToNZTime } from "../utils/date"

const EventListWithUserDetails = ({ events, userEvents, setUserEvents }) => {
  const { user, setUser } = useContext(UserContext)
  const [showModal, setShowModal] = useState(false)
  const [newName, setNewName] = useState("")
  const navigate = useNavigate()
  const [competitionDetails, setCompetitionDetails] = useState({})
  const [competitionInTimeMap, setCompetitionInTimeMap] = useState({})

  useEffect(() => {
    const fetchDetails = async () => {
      const inTimeMap = {}
      for (const event of events) {
        if (event.competitionId) {
          await fetchCompetitionDetails(event.competitionId)
          const isInTime = await isInCompetitionTime(event.competitionId)
          inTimeMap[event.competitionId] = isInTime
        }
      }
      setCompetitionInTimeMap(inTimeMap)
    }

    fetchDetails()
  }, [events])

  const fetchCompetitionDetails = async (competitionId) => {
    if (!competitionId || competitionDetails[competitionId]) return
    try {
      const response =
        await competitionService.getCompetitionById(competitionId)
      const competition = response.data

      setCompetitionDetails((prevDetails) => ({
        ...prevDetails,
        [competitionId]: competition,
      }))
    } catch (error) {
      console.error("Error fetching competition details:", error)
    }
  }

  const isInCompetitionTime = async (competitionId) => {
    if (!competitionId) return false
    const response = await competitionService.isInCompetitionTime(competitionId)
    return response.data
  }

  const isUserJoined = (eventId) => {
    if (!userEvents) {
      return false
    }
    return userEvents.some((userEvent) => userEvent.name === eventId)
  }

  const isCompetitionLinked = (event) => {
    if (!event) {
      return false
    }
    return event.competitionId !== null
  }

  const handleJoinCompetition = async (competitionId) => {
    const isInTime = await isInCompetitionTime(competitionId)
    if (!isInTime) {
      alert("Competition is not in progress!")
      return
    }
    navigate(`/competition/${competitionId}`)
  }

  const handleJoin = async (eventId) => {
    console.log("Joining event with id:", eventId)
    const updatedEvent = await eventService.joinEvent(eventId, user.token)
    setUserEvents((prevUserEvents) => [...prevUserEvents, updatedEvent.event])
  }

  const handleNameChange = async () => {
    try {
      const updatedUser = await userService.updateUserName(newName, user.token)
      setUser((prevUser) => ({ ...prevUser, name: updatedUser.name }))
      setShowModal(false)
    } catch (error) {
      console.error("Error updating name:", error)
    }
  }

  return (
    <Row className="g-4">
      {/* Events Section */}
      <Col md={9}>
        {events.map((event, index) => {
          const competition =
            event.competitionId && competitionDetails[event.competitionId]
          const startTime = competition
            ? formatToNZTime(competition.startTime)
            : "Loading..."
          const endTime = competition
            ? formatToNZTime(competition.endTime)
            : "Loading..."
          const isInTime =
            event.competitionId && competitionInTimeMap[event.competitionId]

          return (
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
                  {event.competitionId && (
                    <>
                      <p className="text-muted mb-1">
                        <strong>Start Time:</strong> {startTime}
                      </p>
                      <p className="text-muted mb-0">
                        <strong>End Time:</strong> {endTime}
                      </p>
                    </>
                  )}
                </Col>
                <Col
                  xs={2.1}
                  className="d-flex flex-column justify-content-end"
                >
                  {isUserJoined(event.name) ? (
                    <>
                      <Button
                        variant="outline-secondary"
                        className="mb-2"
                        disabled
                      >
                        Joined!
                      </Button>
                      {event.competitionId ? (
                        <Button
                          variant="success"
                          onClick={() =>
                            handleJoinCompetition(event.competitionId)
                          }
                          disabled={!isInTime}
                        >
                          Compete!
                        </Button>
                      ) : (
                        <Button variant="secondary" className="mb-2" disabled>
                          No Competition
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => handleJoin(event.name)}
                    >
                      Join
                    </Button>
                  )}
                </Col>
              </Card.Body>
            </Card>
          )
        })}
      </Col>

      {/* User Details Section */}
      <Col md={3}>
        <Card>
          <Card.Body>
            <h5>User Details</h5>
            <p>
              Name: {user.name}
              <br /> Email: {user.email}
            </p>
            <Button variant="secondary" onClick={() => setShowModal(true)}>
              Edit Name
            </Button>
          </Card.Body>
        </Card>
      </Col>

      {/* Modal for Changing Name */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>New Name</Form.Label>
              <Form.Control
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleNameChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  )
}

export default EventListWithUserDetails
