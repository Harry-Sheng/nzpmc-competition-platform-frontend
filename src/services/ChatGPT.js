import axios from "axios"
const baseUrl = "http://localhost:8080/api/chatgpt"

const getChatGptResponse = async (messages) => {
  const payload = {
    messages: messages,
  }
  return axios.post(`${baseUrl}/chat`, payload)
}

export default getChatGptResponse
