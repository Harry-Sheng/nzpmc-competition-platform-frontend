import { useState } from "react"
import {
  Button,
  Form,
  Card,
  ListGroup,
  InputGroup,
  CloseButton,
} from "react-bootstrap"
import getChatGptResponse from "../../services/ChatGPT"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const ChatPopUp = ({ onClose }) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const welcomeMessage = [
    "Hi, I'm Harry - your NZPMC virtual assistant. Ask me a question and I'll try to help.",
    "I can provide info about NZPMC, answer questions about competitions.",
  ]
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (input.trim() === "") return

    setIsTyping(true)

    // Add user message
    const userMessage = { role: "user", content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")

    // Call backend for ChatGpt response
    try {
      const response = await getChatGptResponse(updatedMessages)
      const chatGptResponse = response.data.choices[0].message.content

      const chatGptMessage = {
        role: "assistant",
        content: chatGptResponse,
      }

      setMessages((prevMessages) => [...prevMessages, chatGptMessage])
    } catch (error) {
      console.error(error)
      const errorMessage = {
        role: "assistant",
        content: "An error occurred while fetching the response.",
      }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <Card style={{ width: "24rem" }}>
      <Card.Header className="d-flex justify-content-between">
        <span>Harry</span>
        <CloseButton onClick={onClose} />
      </Card.Header>
      <Card.Body>
        <ListGroup
          style={{
            minHeight: "60vh",
            maxHeight: "60vh",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {welcomeMessage.map((welcomeMessage, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-start"
              style={{ border: "none" }}
            >
              <div className="bg-light rounded p-2">{welcomeMessage}</div>
            </ListGroup.Item>
          ))}

          {messages.map((m, index) => (
            <ListGroup.Item
              key={index}
              className={`d-flex ${m.role === "user" ? "justify-content-end" : "justify-content-start"}`}
              style={{ border: "none" }}
            >
              <div
                className={`markdown-container ${
                  m.role === "user"
                    ? "bg-primary text-white rounded p-2"
                    : "bg-light rounded p-2"
                }`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {m.content}
                </ReactMarkdown>
              </div>
            </ListGroup.Item>
          ))}

          {isTyping && (
            <ListGroup.Item
              className="d-flex justify-content-start"
              style={{ border: "none" }}
            >
              <div className="bg-light rounded p-2">Harry is typing...</div>
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
