import { Card, Col } from "react-bootstrap"
import Exam from "../assets/exam.png"
import "../style/styles.css"
import questionService from "../services/Questions"
import { useEffect, useState } from "react"

const QuestionPoll = () => {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await questionService.getQuestions()
        setQuestions(response.data)
        console.log("Questions fetched:", response.data)
      } catch (error) {
        console.error("Failed to fetch questions:", error)
      }
    }
    fetchQuestions()
  }, [])

  return (
    <>
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
