

// import React, { useState } from "react";
// import {
//   Navbar,
//   Nav,
//   Container,
//   Button,
//   Modal,
//   Form,
//   Tab,
//   Tabs,
//   Alert,
// } from "react-bootstrap";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";

// import "./LandingPage.css";
// import logo from "/Images/logo (3).png";

// const NavbarComponent = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [activeTab, setActiveTab] = useState("login");

//   const [userName, setUserName] = useState("");
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");
//   const [loginError, setLoginError] = useState("");

//   const [signupData, setSignupData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [signupErrors, setSignupErrors] = useState({});

//   const handleShow = () => setShowModal(true);
//   const handleClose = () => setShowModal(false);

//   const handleSignupChange = (e) => {
//     const { name, value } = e.target;
//     setSignupData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateEmail = (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     setLoginError("");

//     const saved = JSON.parse(localStorage.getItem("signupData"));
//     if (
//       saved &&
//       saved.email === loginEmail &&
//       saved.password === loginPassword
//     ) {
//       setUserName(saved.fullName);
//       alert("Login successful!");
//       handleClose();
//     } else {
//       setLoginError("Invalid email or password");
//     }
//   };

//   const handleSignupSubmit = (e) => {
//     e.preventDefault();
//     const errors = {};

//     if (!signupData.fullName.trim()) errors.fullName = "Full name is required";
//     if (!validateEmail(signupData.email)) errors.email = "Enter a valid email";
//     if (signupData.password.length < 6)
//       errors.password = "Password must be at least 6 characters";
//     if (signupData.password !== signupData.confirmPassword)
//       errors.confirmPassword = "Passwords do not match";

//     setSignupErrors(errors);

//     if (Object.keys(errors).length === 0) {
//       localStorage.setItem("signupData", JSON.stringify(signupData));
//       setUserName(signupData.fullName);
//       alert("Sign up successful!");
//       setSignupData({
//         fullName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//       });
//       setActiveTab("login");
//       handleClose();
//     }
//   };

//   const handleGoogleLoginSuccess = (response) => {
//     try {
//       const decoded = jwtDecode(response.credential);
//       setUserName(decoded.name);
//       alert("Google SignIn successful!");
//       handleClose();
//     } catch (err) {
//       console.error("Token decode failed:", err);
//     }
//   };

//   const handleGoogleLoginFailure = (error) => {
//     console.error("Google Login Error", error);
//     alert("Google SignIn failed!");
//   };

//   return (
//     <>
//       <Navbar expand="lg">
//         <Container>
//           <Navbar.Brand href="/">
//             <img src={logo} alt="SOUL Logo" className="navbar-logo" />
//             SOUL
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ms-auto">
//               <Nav.Link href="/">Home</Nav.Link>
//               <Nav.Link href="/about">About Us</Nav.Link>
//               <Nav.Link href="/how-it-works">How It Works</Nav.Link>
//             </Nav>
//             <Button variant="primary" className="ms-3" onClick={handleShow}>
//               {userName ? userName : "Login / Sign Up"}
//             </Button>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       <Modal show={showModal} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {activeTab === "login" ? "Login" : "Sign Up"}
//           </Modal.Title>
//         </Modal.Header>
        
//         <Modal.Body
//           style={{
//             background: "linear-gradient(to right, #fde68a, #f9a8d4)",
//             padding: "1.5rem",
//             borderRadius: "0 0 0.3rem 0.3rem",
//           }}
//         >
//           <Tabs
//             activeKey={activeTab}
//             onSelect={(k) => setActiveTab(k)}
//             className="mb-3"
//           >
//             <Tab eventKey="login" title="Login">
//               {loginError && <Alert variant="danger">{loginError}</Alert>}
//               <div className="p-4 bg-white rounded shadow">
//                 <Form onSubmit={handleLoginSubmit}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control
//                       type="email"
//                       placeholder="Enter email"
//                       value={loginEmail}
//                       onChange={(e) => setLoginEmail(e.target.value)}
//                       required
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                       type="password"
//                       placeholder="Password"
//                       value={loginPassword}
//                       onChange={(e) => setLoginPassword(e.target.value)}
//                       required
//                     />
//                   </Form.Group>
//                   <Button type="submit" className="w-50" variant="primary">
//                     Login
//                   </Button>
//                 </Form>
//               </div>

//               <div className="my-2 text-center">
//                 <GoogleLogin
//                   onSuccess={handleGoogleLoginSuccess}
//                   onError={handleGoogleLoginFailure}
//                   useOneTap
//                   theme="filled_blue"
//                   shape="pill"
//                   width="50%"
//                 />
//               </div>
//             </Tab>

//             <Tab eventKey="signup" title="Sign Up">
//               <div className="p-4 bg-white rounded shadow">
//                 <Form onSubmit={handleSignupSubmit}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Full Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="fullName"
//                       placeholder="Full Name"
//                       value={signupData.fullName}
//                       onChange={handleSignupChange}
//                       isInvalid={!!signupErrors.fullName}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {signupErrors.fullName}
//                     </Form.Control.Feedback>
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control
//                       type="email"
//                       name="email"
//                       placeholder="Enter email"
//                       value={signupData.email}
//                       onChange={handleSignupChange}
//                       isInvalid={!!signupErrors.email}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {signupErrors.email}
//                     </Form.Control.Feedback>
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                       type="password"
//                       name="password"
//                       placeholder="Password"
//                       value={signupData.password}
//                       onChange={handleSignupChange}
//                       isInvalid={!!signupErrors.password}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {signupErrors.password}
//                     </Form.Control.Feedback>
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>Confirm Password</Form.Label>
//                     <Form.Control
//                       type="password"
//                       name="confirmPassword"
//                       placeholder="Confirm Password"
//                       value={signupData.confirmPassword}
//                       onChange={handleSignupChange}
//                       isInvalid={!!signupErrors.confirmPassword}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       {signupErrors.confirmPassword}
//                     </Form.Control.Feedback>
//                   </Form.Group>

//                   <Button type="submit" className="w-50" variant="success">
//                     Sign Up
//                   </Button>
//                 </Form>
//               </div>

//               <div className="my-3 text-center">
//                 <GoogleLogin
//                   onSuccess={handleGoogleLoginSuccess}
//                   onError={handleGoogleLoginFailure}
//                   useOneTap
//                   theme="filled_blue"
//                   shape="pill"
//                   width="50%"
//                 />
//               </div>
//             </Tab>
//           </Tabs>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default NavbarComponent;


import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import { Link } from "react-scroll";
import logo from "/Images/logo (3).png";

const NavbarComponent = () => {
  const [userName, setUserName] = useState("");
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setUserName("");
    window.location.href = "/login";
  };

  const toggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);
  const closeOffcanvas = () => setShowOffcanvas(false);

  return (
    <>
      <Navbar expand="lg" variant="dark" fixed="top" style={{ backgroundColor: "rgb(9, 9, 9)", height: "60px" }}>
        <Container>
          <Navbar.Brand href="/" style={{ fontSize: "1.85rem", color: "#FFFFFF" }}>
            <img
              src={logo}
              alt="SOUL Logo"
              className="d-inline-block align-top me-2"
              style={{ height: "50px", width: "50px" }}
            />
            SOUL
          </Navbar.Brand>

          {/* Offcanvas Toggle Button */}
          <Button variant="dark" className="d-lg-none" onClick={toggleOffcanvas}>
            ☰
          </Button>

          {/* Desktop Nav (optional) */}
          <Nav className="ms-auto d-none d-lg-flex align-items-center">
            <Nav.Link as={Link} to="home" smooth duration={500} style={{ color: "#FFFFFF", fontSize: "1.55rem" }}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="aboutUsSection" smooth duration={500} style={{ color: "#FFFFFF", fontSize: "1.55rem" }}>
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="howItWorksSection" smooth duration={500} style={{ color: "#FFFFFF", fontSize: "1.55rem" }}>
              How It Works
            </Nav.Link>
            {userName ? (
              <Button
                variant="outline-danger"
                className="ms-3"
                onClick={handleLogout}
                style={{ color: "#FFFFFF", borderColor: "#FFD700" }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="outline-primary"
                className="ms-3"
                onClick={handleLoginClick}
                style={{ color: "#FFFFFF", borderColor: "#FFD700" }}
              >
                Login / Sign Up
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* Offcanvas for Mobile View */}
      <Offcanvas show={showOffcanvas} onHide={closeOffcanvas} placement="start" backdrop={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="home" smooth duration={500} onClick={closeOffcanvas}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="aboutUsSection" smooth duration={500} onClick={closeOffcanvas}>
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="howItWorksSection" smooth duration={500} onClick={closeOffcanvas}>
              How It Works
            </Nav.Link>

            <div className="mt-3">
              {userName ? (
                <Button variant="outline-danger" onClick={handleLogout} style={{ width: "100%" }}>
                  Logout
                </Button>
              ) : (
                <Button variant="outline-primary" onClick={handleLoginClick} style={{ width: "100%" }}>
                  Login / Sign Up
                </Button>
              )}
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavbarComponent;
