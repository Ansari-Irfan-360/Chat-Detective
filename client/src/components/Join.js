import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
  Collapse,
  Card,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import "../styles.css";
import toast from "react-hot-toast";
import axios from "axios";
import { clientCheck } from 'poll-server-check';

const BackendUrl = "https://chat-detective.onrender.com";

const Join = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    clientCheck(BackendUrl);
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRoomChange = (e) => {
    setRoom(e.target.value);
  };

  const toggleRules = () => {
    setShowRules((prevShowRules) => !prevShowRules);
  };

  return (
    <Container maxWidth="sm" className="join-container">
      <Paper elevation={0} className="form-box" sx={{ padding: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
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
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Enter room ID"
            variant="outlined"
            fullWidth
            value={room}
            onChange={handleRoomChange}
            required
            sx={{ marginBottom: 3 }}
          />
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

        <Box mt={2} textAlign="center">
          <Button
            variant="outlined"
            onClick={toggleRules}
            endIcon={showRules ? <ExpandLess /> : <ExpandMore />}
          >
            {showRules ? "Hide Rules" : "Show Rules"}
          </Button>
        </Box>

        <Collapse in={showRules}>
          <Card sx={{ mt: 2, boxShadow: 'none', margin: '5px' }}>
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                Game Rules
              </Typography>
              <Divider />
              <Box mt={2}>
                <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Joining the Game
                </Typography>
                <Typography variant="body1" align="center" component="div">
                  <ul>
                    <li>Enter your first name and a Room ID to join.</li>
                    <li>Wait in the lobby until all players are ready.</li>
                  </ul>
                </Typography>
              </Box>
              <Box mt={3}>
                <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Starting the Game
                </Typography>
                <Typography variant="body1" align="center" component="div">
                  <ul>
                    <li>
                      The first player to join becomes the lobby admin and starts the game when everyone is ready.
                    </li>
                    <li>Each player is assigned a random game name.</li>
                  </ul>
                </Typography>
              </Box>
              <Box mt={3}>
                <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Playing the Game
                </Typography>
                <Typography variant="body1" align="center" component="div">
                  <ul>
                    <li>Chat with others to guess their real identities.</li>
                    <li>Use the dropdown menus to match game names with real names.</li>
                  </ul>
                </Typography>
              </Box>
              <Box mt={3}>
                <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Making Guesses
                </Typography>
                <Typography variant="body1" align="center" component="div">
                  <ul>
                    <li>Select a real name you believe corresponds to a game name.</li>
                    <li>Correct Guess: The guessed player is eliminated, and a message announces the elimination.</li>
                    <li>Incorrect Guess: The guesser is eliminated.</li>
                  </ul>
                </Typography>
              </Box>
              <Box mt={3}>
                <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Eliminations
                </Typography>
                <Typography variant="body1" align="center" component="div">
                  <ul>
                    <li>Eliminated players cannot send messages but can still read the chat.</li>
                    <li>Eliminated players’ names are removed from the game name list and the suspect list.</li>
                  </ul>
                </Typography>
              </Box>
              <Box mt={3}>
                <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Winning the Game
                </Typography>
                <Typography variant="body1" align="center" component="div">
                  <ul>
                    <li>The last player remaining uneliminated is the winner.</li>
                    <li>Rankings are based on the order of elimination.</li>
                  </ul>
                </Typography>
              </Box>
              <Typography variant="h5" align="center" sx={{ mt: 3, fontWeight: 'bold' }}>
                Enjoy discovering who’s who and may the best detective win!
              </Typography>
            </CardContent>
          </Card>
        </Collapse>
      </Paper>
    </Container>
  );
};

export default Join;
