import { useEffect, useState } from "react"
import { useParams, Navigate } from "react-router-dom"
import competitionService from "../services/Competitions"

const ProtectedCompetitionRoute = ({ element: Component }) => {
  const { competitionId } = useParams()
  const [isAllowed, setIsAllowed] = useState(null) // null = loading, true/false = result

  useEffect(() => {
    const checkCompetitionTime = async () => {
      try {
        const response =
          await competitionService.isInCompetitionTime(competitionId)
        setIsAllowed(response.data)
      } catch (error) {
        console.error("Error checking competition time:", error)
        setIsAllowed(false)
      }
    }

    checkCompetitionTime()
  }, [competitionId])

  if (isAllowed === null) {
    return <div>Loading...</div>
  }

  return isAllowed ? <Component /> : <Navigate to="/" />
}

export default ProtectedCompetitionRoute
