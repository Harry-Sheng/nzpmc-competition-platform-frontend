import axios from "axios";
const baseUrl = "http://localhost:3001/api/users";

const signUp = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const getUsers = () => {
  return axios.get(baseUrl);
};

const deleteEntries = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const fetchUserEvents = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("User Events:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch user events:",
      error.response?.data || error.message
    );
  }
};

const updateUserName = async (newName, token) => {
  const response = await axios.put(
    `${baseUrl}/name`,
    { name: newName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Updated User Name:", response.data);
  return response.data;
};

export default {
  signUp,
  create,
  deleteEntries,
  fetchUserEvents,
  updateUserName,
  getUsers,
};
