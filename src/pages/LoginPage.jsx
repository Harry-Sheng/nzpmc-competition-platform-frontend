import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import loginService from "../services/login";
import Notification from "../components/Notification";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        email,
        password,
      });
      setUser(user);
      setEmail("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong Email or Password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="container">
      <Header
        title={"Login to NZPMC Portal"}
        subtitle={
          "Here, you can register for workshops and competitions.\
          Use your registered email to sign in."
        }
      />
      <Notification message={errorMessage} />
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
  );
};

export default LoginPage;
