import React, { useState, useEffect } from "react";
import { list, create, update, remove } from "../qualification/api-qualification";
import auth from "../lib/auth-helper";
import { Button, TextField, Paper, List, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";

export default function QualificationManager() {
  const [qualifications, setQualifications] = useState([]);
  const [form, setForm] = useState({ title: "", institution: "", year: "" });
  const [editingId, setEditingId] = useState(null);

  const token = auth.isAuthenticated().token;

  useEffect(() => {
    fetchQualifications();
  }, []);

  const fetchQualifications = async () => {
    const data = await list();
    console.log("QualificationManager fetched:", data);
    setQualifications(data || []);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await update(editingId, form, token);
      setEditingId(null);
    } else {
      await create(form, token);
    }
    setForm({ title: "", institution: "", year: "" });
    fetchQualifications();
  };

  const handleEdit = (qualification) => {
    setEditingId(qualification._id);
    setForm({
      title: qualification.title || "",
      institution: qualification.institution || "",
      year: qualification.year || ""
    });
  };

  const handleDelete = async (id) => {
    await remove(id, token);
    fetchQualifications();
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <h2>Qualifications</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          sx={{ mr: 1 }}
        />
        <TextField
          label="Institution"
          name="institution"
          value={form.institution}
          onChange={handleChange}
          sx={{ mr: 1 }}
        />
        <TextField
          label="Year"
          name="year"
          value={form.year}
          onChange={handleChange}
          sx={{ mr: 1 }}
        />
        <Button type="submit" variant="contained">
          {editingId ? "Update" : "Add"}
        </Button>
        {editingId && (
          <Button onClick={() => { setEditingId(null); setForm({ title: "", institution: "", year: "" }); }}>
            Cancel
          </Button>
        )}
      </form>
      <List>
        {qualifications && qualifications.map((qualification) => (
          <ListItem key={qualification._id} divider>
            <ListItemText
              primary={`${qualification.title || "Untitled"} (${qualification.year || "Unknown"})`}
              secondary={qualification.institution || "Unknown Institution"}
            />
            <ListItemSecondaryAction>
              <Button onClick={() => handleEdit(qualification)}>Edit</Button>
              <Button color="error" onClick={() => handleDelete(qualification._id)}>Delete</Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}