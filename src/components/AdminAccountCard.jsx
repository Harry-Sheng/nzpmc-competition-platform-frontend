import React from "react"
import { Card, Col, Button } from "react-bootstrap"
import Exam from "../assets/exam.png"

const AdminAccountCard = ({ user, deleteUser }) => (
  <Card className="mb-3 shadow-sm rounded">
    <Card.Body className="d-flex align-items-center">
      <Col xs={3}>
        <img
          src={Exam}
          alt="Account"
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
      <Col xs={2} className="d-flex flex-column justify-content-end">
        <Button variant="danger" onClick={() => deleteUser(user.email)}>
          Delete
        </Button>
      </Col>
    </Card.Body>
  </Card>
)

export default AdminAccountCard
