import { useState } from "react"
import Button from "react-bootstrap/Button"
import ChatPopUp from "./ChatPopUp"

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
          style={{ borderRadius: "50%", height: "3rem", width: "3rem" }}
          variant="primary"
        />
      )}
    </div>
  )
}

export default ChatBotPopUp
