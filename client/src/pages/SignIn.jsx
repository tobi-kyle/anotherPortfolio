import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import auth from "../lib/auth-helper";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // Include cookies for the token
      });
      const data = await response.json();
      if (data.error) setError(data.error);
      else {
        auth.authenticate(data, () => {
          if (data.user.role === "admin") navigate("/admin");
          else navigate("/");
        });
      }
    } catch {
      setError("Signin failed.");
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Sign In</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="auth-btn">
          Sign In
        </button>
        <p>
          No account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}