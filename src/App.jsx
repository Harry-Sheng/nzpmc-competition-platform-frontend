import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import UserProvider from "./context/UserContext"
import AdminPage from "./pages/AdminPage"
import ProtectedRoute from "./Route/ProtectedRoute"
import AddQuestionPage from "./pages/AddQuestionPage"
import CompetitionPage from "./pages/CompetitionPage"

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
          <Route
            path="/addquestion/:competitionId"
            element={
              <ProtectedRoute
                element={<AddQuestionPage />}
                roleRequired="admin"
              />
            }
          />
          <Route
            path="/competition/:competitionId"
            element={<CompetitionPage />}
          />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
