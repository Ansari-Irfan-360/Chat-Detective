import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import {
  Container,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Avatar,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle.js';
import PersonIcon from '@mui/icons-material/Person.js';

let socket;

const Lobby = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const BackendUrl = 'http://localhost:8000';

  useEffect(() => {
    const { username, room } = queryString.parse(location.search);

    socket = io(BackendUrl);

    setUsername(username);
    setRoom(room);

    socket.emit('joinRoom', { username, room });

    socket.on('roomUsers', ({ users }) => {
      setUsers(users);
      const currentUser = users.find((user) => user.username === username);
      if (currentUser) {
        setIsAdmin(currentUser.isAdmin);
      }
    });

    socket.on('startChat', () => {
      navigate(`/chat?username=${username}&room=${room}`);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [BackendUrl, location.search, navigate, username, room]);

  const handleReady = () => {
    if(isReady){
        setIsReady(false);
        socket.emit('userReady', {username,isReady});
    }else{
        setIsReady(true);
        socket.emit('userReady', {username,isReady});
    }
  };

  const handleStart = () => {
    socket.emit('startChat', room);
  };


  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h4" gutterBottom>
          Lobby
        </Typography>
        <Typography variant="h6" gutterBottom>
          Room: {room}
        </Typography>
        <List>
          {users.map((user, index) => (
            <ListItem key={index} alignItems="center">
              <ListItemIcon>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={user.username}
                secondary={user.isAdmin ? '[Admin] ' : ' '}
              />
              {}
              {user.ready && (
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
              )}
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          onClick={handleReady}

          style={{ marginTop: '20px' }}
        >
          {isReady ? 'Cancel Ready' : 'Ready'}
        </Button>
        {isAdmin && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleStart}
            disabled={!users.every((user) => user.ready)}
            style={{ marginTop: '20px' }}
          >
            Start Game
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Lobby;