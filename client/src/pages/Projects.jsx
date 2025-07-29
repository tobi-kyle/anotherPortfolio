import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../lib/auth-helper";
import { list as listProjects } from "../project/api-project";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isAdmin = auth.isAdmin();

  useEffect(() => {
    listProjects()
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          setError("Invalid data format received");
        }
      })
      .catch((err) => {
        setError("Failed to load projects");
      });
  }, []);

  return (
    <div className="container">
      <h1 className="projects-header">Projects</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="projects">
        {projects.length === 0 && !error && <p>No projects yet.</p>}
        {projects.map((proj, i) => (
          <div key={i} className="project">
            <h2>{proj.title || "Untitled"}</h2>
            {proj.image ? (
              <img
                src={proj.image}
                alt={proj.title || "Project image"}
                className="centinel-img"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <p>No image available</p>
            )}
            {proj.github && (
              <a href={proj.github} target="_blank" rel="noreferrer" className="btn">
                View on GitHub
              </a>
            )}
            <p>{proj.description || proj.desc || "No description"}</p>
            {/* --- Admin-only Edit Button --- */}
            {isAdmin && (
              <button
                className="btn"
                style={{ marginTop: 8 }}
                onClick={() => navigate(`/projects/edit/${proj._id}`)}
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
