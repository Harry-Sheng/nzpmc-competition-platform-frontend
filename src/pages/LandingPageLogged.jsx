import { useState, useEffect } from "react";
import Header from "../components/Header";
import EventListLogged from "../components/EventListLogged";
import axios from "axios";

const LandingPageLogged = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/events").then((response) => {
      console.log("event promise fulfilled");
      console.log(response.data);
      setEvents(response.data);
    });
  }, []);

  return (
    <div className="container">
      <Header
        title={"Welcome to NZPMC"}
        subtitle={"Portal for NZPMC event registration."}
      />
      <EventListLogged events={events} />
    </div>
  );
};

export default LandingPageLogged;
