import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Notification from "../components/Notification";
import EventList from "../components/EventList";
import axios from "axios";

const LandingPageNotLogged = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/events").then((response) => {
      console.log("promise fulfilled");
      console.log(response.data);
      setEvents(response.data);
    });
  }, []);

  return (
    <div className="container">
      <Header
        title={"Welcome to NZPMC"}
        subtitle={
          "All-in-one portal for NZPMC event registration, payment, resultdashboard."
        }
      />
      <Notification
        message="You are not logged in. Click login to register for event"
        variant="info"
      />
      <EventList events={events} />
    </div>
  );
};

export default LandingPageNotLogged;
