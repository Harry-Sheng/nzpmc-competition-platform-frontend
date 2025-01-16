import React from "react"
import { Card, Col, Button, Dropdown, DropdownButton } from "react-bootstrap"
import Exam from "../assets/exam.png"

const AdminEventCard = ({
  event,
  competitions,
  handleCompetitionSelect,
  generateResult,
  deleteEvent,
}) => (
  <Card className="mb-3 shadow-sm rounded">
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
            <Dropdown.Item key={competition.title} eventKey={competition.title}>
              {competition.title}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <Button
          variant="success"
          onClick={() => generateResult(event)}
          disabled={!event.competitionId}
          className="mb-2"
        >
          Result
        </Button>
        <Button variant="danger" onClick={() => deleteEvent(event.name)}>
          Delete
        </Button>
      </Col>
    </Card.Body>
  </Card>
)

export default AdminEventCard
