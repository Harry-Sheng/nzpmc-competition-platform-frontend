import { useState } from "react"
import {
  Button,
  Form,
  Card,
  ListGroup,
  InputGroup,
  CloseButton,
} from "react-bootstrap"

const ChatPopUp = ({ onClose }) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() === "") return

    // Add user message
    const userMessage = { id: Date.now(), role: "user", content: input }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")

    // Simulate AI response
    setIsTyping(true)
    setTimeout(() => {
      const aiMessage = {
        id: Date.now(),
        role: "ai",
        content: "This is a simulated AI response.",
      }
      setMessages((prevMessages) => [...prevMessages, aiMessage])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <Card style={{ width: "24rem" }}>
      <Card.Header className="d-flex justify-content-between">
        <span>AI Chatbot</span>
        <CloseButton onClick={onClose} />
      </Card.Header>
      <Card.Body>
        <ListGroup
          style={{ minHeight: "300px", maxHeight: "300px", overflowY: "auto" }}
        >
          {messages.map((m) => (
            <ListGroup.Item
              key={m.id}
              className={`d-flex ${m.role === "user" ? "justify-content-end" : "justify-content-start"}`}
              style={{ border: "none" }}
            >
              <div
                className={
                  m.role === "user"
                    ? "bg-primary text-white rounded p-2"
                    : "bg-light rounded p-2"
                }
              >
                {m.content}
              </div>
            </ListGroup.Item>
          ))}
          {isTyping && (
            <ListGroup.Item
              className="d-flex justify-content-start"
              style={{ border: "none" }}
            >
              <div className="bg-light rounded p-2">AI is typing...</div>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <Button type="submit" variant="primary" disabled={isTyping}>
              Send
            </Button>
          </InputGroup>
        </Form>
      </Card.Footer>
    </Card>
  )
}

export default ChatPopUp
