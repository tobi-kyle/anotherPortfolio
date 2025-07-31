import React, { useState, useEffect } from "react";
import { list, create, update, remove } from "../contact/api-contact";
import auth from "../lib/auth-helper";
import axios from "axios";
import {
  Button,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  Avatar,
  Box,
  Typography,
} from "@mui/material";

export default function ContactManager() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    message: "",
    avatar: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const token = auth.isAuthenticated().token;

  // Helper function to generate consistent avatar URL
  const getAvatarUrl = (contact) => {
    if (contact.avatar) return contact.avatar;
    const name = contact.name || 'Unknown';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=random&color=fff&size=128`;
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (avatarFile) {
        URL.revokeObjectURL(URL.createObjectURL(avatarFile));
      }
    };
  }, [avatarFile]);

  const fetchContacts = async () => {
    const data = await list();
    setContacts(data);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Clean up previous object URL to prevent memory leaks
      if (avatarFile) {
        URL.revokeObjectURL(URL.createObjectURL(avatarFile));
      }
      setAvatarFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedAvatarPath = form.avatar;

    if (avatarFile) {
      const avatarForm = new FormData();
      avatarForm.append("image", avatarFile);

      try {
        const uploadRes = await axios.post("/api/upload", avatarForm);
        uploadedAvatarPath = uploadRes.data.avatar;
      } catch (err) {
        console.error("Avatar upload failed", err);
      }
    }

    const contactData = { ...form, avatar: uploadedAvatarPath };

    if (editingId) {
      await update(editingId, contactData, token);
      setEditingId(null);
    } else {
      await create(contactData, token);
    }

    setForm({
      name: "",
      email: "",
      phone: "",
      github: "",
      linkedin: "",
      message: "",
      avatar: "",
    });
    setAvatarFile(null);
    fetchContacts();
  };

  const handleEdit = (contact) => {
    setEditingId(contact._id);
    setForm({
      name: contact.name || "",
      email: contact.email || "",
      phone: contact.phone || "",
      github: contact.github || "",
      linkedin: contact.linkedin || "",
      message: contact.message || "",
      avatar: contact.avatar || "",
    });
  };

  const handleDelete = async (id) => {
    await remove(id, token);
    fetchContacts();
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <h2>Contacts</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        encType="multipart/form-data"
      >
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} />
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} />
        <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <TextField label="GitHub" name="github" value={form.github} onChange={handleChange} />
        <TextField label="LinkedIn" name="linkedin" value={form.linkedin} onChange={handleChange} />
        <TextField
          label="Extra Message"
          name="message"
          value={form.message}
          onChange={handleChange}
          multiline
          minRows={2}
          placeholder="Any additional info, links, etc."
        />
        
        {/* Avatar Preview Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={avatarFile ? URL.createObjectURL(avatarFile) : form.avatar}
            sx={{ width: 60, height: 60 }}
          >
            {form.name ? form.name.charAt(0).toUpperCase() : '?'}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Avatar Image
            </Typography>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
            {(form.avatar || avatarFile) && (
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                {avatarFile ? 'New image selected' : 'Current avatar will be preserved'}
              </Typography>
            )}
          </Box>
        </Box>
        <Button type="submit" variant="contained">
          {editingId ? "Update" : "Add"}
        </Button>
        {editingId && (
          <Button
            onClick={() => {
              setEditingId(null);
              setForm({
                name: "",
                email: "",
                phone: "",
                github: "",
                linkedin: "",
                message: "",
                avatar: "",
              });
              setAvatarFile(null);
            }}
          >
            Cancel
          </Button>
        )}
      </form>
      <List>
        {contacts &&
          contacts.map((contact) => (
            <ListItem key={contact._id} divider>
              <ListItemAvatar>
                <Avatar 
                  src={getAvatarUrl(contact)}
                  sx={{ width: 48, height: 48 }}
                >
                  {contact.name ? contact.name.charAt(0).toUpperCase() : '?'}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={contact.name}
                secondary={[
                  contact.email,
                  contact.phone,
                  contact.github,
                  contact.linkedin,
                  contact.message,
                ]
                  .filter(Boolean)
                  .join(" | ")}
              />
              <ListItemSecondaryAction>
                <Button onClick={() => handleEdit(contact)}>Edit</Button>
                <Button color="error" onClick={() => handleDelete(contact._id)}>
                  Delete
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </Paper>
  );
}
