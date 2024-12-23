import { Card, Col } from "react-bootstrap"
import Exam from "../assets/exam.png"

const QuestionList = ({ questions }) => {
  return (
    <Col md={8}>
      {/* Question List Section */}
      <h2 className="mb-4">Questions</h2>
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <Card key={index} className="mb-3 shadow-sm rounded">
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
    </Col>
  )
}

export default QuestionList
