import { Form, Button } from "react-bootstrap"

const SignUpForm = ({
  email,
  password,
  name,
  setEmail,
  setPassword,
  setName,
  handleSignUp,
}) => {
  return (
    <Form
      onSubmit={handleSignUp}
      className="p-4 border rounded shadow-sm bg-light"
      style={{ margin: "auto" }}
    >
      <h2 className="text-center mb-4">Sign Up</h2>
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
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100">
        SignUp
      </Button>
    </Form>
  )
}

export default SignUpForm
