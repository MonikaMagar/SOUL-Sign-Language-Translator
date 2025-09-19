import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


// import NavbarComponent from "./pages/Navbar";  // Ensure path is correct
import '../src/styles.css';  // Import the CSS file

import LandingPage from "./Pages/LandingPage";
import AboutUs from "./Pages/AboutUs";
import HowItWorks from "./Pages/HowItWorks"; 

import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/LoginPage";
import Footer from "./Pages/Footer";




const App = () => {
  return (
    <Router>
      <div>
   

        <Routes>
        <Route path="/home" element={<MainPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/how-it-works" element={<HowItWorks />} />  {/* New Route */}

         
          <Route path="/login" element={<LoginPage />} />
        </Routes>
         <Footer /> {/* ✅ Always visible at bottom */}
      </div>
      
    </Router>
  );
};

export default App;
