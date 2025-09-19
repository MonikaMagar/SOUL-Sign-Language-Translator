import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import logo from "/Images/logo (3).png";
import './LoginPage.css';

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupErrors, setSignupErrors] = useState({});
  const [activeTab, setActiveTab] = useState("login");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName); 
    }
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const sendWelcomeEmail = (email, name, fromName) => {
    const templateParams = {
      name: name,         // Matches {{name}} in the EmailJS template
      email: email,       // Matches {{email}} in the EmailJS template
      from_name: fromName // Matches {{from_name}} in the EmailJS template
    };

    emailjs
      .send(
        "service_fr62y2e",  // Your service ID
        "template_3titcn1",  // Your template ID
        templateParams,
        "-LbCpv__sOIa3tzPr" // Your public key
      )
      .then((res) => {
        console.log("Email sent successfully:", res);
      })
      .catch((err) => {
        console.error("Email send error:", err);
      });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    const saved = JSON.parse(localStorage.getItem("signupData"));
    if (saved && saved.email === loginEmail && saved.password === loginPassword) {
      setUserName(saved.fullName);
      localStorage.setItem("userName", saved.fullName);  
      alert("Login successful!");
      navigate("/home");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!signupData.fullName.trim()) errors.fullName = "Full name is required";
    if (!validateEmail(signupData.email)) errors.email = "Enter a valid email";
    if (signupData.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (signupData.password !== signupData.confirmPassword) errors.confirmPassword = "Passwords do not match";

    setSignupErrors(errors);

    if (Object.keys(errors).length === 0) {
      localStorage.setItem("signupData", JSON.stringify(signupData));
      setUserName(signupData.fullName);
      localStorage.setItem("userName", signupData.fullName);  
      alert("Sign up successful!");
      sendWelcomeEmail(signupData.email, signupData.fullName, "SOUL Support");

      setSignupData({ fullName: "", email: "", password: "", confirmPassword: "" });
      setActiveTab("login");
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    try {
      const decoded = jwtDecode(response.credential);
      setUserName(decoded.name);
      localStorage.setItem("userName", decoded.name); 
      alert("Google SignIn successful!");
      navigate("/home");
    } catch (err) {
      console.error("Token decode failed:", err);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login Error", error);
    alert("Google SignIn failed!");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-header">
          <img src={logo} alt="SOUL Logo" className="logo-img" />
          <h2 className="logo-title">SOUL</h2>
        </div>

        <div className="tab-buttons">
          <button
            onClick={() => setActiveTab("login")}
            className={`active-tab ${activeTab === "login" ? "active-tab" : "inactive-tab"}`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`inactive-tab ${activeTab === "signup" ? "active-tab" : "inactive-tab"}`}
          >
            Sign Up
          </button>
        </div>

        <div className="welcome-back">
          <button className="go-back" onClick={() => window.history.back()}>
            ← Go Back
          </button>
          {activeTab === "login" && <h3 className="welcome-heading">Welcome Back, {userName || "!"}</h3>}
        </div>

        {activeTab === "login" ? (
          <form onSubmit={handleLoginSubmit} className="form">
            {loginError && <div className="error">{loginError}</div>}
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn login-btn">
              Log in
            </button>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
              useOneTap
              theme="filled_blue"
              shape="pill"
            />
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} className="form">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={signupData.fullName}
              onChange={handleSignupChange}
            />
            {signupErrors.fullName && <p className="error">{signupErrors.fullName}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupData.email}
              onChange={handleSignupChange}
            />
            {signupErrors.email && <p className="error">{signupErrors.email}</p>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupChange}
            />
            {signupErrors.password && <p className="error">{signupErrors.password}</p>}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={signupData.confirmPassword}
              onChange={handleSignupChange}
            />
            {signupErrors.confirmPassword && <p className="error">{signupErrors.confirmPassword}</p>}

            <button type="submit" className="btn signup-btn">
              Sign Up
            </button>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
              useOneTap
              theme="filled_blue"
              shape="pill"
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
