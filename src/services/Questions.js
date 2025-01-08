import axios from "axios"
const baseUrl = "http://localhost:8080/api/questions"

const getQuestions = () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"))
  return axios.get(`${baseUrl}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
}

export default {
  getQuestions,
}
