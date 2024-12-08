import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import loginService from "../services/login";
import Notification from "../components/Notification";
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
    console.log("logging in with", email, password);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        email
        <input
          type="text"
          value={email}
          name="email"
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
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
      {user === null && loginForm()}
    </div>
  );
};

export default LoginPage;
