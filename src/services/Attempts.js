import axios from "axios"
const baseUrl = "http://localhost:8080/api/attempts"

const generateResults = (competitionId) => {
  return axios.get(`${baseUrl}/${competitionId}/results`)
}

const saveAttempt = (competitionId, attempt) => {
  console.log("attempt", attempt)
  return axios.post(`${baseUrl}/${competitionId}`, attempt)
}

export default {
  generateResults,
  saveAttempt,
}
