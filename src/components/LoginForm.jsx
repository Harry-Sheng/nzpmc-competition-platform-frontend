import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const LoginForm = ({ email, password, setEmail, setPassword, handleLogin }) => {
  return (
    <Form
      onSubmit={handleLogin}
      className="p-4 border rounded shadow-sm bg-light"
      style={{ margin: "auto" }}
    >
      <h2 className="text-center mb-4">Login</h2>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
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
      <div className="d-flex justify-content-between">
        <Link to="/signup" className="w-50 me-2">
          <Button variant="secondary" className="w-100">
            Don't have account? Create account
          </Button>
        </Link>
        <Button variant="primary" type="submit" className="w-50">
          Login
        </Button>
      </div>
    </Form>
  )
}

export default LoginForm
