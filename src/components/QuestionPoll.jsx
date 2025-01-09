import { Card, Col, Button } from "react-bootstrap"
import Exam from "../assets/exam.png"
import "../style/styles.css"
import competitionService from "../services/Competitions"
import { useState } from "react"
import Notification from "./Notification"

const QuestionPoll = ({ questions, competitionId, handleQuestionUpdate }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const addToCompetition = async (question) => {
    try {
      await competitionService.addQuestionToCompetition(
        competitionId,
        question.title
      )
      handleQuestionUpdate(question)
      setSuccessMessage("Question created successfully!")
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (error) {
      console.error("Failed to add question:", error)
      setErrorMessage("Failed to add question. Please try again.")
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }
  return (
    <>
      {/* Notifications */}
      <Notification message={errorMessage} variant="danger" />
      <Notification message={successMessage} variant="success" />
      {/* Question List Section */}
      <Card className="mb-3 shadow-sm rounded">
        <Card.Header>
          <h4 className="mb-0">Question Poll</h4>
        </Card.Header>
        <Card.Body className="scrollable">
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <Card key={index} className="mb-3 shadow-sm rounded ">
                <Card.Body className="d-flex align-items-center">
                  <Col xs={3}>
                    <img
                      src={Exam}
                      alt="Question"
                      className="img-fluid rounded"
                      style={{ maxHeight: "100px", objectFit: "cover" }}
                    />
                  </Col>
                  <Col xs={7} className="ps-3">
                    <h5 className="mb-1">{question.title}</h5>
                    <div className="mb-1">
                      {question.options.map((option, idx) => (
                        <div key={idx}>
                          Option {idx + 1}: {option}
                        </div>
                      ))}
                    </div>
                    <p className="text-muted mb-0">
                      Correct Answer: Option {question.correctChoiceIndex}
                    </p>
                    <p className="text-muted mb-1">
                      <strong>Difficulty:</strong>{" "}
                      {question.difficulty !== null ? (
                        question.difficulty
                      ) : (
                        <>"N/A"</>
                      )}
                    </p>
                    <p className="text-muted mb-0">
                      <strong>Topics:</strong>{" "}
                      {question.topics !== null ? (
                        question.topics.join(", ")
                      ) : (
                        <>"N/A"</>
                      )}
                    </p>
                  </Col>
                  <Col xs={2} className="d-flex justify-content-end">
                    <Button
                      variant="success"
                      onClick={() => addToCompetition(question)}
                    >
                      Add to competition
                    </Button>
                  </Col>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No questions available.</p>
          )}
        </Card.Body>
      </Card>
    </>
  )
}

export default QuestionPoll
