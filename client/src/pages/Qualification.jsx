import React, { useEffect, useState } from "react";
import { list as listQualifications, remove as removeQualification } from "../qualification/api-qualification";
import auth from "../lib/auth-helper";
import { useNavigate } from "react-router-dom";

export default function Qualification() {
  const [qualifications, setQualifications] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isAdmin = auth.isAdmin();

  useEffect(() => {
    listQualifications()
      .then((data) => {
        console.log("Fetched qualifications:", data);
        setQualifications(data || []);
      })
      .catch((err) => {
        console.error("Error fetching qualifications:", err);
        setError("Failed to load qualifications");
      });
  }, []);

  const handleEdit = (qualificationId) => {
    navigate(`/qualification/edit/${qualificationId}`);
  };

  const handleDelete = async (qualificationId) => {
    if (window.confirm("Delete this qualification?")) {
      await removeQualification(qualificationId);
      setQualifications(qualifications.filter((q) => q._id !== qualificationId));
    }
  };

  return (
    <div className="container">
      <h1 className="text-4xl font-bold text-center mb-6">My Qualifications</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {qualifications.length === 0 && !error && <p>No qualifications yet.</p>}
      {qualifications.map((q) => (
        <div className="portfolio-card" key={q._id}>
          <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{q.title || "Untitled"}</div>
          <div style={{ margin: "0.3rem 0 0.6rem", color: "#b3b3b3" }}>
            {q.institution || "Unknown Institution"} &middot; {q.year || "Unknown Year"}
          </div>
          {q.description && (
            <div style={{ fontSize: "0.98rem", color: "#dfdfdf" }}>{q.description}</div>
          )}
          {isAdmin && (
            <div style={{ marginTop: 16 }}>
              <button className="btn" onClick={() => handleEdit(q._id)}>
                Edit
              </button>
              <button
                className="btn"
                style={{ marginLeft: 10, background: "#c03", color: "#fff" }}
                onClick={() => handleDelete(q._id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}