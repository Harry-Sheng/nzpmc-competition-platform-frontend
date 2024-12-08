import React from "react";
import { Form, Button } from "react-bootstrap";

const LoginForm = ({ email, password, setEmail, setPassword, handleLogin }) => {
  return (
    <Form
      onSubmit={handleLogin}
      className="p-4 border rounded shadow-sm bg-light"
      style={{ maxWidth: "400px", margin: "auto" }}
    >
      <h2 className="text-center mb-4">Login</h2>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
