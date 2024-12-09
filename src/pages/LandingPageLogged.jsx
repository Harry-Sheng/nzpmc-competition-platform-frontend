import { useState, useEffect } from "react";
import Header from "../components/Header";

const LandingPage = () => {
  return (
    <div className="container">
      <Header
        title={"Welcome to NZPMC"}
        subtitle={
          "All-in-one portal for NZPMC event registration, payment, resultdashboard."
        }
      />
    </div>
  );
};

export default LandingPage;
