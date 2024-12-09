import { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import EventListLogged from "../components/EventListLogged";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const LandingPageLogged = () => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get("http://localhost:3001/api/events").then((response) => {
      console.log("event promise fulfilled");
      console.log(response.data);
      setEvents(response.data);
    });
    console.log(user);
  }, []);

  return (
    <div className="container">
      <Header
        title={"Welcome to NZPMC"}
        subtitle={"Portal for NZPMC event registration."}
      />
      <EventListLogged events={events} user={user} />
    </div>
  );
};

export default LandingPageLogged;
