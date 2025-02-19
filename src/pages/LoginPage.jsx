import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import loginService from "../services/Login"
import Notification from "../components/Notification"
import LoginForm from "../components/LoginForm"
import { UserContext } from "../context/UserContext"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user, setUser } = useContext(UserContext)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()

  //redirect to admin page if logged in
  useEffect(() => {
    if (user) {
      navigate("/admin")
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        email,
        password,
      })
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setUser(user)
      setEmail("")
      setPassword("")

      setTimeout(
        () => {
          window.localStorage.removeItem("loggedUser")
          setUser(null)
        },
        1000 * 60 * 60 * 24 // 1 day in milliseconds
      )
    } catch (exception) {
      setErrorMessage("Wrong Email or Password")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="bg-light">
      <Header
        title={"Login to NZPMC Portal"}
        subtitle={
          "Here, you can register for workshops and competitions.\
          Use your registered email to sign in."
        }
      />
      <div className="container">
        <Notification message={errorMessage} variant="danger" />
        {user === null && (
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        )}
      </div>
    </div>
  )
}

export default LoginPage
