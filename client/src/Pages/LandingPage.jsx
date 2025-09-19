import React from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import NavigationBar from "./Navbar";
import "./LandingPage.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate hook
import AboutUs from "./AboutUs";
import HowItWorks from "./HowItWorks";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    const userName = localStorage.getItem("userName"); // Check if user is logged in

    if (userName) {
      // If user is logged in, navigate to /home
      navigate("/home");
    } else {
      // If user is not logged in, navigate to /login
      navigate("/login");
    }
  };

  return (
    <div className="landing-page">
      <NavigationBar />
      <Container className="text-center py-5 mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="mb-4">
            <div className="letter-images">
              {["S", "O", "U", "L"].map((letter, index) => (
                <Image
                  key={index}
                  src={`/Images/${letter} letter.png`}
                  alt={`${letter} Letter`}
                  fluid
                />
              ))}
            </div>
            <h1 className="landing-title">Communicate Without Barriers</h1>
            <p className="landing-subtitle">
              Communicate With Deaf And Hard Of <br /> Hearing People
            </p>
            {/* Call handleGetStartedClick when button is clicked */}
            <Button className="get-started-btn mt-3" onClick={handleGetStartedClick}>
              Get Started
            </Button>
          </Col>
        </Row>

        <Row className="image-section">
  {/* Show only on md+ screens */}
  <Col md={5} className="d-none d-md-block">
    <Image src="/Images/sign_img.png" alt="Sign Language (Desktop)" fluid />
  </Col>
  
 
  
  {/* Always visible */}
  <Col xs={12} md={5}>
    <Image src="/Images/sign classe.png" alt="Illustration" fluid />
  </Col>
</Row>
      </Container>
      <AboutUs/>
      <HowItWorks/>
    </div>
  );
};

export default LandingPage;
