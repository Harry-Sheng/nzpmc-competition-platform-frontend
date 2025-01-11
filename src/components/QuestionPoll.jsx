import { Card, Row, Col, Button, Form } from "react-bootstrap"
import Exam from "../assets/exam.png"
import "../style/styles.css"
import competitionService from "../services/Competitions"
import { useState, useEffect } from "react"
import Notification from "./Notification"

const QuestionPoll = ({ questions, competitionId, handleQuestionUpdate }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [filteredQuestions, setFilteredQuestions] = useState(questions)
  const [difficultyFilter, setDifficultyFilter] = useState("")
  const [topicFilter, setTopicFilter] = useState("")
  const availableTopics = ["Mechanics", "Waves", "Algebra", "Geometry"]

  useEffect(() => {
    setFilteredQuestions(questions)
  }, [questions])

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
      setErrorMessage("Failed to add question. Question already exists.")
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleFilter = () => {
    let filtered = questions

    if (difficultyFilter) {
      filtered = filtered.filter(
        (question) => question.difficulty === difficultyFilter
      )
    }

    if (topicFilter && topicFilter.length > 0) {
      filtered = filtered.filter(
        (question) =>
          question.topics &&
          question.topics.length === topicFilter.length &&
          topicFilter.every((topic) => question.topics.includes(topic))
      )
    }

    setFilteredQuestions(filtered)
  }

  const resetFilters = () => {
    setDifficultyFilter("")
    setTopicFilter("")
    setFilteredQuestions(questions)
  }

  const toggleTopicFilter = (topic) => {
    setTopicFilter((prevTopics) =>
      prevTopics.includes(topic)
        ? prevTopics.filter((t) => t !== topic)
        : [...prevTopics, topic]
    )
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

        {/* Filter Section */}
        <Card.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="difficultyFilter">
                  <Form.Label>Difficulty</Form.Label>
                  <Form.Control
                    as="select"
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </Form.Control>
                </Form.Group>
                <div className="mt-3">
                  <Button
                    variant="primary"
                    onClick={handleFilter}
                    className="me-2"
                  >
                    Apply Filters
                  </Button>
                  <Button variant="secondary" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="topics">
                  <Form.Label>Topics</Form.Label>
                  {availableTopics.map((topic) => (
                    <Form.Check
                      key={topic}
                      type="checkbox"
                      label={topic}
                      checked={topicFilter.includes(topic)}
                      onChange={() => toggleTopicFilter(topic)}
                    />
                  ))}
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>

        {/* Question List */}
        <Card.Body className="scrollable-large">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question, index) => (
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
