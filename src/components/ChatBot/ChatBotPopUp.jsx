import { useState } from "react"
import Button from "react-bootstrap/Button"
import ChatPopUp from "./ChatPopUp"
import { Robot } from "react-bootstrap-icons"

const ChatBotPopUp = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      style={{ position: "fixed", bottom: "1rem", right: "1rem", zIndex: 50 }}
    >
      {isOpen ? (
        <ChatPopUp onClose={() => setIsOpen(false)} />
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{ height: "3rem", width: "3rem" }}
          variant="primary"
        >
          <Robot size={30} color="white" />
        </Button>
      )}
    </div>
  )
}

export default ChatBotPopUp
