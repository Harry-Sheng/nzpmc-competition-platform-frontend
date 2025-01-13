import { Card, Row, Col, Button } from "react-bootstrap"
import Exam from "../assets/exam.png"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import competitionService from "../services/Competitions"
import { formatToNZTime } from "../utils/date"

const EventList = ({ events }) => {
  const [competitionDetails, setCompetitionDetails] = useState({})

  useEffect(() => {
    events.forEach((event) => {
      if (event.competitionId) {
        fetchCompetitionDetails(event.competitionId)
      }
    })
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

  return (
    <Row className="g-4">
      {events.map((event, index) => {
        const competition =
          event.competitionId && competitionDetails[event.competitionId]
        const startTime = competition
          ? formatToNZTime(competition.startTime)
          : "Loading..."
        const endTime = competition
          ? formatToNZTime(competition.endTime)
          : "Loading..."

        return (
          <Col key={index} md={6} lg={4}>
            <Card>
              <Card.Img variant="top" src={Exam} alt="Event" />
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>
                  <strong>Description:</strong> {event.description}
                  {event.competitionId && (
                    <>
                      <br />
                      <strong>Start Time:</strong> {startTime}
                      <br />
                      <strong>End Time:</strong> {endTime}
                    </>
                  )}
                </Card.Text>
                <Link to="/signup">
                  <Button variant="primary">Create account</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}

export default EventList
