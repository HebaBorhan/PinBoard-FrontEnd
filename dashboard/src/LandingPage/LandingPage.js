import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to PinBoard</h1>
      <p>Hold That Thought!</p>
      <Link to="/login">
        <button style={{ padding: "10px 20px", marginTop: "20px" }}>
          Log In
        </button>
      </Link>
    </div>
  );
}

export default LandingPage;
