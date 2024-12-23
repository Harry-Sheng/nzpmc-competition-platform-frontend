import Header from "../components/Header"
import { useParams } from "react-router-dom"
import QuestionList from "../components/QuestionList"
import { Row, Col } from "react-bootstrap"
import { useEffect, useState } from "react"
import competitionService from "../services/Competitions"
import AddQuestionForm from "../components/CreateQuestionForm"

const AddQuestionPage = () => {
  const { competitionId } = useParams()
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await competitionService.fetchQuestions(competitionId)
        setQuestions(response.data)
        console.log("Questions fetched:", response.data)
      } catch (error) {
        console.error("Failed to fetch questions:", error)
      }
    }
    fetchQuestions()
  }, [])

  const handleQuestionUpdate = (newQuestion) => {
    setQuestions([...questions, newQuestion])
  }

  return (
    <div>
      <Header
        title={"Welcome Admin"}
        subtitle={
          "Here is the add question page for competition " + competitionId
        }
      />
      <div className="container">
        <Row className="g-4">
          <QuestionList questions={questions} />
          {/* Create Section */}
          <Col md={4}>
            <AddQuestionForm
              handleQuestionUpdate={handleQuestionUpdate}
              competitionId={competitionId}
            ></AddQuestionForm>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default AddQuestionPage
