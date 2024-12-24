import React from "react"
import { Card, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import Exam from "../assets/exam.png"

const AdminCompetitionCard = ({ competition }) => (
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
      </Col>
      <Col xs={2} className="d-flex justify-content-end">
        <Link to={`/addquestion/${competition.title}`}>
          <Button variant="primary">Add Question</Button>
        </Link>
      </Col>
    </Card.Body>
  </Card>
)

export default AdminCompetitionCard
