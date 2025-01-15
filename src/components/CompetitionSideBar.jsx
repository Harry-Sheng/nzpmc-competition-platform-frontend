import { Button, Card, ProgressBar } from "react-bootstrap"
import Notification from "./Notification"
import { useEffect, useState } from "react"

export function CompetitionSideBar({
  formatTime,
  remainingTime,
  progress,
  currentQuestion,
  handleQuestionSelect,
  handleSubmit,
  questions,
  selectedAnswers,
}) {
  const [errorMessage, setErrorMessage] = useState(false)

  useEffect(() => {
    // Show warning when 5 minutes (300 seconds) or less are left
    if (remainingTime <= 300 && remainingTime > 240) {
      setErrorMessage(true)
    } else {
      setErrorMessage(false)
    }
  }, [remainingTime])

  return (
    <Card>
      <Card.Body>
        {errorMessage && (
          <Notification message="Only 5 minutes left!" variant="warning" />
        )}
        <h5>Time: {formatTime(remainingTime)}</h5>
        <ProgressBar now={progress} variant="success" className="mb-3" />
        <div className="d-grid ">
          <div className="scrollable-xsmall">
            {questions.map((question, index) => (
              <Button
                key={index}
                variant={
                  currentQuestion === index
                    ? "primary"
                    : "outline-primary text-black"
                }
                className="text-start position-relative"
                onClick={() => handleQuestionSelect(index)}
              >
                Question {index + 1}
                {selectedAnswers.get(questions[index].title) !== -1 && (
                  <span className="position-absolute top-50 end-0 translate-middle-y me-2 text-success">
                    ✓
                  </span>
                )}
              </Button>
            ))}
          </div>
          <Button variant="success" className="mt-3" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}
