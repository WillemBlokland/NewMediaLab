"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Predefined users
  const users = [
    { username: "test", password: "test" },
    { username: "test2", password: "test2" },
  ];

  // Handle Login Button Click
  const handleLogin = () => {
    const matchedUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("loggedInUser", matchedUser.username);
      router.push("/"); // Redirect to home page
      setTimeout(() => {
        window.location.reload(); // Force reload after navigation
      }, 3000); // Small delay to ensure navigation happens before reload
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Container>
  );
}
