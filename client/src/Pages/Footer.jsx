// src/components/Footer.jsx
import React from "react";
import "./Footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaGlobe } from "react-icons/fa";
import logo from "../assets/logo.png.png"; // Replace with your logo path

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src={logo} alt="SOUL Logo" className="footer-logo" />
          <span className="footer-title">SOUL</span>
        </div>

        <div className="footer-links">
          <div>
            <h4>ABOUT</h4>
            <a href="/about">About SOUL</a>
            <a href="/how-it-works">How It Works</a>
          </div>
          <div>
            <h4>FOLLOW US</h4>
            <a href="https://github.com/">GitHub</a>
            <a href="https://linkedin.com/">LinkedIn</a>
          </div>
          <div>
            <h4>LEGAL</h4>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms & Conditions</a>
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SOUL™. All Rights Reserved.</p>
        <div className="footer-icons">
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
          <FaGithub />
          <FaGlobe />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
