import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export function HeroSection({}) {
  return (
    <section
      className="py-5 text-white"
      style={{
        background: "linear-gradient(to right, #3b82f6, #9333ea)",
      }}
    >
      <Container>
        <Row className="text-center">
          <Col>
            <h1 className="display-4 fw-bold">Welcome to NZPMC </h1>
            <p className="lead">
              Challenging Minds, Inspiring Futures – A Competition for Students,
              by Students.
            </p>
            <Link to="/signup">
              <Button
                variant="light"
                size="lg"
                className="text-primary fw-bold mt-3"
              >
                Register Now
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
