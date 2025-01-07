import { useContext } from "react"
import { Link } from "react-router-dom"
import "../style/NavBar.css"
import Logo from "../assets/nzpmcLogo.png"
import { UserContext } from "../context/UserContext"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const NavBar = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem("loggedUser")
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={Logo} alt="NZPMC Logo" />
          <span>The NZPMC</span>
        </Link>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            {user.role === "admin" && (
              <Button
                variant="primary"
                onClick={() => navigate("/admin")}
                className="admin-button"
              >
                Dashboard
              </Button>
            )}
            <span style={{ margin: "0 5px" }}></span>
            <Button variant="danger" onClick={() => handleLogout()}>
              Logout
            </Button>
          </>
        ) : (
          <Link to="/login" className="navbar-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default NavBar
