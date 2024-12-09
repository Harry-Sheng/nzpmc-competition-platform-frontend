import { Card, Row, Col, Button } from "react-bootstrap";
import Exam from "../assets/exam.png";

const EventListWithUserDetails = ({ events, user }) => {
  return (
    <Row className="g-4">
      {/* Events Section */}
      <Col md={9}>
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
              <Col xs={7} className="ps-3">
                <h5 className="mb-1">{event.name}</h5>
                <p className="text-muted mb-1">{event.description}</p>
                <p className="text-muted mb-0">{event.date}</p>
              </Col>
              <Col xs={3} className="ps-3">
                {event.joined ? (
                  <Button variant="outline-secondary" disabled>
                    Joined!
                  </Button>
                ) : (
                  <Button variant="primary">Join</Button>
                )}
              </Col>
            </Card.Body>
          </Card>
        ))}
      </Col>

      {/* User Details Section */}
      <Col md={3}>
        <Card>
          <Card.Body>
            <h5>User Details</h5>
            <p>Name: {user.name}</p>
            <Button variant="secondary">Edit Name</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default EventListWithUserDetails;
