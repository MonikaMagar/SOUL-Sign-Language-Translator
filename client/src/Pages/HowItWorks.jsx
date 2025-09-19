import { Container, Row, Col, Card  } from "react-bootstrap";
import "../Pages/HowItWorks.css";


const HowItWorks = () => {
  return (
    <div id="howItWorksSection" className="how-it-works"> {/* Add id for scrolling */}
      <Container className="text-center py-5">
        <h1 className="title">How It Works</h1>
        <p className="subtitle">
          A simple, effective way to bridge communication gaps between the Deaf and Hearing communities.
        </p>

 

<Row className="steps mt-5">
  <Col xs={12} md={4} className="step">
    <Card className="step-card">
      <Card.Img variant="top" src="/Images/smart.png" className="step-image" />
      <Card.Body>
        <Card.Title className="step-title">Step 1: Capture</Card.Title>
        <Card.Text className="step-description">
          Use your camera to capture sign language gestures.
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>

  <Col xs={12} md={4} className="step">
    <Card className="step-card">
      <Card.Img variant="top" src="/Images/convert.png" className="step-image" />
      <Card.Body>
        <Card.Title className="step-title">Step 2: Recognize</Card.Title>
        <Card.Text className="step-description">
          Our AI-powered system translates signs into text.
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>

  <Col xs={12} md={4} className="step">
    <Card className="step-card">
      <Card.Img variant="top" src="/Images/text.png" className="step-image" />
      <Card.Body>
        <Card.Title className="step-title">Step 3: Communicate</Card.Title>
        <Card.Text className="step-description">
          Engage in seamless conversations without barriers.
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
</Row>

      </Container>
    </div>
  );
};

export default HowItWorks;
