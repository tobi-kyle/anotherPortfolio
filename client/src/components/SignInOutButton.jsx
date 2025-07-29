import React from "react";
import auth from "../lib/auth-helper";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function SignInOutButton() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.clearJWT(() => {
      navigate("/signin");
    });
  };

  if (auth.isAuthenticated()) {
    return (
      <Button onClick={handleSignOut} variant="contained" color="secondary">
        Sign Out
      </Button>
    );
  } else {
    return (
      <Button onClick={() => navigate("/signin")} variant="contained">
        Sign In
      </Button>
    );
  }
}
