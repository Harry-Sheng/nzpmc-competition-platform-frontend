import { Card, Row, Col, Button, Modal, Form } from "react-bootstrap";
import Exam from "../assets/exam.png";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import eventService from "../services/Events";
import userService from "../services/User";

const AdminDashboard = ({ events }) => {
  const { user, setUser } = useContext(UserContext);

  return (
    <Row className="g-4">
      {/* Events Section */}
      <Col md={9}>
        <h2 className="mb-4"> Events</h2>
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
            </Card.Body>
          </Card>
        ))}
      </Col>

      {/* User Details Section */}
      <Col md={3}>
        <Card>
          <Card.Body>
            <Button variant="secondary" onClick={() => setShowModal(true)}>
              Edit Name
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminDashboard;
