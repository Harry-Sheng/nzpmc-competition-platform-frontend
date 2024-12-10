import { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import EventListLogged from "../components/EventListLogged";
import { UserContext } from "../context/UserContext";
import eventsService from "../services/Events";
import userService from "../services/User";
import AdminDashboard from "../components/Admin";

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    eventsService.fetchEvents().then((response) => {
      setEvents(response.data);
    });
    userService.getUsers().then((response) => {
      console.log("Users:", response.data);
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="container">
      <Header
        title={"Welcome Admin"}
        subtitle={"Here is the Admin Dashboard"}
      />
      <AdminDashboard events={events} users={users}></AdminDashboard>
    </div>
  );
};

export default AdminPage;
