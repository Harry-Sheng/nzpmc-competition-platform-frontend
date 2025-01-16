import axios from "axios"
const baseUrl = "http://localhost:8080/api/attempts"

const generateResults = (competitionId) => {
  const user = JSON.parse(localStorage.getItem("loggedUser"))
  return axios.get(`${baseUrl}/${competitionId}/results`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
}

const saveAttempt = (competitionId, attempt) => {
  const user = JSON.parse(localStorage.getItem("loggedUser"))
  console.log("attempt", attempt)
  console.log("user", user)
  return axios.post(`${baseUrl}/${competitionId}`, attempt, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
}

export default {
  generateResults,
  saveAttempt,
}
