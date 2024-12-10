import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import userService from "../services/User";
import Notification from "../components/Notification";
import SignUpForm from "../components/SignUpForm";
import { UserContext } from "../context/UserContext";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const user = await userService.signUp({
        email,
        password,
        name,
      });
      setEmail("");
      setPassword("");
      setName("");
      //redirect to login after sign up
      navigate("/login");
    } catch (exception) {
      setErrorMessage("This email has already signed up.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <Header
        title={"Welcome to NZPMC Registration Page"}
        subtitle={
          "Register to our platform to join and accept invitations\
           to our exclusive competitions and workshops."
        }
      />
      <div className="container">
        <Notification message={errorMessage} variant="danger" />
        {user === null && (
          <SignUpForm
            email={email}
            password={password}
            name={name}
            setEmail={setEmail}
            setPassword={setPassword}
            setName={setName}
            handleSignUp={handleSignUp}
          />
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
