import React, { useState } from "react";
import ProjectManager from "./ProjectManager";
import QualificationManager from "./QualificationManager";
import ContactManager from "./ContactManager";
import { Tabs, Tab, Box, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import auth from "../lib/auth-helper";

export default function AdminDashboard() {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  // If not admin, it will redirect 
  if (!auth.isAdmin()) {
    navigate("/");
    return null;
  }

  return (
    <Box sx={{ width: "90%", margin: "2rem auto", color: "#e0e0e0" }}>
      <Paper elevation={3} sx={{ padding: "2rem", borderRadius: "12px", backgroundColor: "#23272a" }}>
        <h1 style={{ marginBottom: "1.5rem", color: "#ffffff" }}>Admin Dashboard</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          sx={{ marginBottom: "1.5rem" }}
        >
          Go to Portfolio Home
        </Button>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          centered
          sx={{
            mb: 2,
            "& .MuiTabs-indicator": { backgroundColor: "#60a5fa" },
            "& .MuiTab-root": {
              color: "#ffffff", 
              "&.Mui-selected": {
                color: "#ffffff", 
                fontWeight: "bold",
              },
            },
          }}
        >
          <Tab label="Projects" />
          <Tab label="Qualifications" />
          <Tab label="Contacts" />
        </Tabs>
        {tab === 0 && <ProjectManager />}
        {tab === 1 && <QualificationManager />}
        {tab === 2 && <ContactManager />}
      </Paper>
    </Box>
  );
}