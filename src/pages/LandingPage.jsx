import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <h1>Welcome to NZPMC</h1>
      <h2>
        All-in-one portal for NZPMC event registration, payment, result
        dashboard.
      </h2>
    </div>
  );
};

export default LandingPage;
