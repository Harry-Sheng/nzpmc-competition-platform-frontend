import { useState, useEffect, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { Container, Row, Col, Button, Card, ProgressBar } from "react-bootstrap"
import NavBar from "../components/NavBar"
import competitionService from "../services/Competitions"
import attemptService from "../services/Attempts"

const CompetitionPage = () => {
  const { competitionId } = useParams()
  const { user } = useContext(UserContext)
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState(new Map())
  const [finishedCompetition, setFinishedCompetition] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const Navigate = useNavigate()

  useEffect(() => {
    fetchQuestions()
  }, [])

  useEffect(() => {
    const timerId = setInterval(() => {
      if (!finishedCompetition) {
        setTimeElapsed((prevTime) => prevTime + 1)
      }
    }, 1000)
    return () => clearInterval(timerId)
  }, [finishedCompetition])

  const fetchQuestions = async () => {
    const response = await competitionService.fetchQuestions(competitionId)
    const fetchedQuestions = response.data
    console.log(response.data)
    setQuestions(fetchedQuestions)
    const initialAnswers = new Map(
      fetchedQuestions.map((question) => [question.title, -1])
    )
    setSelectedAnswers(initialAnswers)
  }

  const handleQuestionSelect = (index) => {
    setCurrentQuestion(index)
  }

  const handleOptionSelect = (optionIndex) => {
    const newAnswers = new Map(selectedAnswers)
    const title = questions[currentQuestion].title
    if (newAnswers.get(title) === optionIndex) {
      newAnswers.set(title, -1)
    } else {
      newAnswers.set(title, optionIndex)
    }
    setSelectedAnswers(newAnswers)
  }

  const handleSubmit = () => {
    setFinishedCompetition(true)
    saveAttempt()
  }

  const saveAttempt = async () => {
    console.log(selectedAnswers)
    const newAttempt = {
      studentEmail: user.email,
      competitionId: competitionId,
      attempts: Object.fromEntries(selectedAnswers),
    }
    console.log(newAttempt)
    attemptService.saveAttempt(competitionId, newAttempt)
  }
  const redirectToHomePage = () => {
    Navigate("/")
  }

  const progress =
    (Array.from(selectedAnswers.values()).filter((answer) => answer !== -1)
      .length /
      questions.length) *
    100

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  if (questions.length === 0) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <h3>Loading questions...</h3>
      </div>
    )
  }

  if (finishedCompetition) {
    return (
      <div className="min-vh-100 py-4 bg-light d-flex align-items-center">
        <Container>
          <Card className="text-center">
            <Card.Body>
              <Card.Title as="h2" className="mb-4">
                Congratulations! You have completed {competitionId}!
              </Card.Title>
              <Card.Text className="fs-5 mb-4">
                Time taken: {formatTime(timeElapsed)}
              </Card.Text>
              <ProgressBar now={progress} className="mb-4" />
              <Button
                variant="primary"
                onClick={redirectToHomePage}
                className="mt-3"
              >
                Home Page
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
    )
  }

  return (
    <>
      <NavBar />
      <div className="min-vh-100 py-4 bg-light">
        <Container>
          <Row className="g-4">
            {/* Sidebar */}
            <Col md={3}>
              <Card>
                <Card.Body>
                  <h5>Time: {formatTime(timeElapsed)}</h5>
                  <ProgressBar
                    now={progress}
                    variant="success"
                    className="mb-3"
                  />
                  <div className="d-grid gap-2">
                    {questions.map((question, index) => (
                      <Button
                        key={index}
                        variant={
                          currentQuestion === index
                            ? "primary"
                            : "outline-primary"
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
                    <Button
                      variant="success"
                      className="mt-3"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Question */}
            <Col md={9}>
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
                        selectedAnswers.get(
                          questions[currentQuestion].title
                        ) === index
                          ? "primary"
                          : "outline-primary"
                      }
                      className={`w-100 py-4 d-flex align-items-center justify-content-center`}
                      onClick={() => handleOptionSelect(index)}
                    >
                      <span className="me-2">
                        {String.fromCharCode(65 + index)}.
                      </span>{" "}
                      {option}
                    </Button>
                  </Col>
                ))}
              </Row>
              <div className="d-flex justify-content-between">
                <Button
                  variant="primary"
                  onClick={() =>
                    handleQuestionSelect(Math.max(0, currentQuestion - 1))
                  }
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
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
export default CompetitionPage
