import axios from "axios"
const baseUrl = "http://localhost:8080/api/attempts"

const generateResults = (competitionId) => {
  return axios.get(`${baseUrl}/${competitionId}/results`)
}

export default {
  generateResults,
}
