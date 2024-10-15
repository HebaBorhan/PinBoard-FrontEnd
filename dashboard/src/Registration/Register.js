import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../api/apiClient";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // Store errors here
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent duplicate submissions
  const navigate = useNavigate();

  // Handle form input changes
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true); // Prevent multiple form submissions

    try {
      const response = await ApiClient.register(formData);

      if (response.status === 201) {
        alert("Registration successful! Please log in.");
        navigate("/login"); // Redirect to login page
      } else {
        const data = await response.json();
        setError(data.error || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ margin: "10px", padding: "10px" }}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ margin: "10px", padding: "10px" }}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ margin: "10px", padding: "10px" }}
          />
        </div>
        <button
          type="submit"
          style={{ padding: "10px 20px", marginTop: "10px" }}
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
