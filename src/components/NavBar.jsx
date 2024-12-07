import React from "react";
import { Link } from "react-router-dom";
import "../style/NavBar.css";
import Logo from "../assets/nzpmcLogo.png";

const NavBar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={Logo} alt="NZPMC Logo" />
          <span>The NZPMC</span>
        </Link>
      </div>
      <div className="navbar-links">
        {!isLoggedIn ? (
          <Link to="/login" className="navbar-link">
            Login
          </Link>
        ) : (
          <>
            <button onClick={onSignOut} className="navbar-button">
              Sign out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
