import React from "react";
import { Container, Typography, Box, Grid, Paper } from "@mui/material";
import Confetti from "react-confetti";

const WinnerPage = ({ users }) => {
  // Sorting users by rank and then reversing the array
  const sortedUsers = [...users].sort((a, b) => a.rank - b.rank).reverse();

  return (
    <Container
      sx={{
        textAlign: "center",
        padding: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <Typography variant="h2" component="h1" gutterBottom>
        Winners
      </Typography>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "#808080",
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gap: "8px",
                  alignItems: "center",
                }}
              >
                <span>Rank</span>
                <span>Name</span>
                <span>Game Name</span>
                <span>Eliminated By</span>
              </Box>
            </Typography>
          </Paper>
        </Grid>
        {sortedUsers.map((user, idx) => (
          <Grid item xs={12} key={user.username}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: idx === 0 ? "#ffd700" : idx === 1 ? "#c0c0c0" : idx === 2 ? "#cd7f32" : "#f0f0f0",
              }}
            >
              <Typography variant="h4" component="h2" gutterBottom>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <span>Rank {idx + 1}</span>
                  <span>{user.username}</span>
                  <span>{user.gameName}</span>
                  <span>{user.gotEliminatedBy}</span>
                </Box>
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WinnerPage;
