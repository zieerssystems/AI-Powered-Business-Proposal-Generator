import React from "react";
import { Button, Card, Carousel, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();


  return (
    <div className="homepage-container">
      {/* Banner Slider */}
      <Carousel fade controls indicators className="homepage-carousel">
        <Carousel.Item>
          <img className="d-block w-100 banner-img" src="/images/image1.jpg" alt="Slide 1" />
          <Carousel.Caption>
            <h1 className="banner-title">Welcome to Zieers Business Proposal</h1>
            <p className="banner-subtitle">Create powerful AI-generated proposals with ease.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100 banner-img" src="/images/image2.jpg" alt="Slide 2" />
          <Carousel.Caption>
            <h1 className="banner-title">Professional. Fast. Reliable.</h1>
            <p className="banner-subtitle">Designed for startups, businesses, and agencies.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* About Us Section */}
      <div className="about-section text-center">
        <Card className="about-card shadow-lg">
          <Card.Body>
            <Card.Title className="about-title">About Us</Card.Title>
            <Card.Text className="about-text">
              Zieers Business Proposal is a powerful AI-driven platform that helps businesses create well-structured and
              compelling proposals in minutes. Whether you're a startup or an established company, our tool streamlines
              the proposal process, making it faster and more efficient.
            </Card.Text>
          </Card.Body>
        </Card>

        <div className="button-group mt-4">
          <Button variant="success" size="lg" className="homepage-btn" onClick={() => navigate("/register")}>
            Register Now
          </Button>
          <Button variant="secondary" size="lg" className="homepage-btn ms-3" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </div>

     
<div
  className="home-background"
  style={{ backgroundImage: "url('/images/image3.jpg')" }}
>
      {/* Project Info Cards */}
    <Container fluid className="project-cards-container py-5">
      <Row className="gx-0">
        <Col xs={12} md={4} className="d-flex">
          <div className="project-card-wrapper">
            <Card className="project-card">
              <Card.Body>
                <Card.Title>AI-Powered Proposal Generation</Card.Title>
                <Card.Text>
                  Generate complete, structured business proposals instantly using advanced AI trained on professional templates.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col xs={12} md={4} className="d-flex">
          <div className="project-card-wrapper">
            <Card className="project-card">
              <Card.Body>
                <Card.Title>User-Friendly Interface</Card.Title>
                <Card.Text>
                  A clean and intuitive frontend helps users with no technical skills create, edit, and download proposals quickly.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col xs={12} md={4} className="d-flex">
          <div className="project-card-wrapper">
            <Card className="project-card">
              <Card.Body>
                <Card.Title>Secure Login & Profile</Card.Title>
                <Card.Text>
                  Secure email-based login and personalized profile management allow users to manage their proposals safely.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col xs={12} md={4} className="d-flex">
          <div className="project-card-wrapper">
            <Card className="project-card">
              <Card.Body>
                <Card.Title>Project Management</Card.Title>
                <Card.Text>
                  Create and organize multiple projects per user, each linked with its own proposal and details.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col xs={12} md={4} className="d-flex">
          <div className="project-card-wrapper">
            <Card className="project-card">
              <Card.Body>
                <Card.Title>PDF Download</Card.Title>
                <Card.Text>
                  Proposals can be instantly downloaded as professionally styled PDF documents for client sharing.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col xs={12} md={4} className="d-flex">
          <div className="project-card-wrapper">
            <Card className="project-card">
              <Card.Body>
                <Card.Title>Editable Proposals</Card.Title>
                <Card.Text>
                  Generated proposals can be reviewed and edited before saving or downloading, giving full control to the user.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>

</div>
    </div>
  );
};

export default HomePage;

