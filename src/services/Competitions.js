import axios from "axios"
const baseUrl = "http://localhost:8080/api/competitions"

const fetchCompetitions = () => {
  return axios.get(baseUrl)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const fetchQuestions = (competitionId) => {
  return axios.get(`${baseUrl}/${competitionId}/questions`)
}

const addQuestionToCompetition = (competitionId, questionTitle) => {
  console.log(questionTitle)
  return axios.post(`${baseUrl}/${competitionId}/questions`, {
    title: questionTitle,
  })
}

const getCompetitionById = (competitionId) => {
  return axios.post(`${baseUrl}/getById`, { competitionId })
}

const isInCompetitionTime = (competitionId) => {
  return axios.post(`${baseUrl}/inInCompetitionTime`, { competitionId })
}

export default {
  fetchCompetitions,
  create,
  fetchQuestions,
  addQuestionToCompetition,
  getCompetitionById,
  isInCompetitionTime,
}
