import React from "react"
import { Modal, Button, Row, Col } from "react-bootstrap"

const ResultModal = ({ show, results, selectedEvent, onClose }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Results for {selectedEvent?.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {results ? (
        <>
          <Row>
            <Col>
              <h5>Email</h5>
            </Col>
            <Col>
              <h5>Result</h5>
            </Col>
          </Row>
          {results.map((result, index) => (
            <Row key={index}>
              <Col>{result.email}</Col>
              <Col>{result.result}</Col>
            </Row>
          ))}
        </>
      ) : (
        <p>No results available.</p>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
)

export default ResultModal
