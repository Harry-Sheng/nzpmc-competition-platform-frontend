const LoginForm = ({ email, password, setEmail, setPassword, handleLogin }) => {
  return (
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
};

export default LoginForm;
