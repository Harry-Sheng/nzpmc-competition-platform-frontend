import axios from "axios"
const baseUrl = "http://localhost:8080/api/competitions"

const fetchCompetitions = () => {
  return axios.get(baseUrl)
}

export default {
  fetchCompetitions,
}
