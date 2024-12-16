import { Form, Button } from "react-bootstrap"

const CreateEventForm = ({
  name,
  description,
  date,
  setName,
  setDescription,
  setDate,
  handleCreateEvent,
}) => {
  return (
    <Form
      onSubmit={handleCreateEvent}
      className="p-4 border rounded shadow-sm bg-light"
      style={{ margin: "auto" }}
    >
      <h2 className="text-center mb-4">Create Event</h2>
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
          type="text"
          placeholder="Enter event date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100">
        Create
      </Button>
    </Form>
  )
}

export default CreateEventForm
