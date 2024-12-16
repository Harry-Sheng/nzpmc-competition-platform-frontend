import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"

const ProtectedRoute = ({ element, roleRequired }) => {
  const { user, loading } = useContext(UserContext)
  console.log("User in ProtectedRoute:", user)
  console.log("Loading in ProtectedRoute:", loading)
  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" replace />
  }

  return element
}

export default ProtectedRoute
