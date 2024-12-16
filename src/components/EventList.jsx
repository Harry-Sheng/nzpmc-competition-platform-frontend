import { Card, Row, Col, Button } from "react-bootstrap"
import Exam from "../assets/exam.png"
import { Link } from "react-router-dom"

const EventList = ({ events }) => {
  return (
    <Row className="g-4">
      {events.map((event, index) => (
        <Col key={index} md={6} lg={4}>
          <Card>
            <Card.Img variant="top" src={Exam} alt="Event" />
            <Card.Body>
              <Card.Title>{event.name}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {event.description}
                <br />
                <strong>Date:</strong> {event.date}
              </Card.Text>
              <Link to="/signup">
                <Button variant="primary">Create account</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default EventList
