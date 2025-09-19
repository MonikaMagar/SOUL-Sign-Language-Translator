// import { Container, Row, Col, Image } from "react-bootstrap";
// import "../Pages/AboutUs.css";

// const AboutUs = () => {
//   return (
//     <div id="aboutUsSection" className="about-page"> {/* Add id for scrolling */}
//       <Container className="text-center py-5">
//         <h1 className="about-title">About Us</h1>
//         <p className="about-subtitle">
//           Empowering communication between the Deaf and Hearing communities.
//         </p>

//         <Row className="align-items-center mt-5">
//           <Col xs={12} md={6}>
//             <Image 
//               src="/Images/sign_img.png" 
//               alt="About Us Illustration"
//               fluid
//               className="about-image"
//             />
//           </Col>
//           <Col xs={12} md={6} className="text-left">
//             <h2 className="section-title">Our Mission</h2>
//             <p className="about-text">
//               We aim to break communication barriers by providing innovative 
//               solutions that make sign language accessible to everyone. 
//               Our platform fosters inclusivity and understanding between 
//               diverse communities.
//             </p>

//             <h2 className="section-title mt-4">Why Choose Us?</h2>
//             <ul className="about-list">
//               <li>🌟 Innovative Sign Language Recognition</li>
//               <li>💡 AI-Powered Communication Tools</li>
//               <li>❤️ Bridging the Gap Between the Deaf and Hearing</li>
//               <li>📈 Continuous Improvement & Growth</li>
//             </ul>
//           </Col>
//         </Row>

//         <Row className="mt-5">
//           <Col className="text-center">
//             <h2 className="section-title">Join Us</h2>
//             <p className="about-text">
//               Be part of our mission and help us create a world without 
//               communication barriers.
//             </p>
//             <button className="join-btn">Get Involved</button>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default AboutUs;





import { Container, Row, Col, Image } from "react-bootstrap";
import "../Pages/AboutUs.css";

const AboutUs = () => {
  return (
    <div id="aboutUsSection" className="about-page">
      <Container className="py-5">
        <h1 className="about-title text-center">About Us</h1>
        <p className="about-subtitle text-center">
          Empowering communication between the Deaf and Hearing communities.
        </p>

        <Row className="align-items-center mt-5 justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <Image
              src="/Images/sign_img.png"
              alt="About Us Illustration"
              fluid
              className="about-image"
            />
          </Col>

          <Col xs={12} md={6} className="text-md-left text-center">
            <h2 className="section-title">Our Mission</h2>
            <p className="about-text">
              We aim to break communication barriers by providing innovative
              solutions that make sign language accessible to everyone. Our
              platform fosters inclusivity and understanding between diverse
              communities.
            </p>

            <h2 className="section-title mt-4">Why Choose Us?</h2>
            <ul className="about-list">
              <li>🌟 Innovative Sign Language Recognition</li>
              <li>💡 AI-Powered Communication Tools</li>
              <li>❤️ Bridging the Gap Between the Deaf and Hearing</li>
              <li>📈 Continuous Improvement & Growth</li>
            </ul>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="text-center">
            <h2 className="section-title">Join Us</h2>
            <p className="about-text">
              Be part of our mission and help us create a world without
              communication barriers.
            </p>
            <button className="join-btn">Get Involved</button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
