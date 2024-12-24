import React from "react"
import { Modal, Button } from "react-bootstrap"

const ResultModal = ({ show, results, selectedEvent, onClose }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Results for {selectedEvent?.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {results ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <strong>Email:</strong> {result.email} <br />
              <strong>Result:</strong> {result.result}
            </li>
          ))}
        </ul>
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
