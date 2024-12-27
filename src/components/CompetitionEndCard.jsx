import { Card, Button, ProgressBar } from "react-bootstrap"

export function CompetitionEndCard({
  competitionId,
  formatTime,
  timeElapsed,
  progress,
  redirectToHomePage,
}) {
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">
          Congratulations! You have completed {competitionId}!
        </Card.Title>
        <Card.Text className="fs-5 mb-4">
          Time taken: {formatTime(timeElapsed)}
        </Card.Text>
        <ProgressBar now={progress} className="mb-4" />
        <Button variant="primary" onClick={redirectToHomePage} className="mt-3">
          Home Page
        </Button>
      </Card.Body>
    </Card>
  )
}
