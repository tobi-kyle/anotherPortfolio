import React, { useState, useEffect } from "react";
import { list, create, update, remove } from "../contact/api-contact";
import auth from "../lib/auth-helper";
import { Button, TextField, Paper, List, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";

export default function ContactManager() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editingId, setEditingId] = useState(null);

  const token = auth.isAuthenticated().token;

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const data = await list();
    setContacts(data);
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
    setForm({ name: "", email: "", phone: "" });
    fetchContacts();
  };

  const handleEdit = (contact) => {
    setEditingId(contact._id);
    setForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  };

  const handleDelete = async (id) => {
    await remove(id, token);
    fetchContacts();
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <h2>Contacts</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          sx={{ mr: 1 }}
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          sx={{ mr: 1 }}
        />
        <TextField
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          sx={{ mr: 1 }}
        />
        <Button type="submit" variant="contained">
          {editingId ? "Update" : "Add"}
        </Button>
        {editingId && (
          <Button onClick={() => { setEditingId(null); setForm({ name: "", email: "", phone: "" }); }}>
            Cancel
          </Button>
        )}
      </form>
      <List>
        {contacts && contacts.map((contact) => (
          <ListItem key={contact._id} divider>
            <ListItemText
              primary={contact.name}
              secondary={`${contact.email} | ${contact.phone}`}
            />
            <ListItemSecondaryAction>
              <Button onClick={() => handleEdit(contact)}>Edit</Button>
              <Button color="error" onClick={() => handleDelete(contact._id)}>Delete</Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
