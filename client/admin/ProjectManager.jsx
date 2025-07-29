import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { list, create, update, remove } from "../project/api-project";
import auth from "../lib/auth-helper";
import {
  Button, TextField, Paper, List, ListItem, ListItemText, Box, Typography
} from "@mui/material";
console.log("== ProjectManager rendered ==");
export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", image: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const token = auth.isAuthenticated().token;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await list();
      setProjects(data || []);
    } catch (err) {
      setError("Failed to load projects");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  // This is for the image input!
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be less than 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, image: reader.result }));
      setError(null);
    };
    reader.onerror = () => setError("Failed to read image");
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.title || !form.description) {
        setError("Title and description are required");
        return;
      }
      if (editingId) {
        await update(editingId, form, token);
        setEditingId(null);
      } else {
        await create(form, token);
        navigate("/projects");
      }
      setForm({ title: "", description: "", image: "" });
      setError(null);
      fetchProjects();
    } catch (err) {
      setError("Failed to save project");
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title || "",
      description: project.description || "",
      image: project.image || ""
    });
    setError(null);
  };

  const handleDelete = async (id) => {
    try {
      await remove(id, token);
      fetchProjects();
    } catch (err) {
      setError("Failed to delete project");
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        mb: 2,
        background: "#232323",
        color: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 24px #000a"
      }}
    >
      <Typography variant="h5" sx={{ color: "#fff", mb: 2 }}>Projects</Typography>
      {error && <Typography sx={{ color: "red", mb: 2 }}>{error}</Typography>}
      <Typography sx={{ color: "#fff", mb: 1 }}>Add or Edit Project</Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "1.5rem",
          display: "flex",
          gap: "1.5rem",
          flexDirection: "column",
          alignItems: "center",
          width: "100%"
        }}
      >
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          variant="filled"
          fullWidth
          required
          sx={{
            input: { color: "#fff", background: "#191919" },
            label: { color: "#ccc" },
            width: "100%"
          }}
          InputLabelProps={{ style: { color: "#aaa" } }}
        />
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          variant="filled"
          fullWidth
          required
          sx={{
            input: { color: "#fff", background: "#191919" },
            label: { color: "#ccc" },
            width: "100%"
          }}
          InputLabelProps={{ style: { color: "#aaa" } }}
        />

        {/* ---- Add Image Button and Preview (Plain HTML) ---- */}
        <div style={{
          width: "100%",
          display: "block",
          background: "#ff00ff33",
          padding: "2rem",
          border: "3px solid #ff00ff",
          margin: "1rem 0"
        }}>
          <span style={{ color: "red", fontWeight: "bold" }}>
            IMAGE UPLOAD BUTTON DEBUG AREA (Should be visible!)
          </span>
          <br />
          <input
            type="file"
            id="project-image"
            accept="image/*"
            style={{ display: "inline-block", margin: "1rem 0" }}
            onChange={handleImageChange}
          />
          <label htmlFor="project-image">
            <button
              type="button"
              style={{
                padding: "0.5rem 1.2rem",
                borderRadius: "7px",
                border: "1.5px solid #b266ff",
                color: "#fff",
                background: "#191919",
                fontWeight: "bold",
                cursor: "pointer",
                marginLeft: "1rem"
              }}
            >
              {form.image ? "Change Image" : "Add Image"}
            </button>
          </label>
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              style={{
                maxHeight: 48,
                borderRadius: 6,
                border: "1px solid #444",
                background: "#fff",
                display: "inline-block",
                marginLeft: "1rem"
              }}
            />
          )}
        </div>

        <Button type="submit" variant="contained" sx={{ width: "100%", background: "#1976d2", color: "#fff" }}>
          {editingId ? "Update" : "Add"}
        </Button>
        {editingId && (
          <Button
            onClick={() => { setEditingId(null); setForm({ title: "", description: "", image: "" }); setError(null); }}
            sx={{ width: "100%", color: "#fff", borderColor: "#fff" }}
            variant="outlined"
          >
            Cancel
          </Button>
        )}
      </form>
      <List>
        {projects && projects.map((project) => (
          <ListItem
            key={project._id}
            divider
            sx={{ color: "#fff", background: "#191919", borderRadius: 2, mb: 1 }}
          >
            <Box sx={{ flex: 1 }}>
              <ListItemText
                primary={<span style={{ color: "#fff", fontWeight: 500 }}>{project.title || "Untitled"}</span>}
                secondary={<span style={{ color: "#ddd" }}>{project.description || "No description"}</span>}
              />
              {project.image ? (
                <img
                  src={project.image}
                  alt="project"
                  style={{ maxWidth: 120, marginTop: 6, borderRadius: 8, border: "1px solid #333" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <span style={{ color: "#ddd", fontSize: "0.9rem" }}>No image</span>
              )}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="outlined" sx={{ color: "#fff", borderColor: "#b266ff" }} onClick={() => handleEdit(project)}>
                Edit
              </Button>
              <Button variant="outlined" sx={{ color: "#fff", borderColor: "#c03", background: "#c03", ":hover": { background: "#a00" } }} onClick={() => handleDelete(project._id)}>
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
