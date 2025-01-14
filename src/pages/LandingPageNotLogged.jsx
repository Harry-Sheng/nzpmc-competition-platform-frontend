import { useState, useEffect } from "react"
import Notification from "../components/Notification"
import EventList from "../components/EventList"
import { Link } from "react-router-dom"
import eventsService from "../services/Events"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Trophy, PeopleFill, Gear } from "react-bootstrap-icons"
import NavBar from "../components/NavBar"

const LandingPageNotLogged = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    eventsService.fetchEvents().then((response) => {
      console.log("event promise fulfilled")
      console.log(response.data)
      setEvents(response.data)
    })
  }, [])

  return (
    <>
      <NavBar />
      <section
        className="py-5 text-white"
        style={{
          background: "linear-gradient(to right, #3b82f6, #9333ea)",
        }}
      >
        <Container>
          <Row className="text-center">
            <Col>
              <h1 className="display-4 fw-bold">NZPMC 2025</h1>
              <p className="lead">
                Challenging Minds, Inspiring Futures – A Competition for
                Students, by Students.
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
      <br />
      <Container>
        <h2 className="text-center fw-bold display-5 mb-4">
          About the Competition
        </h2>
        <p
          className="text-center mx-auto mb-5 text-muted"
          style={{ maxWidth: "700px" }}
        >
          The NZPMC is a nationwide standardised Physics and Mathematics
          organisation for High School students of all year levels throughout
          New Zealand. Our goal is to help young Kiwi Scientists extend their
          interest in Physics and Mathematics by providing a standardised
          national competition. The NZPMC is a competition created to test
          candidates' ability to use their Physics and Mathematics knowledge to
          tackle a wide range of problems based on Physical and Mathematical
          theory that matches competitions provided overseas.
        </p>
        <Row className="text-center g-4">
          <Col md={4}>
            <div className="d-flex flex-column align-items-center">
              <Trophy size={48} className="text-warning mb-3" />
              <h3 className="h5 fw-bold mb-2">Prestigious Awards</h3>
              <p className="text-muted">
                Compete for gold, silver, and bronze medals, as well as cash
                prizes.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="d-flex flex-column align-items-center">
              <PeopleFill size={48} className="text-primary mb-3" />
              <h3 className="h5 fw-bold mb-2">National Networking</h3>
              <p className="text-muted">
                Connect with brilliant minds from over 100 schools.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="d-flex flex-column align-items-center">
              <Gear size={48} className="text-success mb-3" />
              <h3 className="h5 fw-bold mb-2">Challenging Problems</h3>
              <p className="text-muted">
                Face mind-bending questions reviewed by university professors.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="container">
        <Notification
          message="You are not logged in. Click login to register for event"
          variant="info"
        />
        <EventList events={events} />
      </div>
    </>
  )
}

export default LandingPageNotLogged
