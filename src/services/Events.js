import axios from "axios"
const baseUrl = "http://localhost:8080/api/events"

const create = (newObject) => {
  const user = JSON.parse(localStorage.getItem("loggedUser"))

  return axios.post(baseUrl, newObject, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
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
  const user = JSON.parse(localStorage.getItem("loggedUser"))

  const response = await axios.put(
    `${baseUrl}/${eventId}/competition`,
    {
      title: competitionTitle,
    },
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  )
  return response.data
}

const deleteEvent = (eventId) => {
  const user = JSON.parse(localStorage.getItem("loggedUser"))

  return axios.delete(`${baseUrl}/${eventId}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
}

export default {
  create,
  fetchEvents,
  joinEvent,
  linkCompetitionToEvent,
  deleteEvent,
}
