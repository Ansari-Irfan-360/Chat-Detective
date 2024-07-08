import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
} from "@mui/material";
import "../styles.css";
import toast from "react-hot-toast";
import axios from "axios";

const BackendUrl = "http://localhost:8000"

const Join = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    let intervalId;
    let loadingToastId;
    const startServer = async () => {
      try {
        await axios.post(`${BackendUrl}/check`, { timeout: 3000 });
      } catch {
        loadingToastId = toast.loading("Starting the Server");
        intervalId = setInterval(async () => {
          try {
            await axios.post(`${BackendUrl}/check`, { timeout: 3000 });
            toast.success("Server Started", {
              id: loadingToastId,
            });
            clearInterval(intervalId);
          } catch (error) {
            console.log("Server not started yet, retrying...");
          }
        }, 3000);
      }

      // Stop polling after 60 seconds
      setTimeout(() => {
        clearInterval(intervalId);
        toast.error("Failed to start server",{
          id: loadingToastId,
        });
        window.location.reload();
      }, 60000);
    };

    startServer();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRoomChange = (e) => {
    setRoom(e.target.value);
  };

  return (
    <Container maxWidth="sm" className="join-container">
      <Paper elevation={3} className="form-box">
        <Typography variant="h4" align="center">
        Chat Detective
        </Typography>

        <Box mt={3}>
          <TextField
            label="Enter username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Enter room ID"
            variant="outlined"
            fullWidth
            value={room}
            onChange={handleRoomChange}
            required
          />
        </Box>
        <Box mt={3}>
          <Link
            to={`/lobby?username=${username}&room=${room}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={!username || !room}
              onClick={(e) => !username && e.preventDefault()}
            >
              Join Chat
            </Button>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default Join;
