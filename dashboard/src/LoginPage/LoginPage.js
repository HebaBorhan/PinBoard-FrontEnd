import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../api/apiClient";
import cookies from "../api/cookiesData";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    // fetch login data
      ApiClient.login(username,password).then(response=>{
        if(response.ok){ // status == 200

          response.json().then(data=>{
            cookies.set('token', data);
            navigate("/dashboard");

          })
        }else{
          alert("Invalid credentials!");

        }
      })


  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ margin: "10px", padding: "10px" }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ margin: "10px", padding: "10px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
