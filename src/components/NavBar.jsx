import React from "react";
import { Link } from "react-router-dom";
import "../style/NavBar.css";
import Logo from "../assets/nzpmcLogo.png";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={Logo} alt="NZPMC Logo" />
          <span>The NZPMC</span>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/login" className="navbar-link">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
