import { Card, Row, Col, Button, Modal, Form } from "react-bootstrap";
import Exam from "../assets/exam.png";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import eventService from "../services/Events";
import userService from "../services/User";

const EventListWithUserDetails = ({ events, userEvents, setUserEvents }) => {
  const { user, setUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");

  const isUserJoined = (eventId) => {
    if (!userEvents) {
      return false;
    }
    return userEvents.some((userEvent) => userEvent._id === eventId);
  };

  const handleJoin = async (eventId) => {
    const updatedEvent = await eventService.joinEvent(eventId, user.token);
    setUserEvents((prevUserEvents) => [...prevUserEvents, updatedEvent.event]);
  };

  const handleNameChange = async () => {
    try {
      const updatedUser = await userService.updateUserName(newName, user.token);
      setUser((prevUser) => ({ ...prevUser, name: updatedUser.name }));
      setShowModal(false);
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

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
                {isUserJoined(event._id) ? (
                  <Button variant="outline-secondary" disabled>
                    Joined!
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => handleJoin(event._id)}
                  >
                    Join
                  </Button>
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
  );
};

export default EventListWithUserDetails;
