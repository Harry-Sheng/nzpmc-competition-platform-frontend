import axios from "axios";
const baseUrl = "http://localhost:3001/api/events";

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const fetchEvents = () => {
  return axios.get(baseUrl);
};

export default {
  create,
  fetchEvents,
};
