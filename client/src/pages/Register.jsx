import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      const response = await fetch(`${import.meta.env.REACT_APP_API_BASE_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.error) setError(data.error);
      else {
        setSuccess("Registered! Redirecting...");
        setTimeout(() => navigate("/signin"), 1500);
      }
    } catch {
      setError("Registration failed.");
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: "3rem auto", padding: 24, border: "1px solid #eee", borderRadius: 16 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && <p style={{ color: "red", margin: "8px 0" }}>{error}</p>}
        {success && <p style={{ color: "green", margin: "8px 0" }}>{success}</p>}
        <button type="submit" style={{ width: "100%", padding: 10, borderRadius: 8, background: "#222", color: "#fff", border: "none" }}>
          Register
        </button>
        <p style={{ marginTop: 12 }}>
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </form>
    </div>
  );
}