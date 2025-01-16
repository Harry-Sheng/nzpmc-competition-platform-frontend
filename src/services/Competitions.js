import axios from "axios"
const baseUrl = "http://localhost:8080/api/competitions"

const fetchCompetitions = () => {
  return axios.get(baseUrl)
}

const create = (newObject) => {
  const user = JSON.parse(localStorage.getItem("loggedUser"))

  return axios.post(baseUrl, newObject, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
}

const fetchQuestions = (competitionId) => {
  return axios.get(`${baseUrl}/${competitionId}/questions`)
}

const addQuestionToCompetition = (competitionId, questionTitle) => {
  const user = JSON.parse(localStorage.getItem("loggedUser"))

  return axios.post(
    `${baseUrl}/${competitionId}/questions`,
    { title: questionTitle },
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  )
}

const getCompetitionById = (competitionId) => {
  return axios.post(`${baseUrl}/getById`, { competitionId })
}

const isInCompetitionTime = (competitionId) => {
  return axios.post(`${baseUrl}/inInCompetitionTime`, { competitionId })
}

const deleteCompetition = (competitionId) => {
  const user = JSON.parse(localStorage.getItem("loggedUser"))

  return axios.delete(`${baseUrl}/${competitionId}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
}

export default {
  fetchCompetitions,
  create,
  fetchQuestions,
  addQuestionToCompetition,
  getCompetitionById,
  isInCompetitionTime,
  deleteCompetition,
}
