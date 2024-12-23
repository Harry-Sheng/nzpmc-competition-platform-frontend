import axios from "axios"
const baseUrl = "http://localhost:8080/api/events"

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const fetchEvents = () => {
  return axios.get(baseUrl)
}

const joinEvent = async (eventId, token) => {
  const response = await axios.put(
    `${baseUrl}/${eventId}/signup`,
    {}, // empty body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  console.log("Updated Event:", response.data)
  return response.data
}

const linkCompetitionToEvent = async (eventId, competitionTitle) => {
  const response = await axios.put(`${baseUrl}/${eventId}/competition`, {
    title: competitionTitle,
  })
  return response.data
}

export default {
  create,
  fetchEvents,
  joinEvent,
  linkCompetitionToEvent,
}
