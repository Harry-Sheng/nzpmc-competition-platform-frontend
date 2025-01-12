import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import Notification from "./Notification"
import competitionService from "../services/Competitions"

const CreateCompetitionForm = ({ fetchData }) => {
  const [title, setTitle] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  const handleCreateCompetition = async (event) => {
    event.preventDefault()

    // Validation: Check if endTime is before startTime
    if (new Date(endTime) <= new Date(startTime)) {
      setErrorMessage("End time must be after start time")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }

    try {
      const createdCompetition = await competitionService.create({
        title,
        startTime,
        endTime,
      })
      setTitle("")
      setStartTime("")
      setEndTime("")
      setSuccessMessage("Competition created successfully")
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      await fetchData()
    } catch (error) {
      console.error("Failed to create competition:", error)
      setErrorMessage("Competition already exists")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      <Form
        onSubmit={handleCreateCompetition}
        className="p-4 border rounded shadow-sm bg-light"
        style={{ margin: "auto" }}
      >
        <h3 className="text-center mb-4">Create Competition</h3>
        <Form.Group className="mb-3" controlId="eventName">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter competition Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="competitionStartTime">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="datetime-local"
            value={startTime}
            onChange={({ target }) => setStartTime(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="competitionEndTime">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="datetime-local"
            value={endTime}
            onChange={({ target }) => setEndTime(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Create
        </Button>
      </Form>
      <Notification message={errorMessage} variant="danger" />
      <Notification message={successMessage} variant="success" />
    </>
  )
}

export default CreateCompetitionForm
