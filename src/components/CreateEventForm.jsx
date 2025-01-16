import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import Notification from "./Notification"
import eventService from "../services/Events"

const CreateEventForm = ({ fetchData }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleCreateEvent = async (event) => {
    event.preventDefault()
    if (!name || !description || !date) {
      setErrorMessage("Please fill out all fields correctly.")
      setTimeout(() => setErrorMessage(null), 5000)
      return
    }

    try {
      const createdEvent = await eventService.create({
        name,
        description,
        date,
      })
      setName("")
      setDescription("")
      setDate("")

      setSuccessMessage("Event created successfully")
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      await fetchData()
    } catch (error) {
      console.error("Failed to create event:", error)
      setErrorMessage("Event already exists")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      <Form
        onSubmit={handleCreateEvent}
        className="p-4 border rounded shadow-sm bg-light"
        style={{ margin: "auto" }}
      >
        <h3 className="text-center mb-4">Create Event</h3>
        <Form.Group className="mb-3" controlId="eventName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="eventDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="eventDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter event date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
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

export default CreateEventForm
