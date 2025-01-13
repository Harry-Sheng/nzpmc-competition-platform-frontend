import React from "react"
import { Card, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import Exam from "../assets/exam.png"

const AdminCompetitionCard = ({ competition }) => {
  // Convert UTC to New Zealand Time (NZT)
  const formatToNZTime = (utcDate) => {
    const options = {
      timeZone: "Pacific/Auckland",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Intl.DateTimeFormat("en-NZ", options).format(new Date(utcDate))
  }

  const startTimeNZ = competition.startTime
    ? formatToNZTime(competition.startTime)
    : "N/A"
  const endTimeNZ = competition.endTime
    ? formatToNZTime(competition.endTime)
    : "N/A"

  return (
    <Card className="mb-3 shadow-sm rounded">
      <Card.Body className="d-flex align-items-center">
        <Col xs={3}>
          <img
            src={Exam}
            alt="Competition"
            className="img-fluid rounded"
            style={{ maxHeight: "100px", objectFit: "cover" }}
          />
        </Col>
        <Col xs={6} className="ps-3">
          <h5 className="mb-1">{competition.title}</h5>
          <p className="mb-1">
            <strong>Start Time:</strong> {startTimeNZ}
          </p>
          <p className="mb-0">
            <strong>End Time:</strong> {endTimeNZ}
          </p>
        </Col>
        <Col xs={2} className="d-flex justify-content-end">
          <Link to={`/addquestion/${competition.title}`}>
            <Button variant="primary">Add Question</Button>
          </Link>
        </Col>
      </Card.Body>
    </Card>
  )
}

export default AdminCompetitionCard
