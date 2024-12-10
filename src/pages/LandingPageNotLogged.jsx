import { useState, useEffect } from "react";
import Header from "../components/Header";
import Notification from "../components/Notification";
import EventList from "../components/EventList";
import eventsService from "../services/Events";

const LandingPageNotLogged = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    eventsService.fetchEvents().then((response) => {
      console.log("event promise fulfilled");
      console.log(response.data);
      setEvents(response.data);
    });
  }, []);

  return (
    <div>
      <Header
        title={"Welcome to NZPMC"}
        subtitle={"Portal for NZPMC event registration."}
      />
      <div className="container">
        <Notification
          message="You are not logged in. Click login to register for event"
          variant="info"
        />
        <EventList events={events} />
      </div>
    </div>
  );
};

export default LandingPageNotLogged;
