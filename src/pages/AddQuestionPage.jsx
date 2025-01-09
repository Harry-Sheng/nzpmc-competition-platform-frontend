import Header from "../components/Header"
import { useParams } from "react-router-dom"
import QuestionList from "../components/QuestionList"
import { Row, Col } from "react-bootstrap"
import { useEffect, useState } from "react"
import competitionService from "../services/Competitions"
import CreateQuestionForm from "../components/CreateQuestionForm"
import QuestionPoll from "../components/QuestionPoll"
import questionService from "../services/Questions"

const AddQuestionPage = () => {
  const { competitionId } = useParams()
  const [questionList, setQuestionList] = useState([]) //Competition questions
  const [questionPoll, setQuestionPoll] = useState([]) //All questions

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionListResponse =
          await competitionService.fetchQuestions(competitionId)
        setQuestionList(questionListResponse.data)

        const questionPollResponse = await questionService.getQuestions()
        setQuestionPoll(questionPollResponse.data)

        console.log("Questions List fetched:", questionListResponse.data)
        console.log("Question poll fetched:", questionPollResponse.data)
      } catch (error) {
        console.error("Failed to fetch questions:", error)
      }
    }
    fetchQuestions()
  }, [])

  const handleQuestionListUpdate = (newQuestion) => {
    setQuestionList([...questionList, newQuestion])
  }

  const handleQuestionPollUpdate = (newQuestion) => {
    setQuestionPoll([...questionPoll, newQuestion])
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
          <Col md={8}>
            <QuestionList questions={questionList} />
          </Col>
          {/* Create Section */}
          <Col md={4}>
            <CreateQuestionForm
              handleQuestionUpdate={handleQuestionPollUpdate}
              competitionId={competitionId}
            ></CreateQuestionForm>
          </Col>
          <QuestionPoll
            competitionId={competitionId}
            questions={questionPoll}
            handleQuestionUpdate={handleQuestionListUpdate}
          />
        </Row>
      </div>
    </div>
  )
}

export default AddQuestionPage
