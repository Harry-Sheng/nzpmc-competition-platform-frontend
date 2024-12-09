import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Notification from "../components/Notification";

const LandingPage = () => {
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
    </div>
  );
};

export default LandingPage;
