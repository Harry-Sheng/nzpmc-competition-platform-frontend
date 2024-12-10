import { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import EventListLogged from "../components/EventListLogged";
import { UserContext } from "../context/UserContext";
import eventsService from "../services/Events";
import userService from "../services/User";
import AdminDashboard from "../components/Admin";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  //redirect to landing page if user is not admin or/and not logged in
  useEffect(() => {
    console.log("User:", user);
    if (user === null) return;
    if (user === null || user.role !== "admin") {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    eventsService.fetchEvents().then((response) => {
      console.log("Events:", response.data);
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
      <AdminDashboard users={users}></AdminDashboard>
    </div>
  );
};

export default AdminPage;
