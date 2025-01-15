import { Button, Card, Col, Row } from "react-bootstrap"

export function CompetitionQuestionCard({
  currentQuestion,
  handleOptionSelect,
  handleQuestionSelect,
  questions,
  selectedAnswers,
}) {
  return (
    <>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title as="h2" className="mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </Card.Title>
          <Card.Text className="fs-5">
            {questions[currentQuestion].title}
          </Card.Text>
        </Card.Body>
      </Card>
      <Row className="g-4 mb-4">
        {questions[currentQuestion].options.map((option, index) => (
          <Col sm={6} key={index}>
            <Button
              variant={
                selectedAnswers.get(questions[currentQuestion].title) === index
                  ? "primary text-white"
                  : "outline-primary text-black"
              }
              className={`w-100 py-4 d-flex align-items-center justify-content-center`}
              onClick={() => handleOptionSelect(index)}
            >
              <span className="me-2">{String.fromCharCode(65 + index)}.</span>{" "}
              {option}
            </Button>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-between">
        <Button
          variant="primary"
          onClick={() => handleQuestionSelect(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            handleQuestionSelect(
              Math.min(questions.length - 1, currentQuestion + 1)
            )
          }
          disabled={currentQuestion === questions.length - 1}
        >
          Next
        </Button>
      </div>
    </>
  )
}
