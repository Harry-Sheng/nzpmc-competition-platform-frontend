import { CompetitionEndCard } from "./../components/CompetitionEndCard"
import { CompetitionQuestionCard } from "./../components/CompetitionQuestionCard"
import { CompetitionSideBar } from "./../components/CompetitionSideBar"
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
          <CompetitionEndCard
            competitionId={competitionId}
            formatTime={formatTime}
            timeElapsed={timeElapsed}
            progress={progress}
            redirectToHomePage={redirectToHomePage}
          />
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
              <CompetitionSideBar
                formatTime={formatTime}
                timeElapsed={timeElapsed}
                progress={progress}
                currentQuestion={currentQuestion}
                handleQuestionSelect={handleQuestionSelect}
                handleSubmit={handleSubmit}
                questions={questions}
                selectedAnswers={selectedAnswers}
              />
            </Col>

            {/* Question */}
            <Col md={9}>
              <CompetitionQuestionCard
                currentQuestion={currentQuestion}
                handleOptionSelect={handleOptionSelect}
                handleQuestionSelect={handleQuestionSelect}
                questions={questions}
                selectedAnswers={selectedAnswers}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
export default CompetitionPage
