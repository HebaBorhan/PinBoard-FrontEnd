import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";

function LandingPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <img 
        src={logo} 
        alt="PinBoard Logo" 
        style={{ width: "300px", height: "auto", marginBottom: "20px" }}
      />
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>
        Hold That Thought!
      </p>
      <Link to="/login">
        <button style={{ fontSize: "14px", padding: "10px 20px", marginTop: "20px", marginRight: "20px" }}>
          Log In
        </button>
      </Link>
      <Link to="/registration">
        <button style={{ fontSize: "14px", padding: "10px 20px", marginTop: "20px" }}>
          Register
        </button>
      </Link>
    </div>
  );
}

export default LandingPage;
