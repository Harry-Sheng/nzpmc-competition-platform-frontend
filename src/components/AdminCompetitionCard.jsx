import React from "react"
import { Card, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import Exam from "../assets/exam.png"
import { formatToNZTime } from "../utils/date"

const AdminCompetitionCard = ({ competition, deleteCompetition }) => {
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
        <Col xs={2} className="d-flex flex-column justify-content-end">
          <Link to={`/addquestion/${competition.title}`}>
            <Button variant="primary" className="mb-2">
              Add Question
            </Button>
          </Link>
          <Button
            variant="danger"
            onClick={() => deleteCompetition(competition.title)}
          >
            Delete
          </Button>
        </Col>
      </Card.Body>
    </Card>
  )
}

export default AdminCompetitionCard
