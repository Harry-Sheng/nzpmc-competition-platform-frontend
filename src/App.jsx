import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserProvider from "./context/UserContext";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./Route/ProtectedRoute";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute element={<AdminPage />} roleRequired="admin" />
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
