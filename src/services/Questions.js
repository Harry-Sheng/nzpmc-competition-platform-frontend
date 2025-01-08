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

const createQuestion = (newQuestion) => {
  const user = JSON.parse(localStorage.getItem("loggedUser"))
  console.log("Creating question", newQuestion)
  return axios.post(
    `${baseUrl}`,
    { ...newQuestion },
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  )
}

export default {
  getQuestions,
  createQuestion,
}
