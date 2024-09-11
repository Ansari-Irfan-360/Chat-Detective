import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import formatMessage from "./utils/messages.js";
import {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  ToggleUserReady,
  allUsersReady,
  AllUsers,
} from "./utils/users.js";
import { serverCheck } from 'poll-server-check';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat-detective.vercel.app", // Adjust to your client's origin
    methods: ["GET", "POST"],
  },
});

// Use cors middleware
app.use(cors());

// BackendUrl to check server status
serverCheck(app);

const botName = "Chat Detective";

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("New WS connection: ", socket.id);

  // Join room
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    if (!user) {
      socket.emit("joinError", "Username already taken in this room.");
      return;
    }

    socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to Chat Detective"));

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(user.gameName, msg.text, msg.suspect)
      );
    }
  });

  const eliminateUser = (eliminatedUsername, room, eliminator) => {
    const user = AllUsers.find((u) => u.username === eliminatedUsername);

    if (user) {
      user.eliminated = true;
      user.gotEliminatedBy = eliminator;

      // Find the highest existing rank among all users
      const highestRank = Math.max(
        ...AllUsers.map((u) => (u.rank ? u.rank : 0))
      );

      // Assign the next rank to the eliminated user
      user.rank = highestRank + 1;

      io.to(room).emit(
        "message",
        formatMessage(
          botName,
          `${user.gameName} (${user.username}) got eliminated by ${eliminator}`
        )
      );
      io.to(room).emit("roomUsers", {
        room: room,
        users: getRoomUsers(room),
      });

      // Check for winner if only one non-eliminated user remains
      let nonEliminatedUsers = AllUsers.filter((user) => !user.eliminated);
      if (nonEliminatedUsers.length === 1) {
        eliminateUser(nonEliminatedUsers[0].username, room, "Undefeated");
        io.emit("winnerFound");
      }
    }
  };

  socket.on("RemoveSuspect", ({ username, room, eliminator }) => {
    eliminateUser(username, room, eliminator);
  });

  socket.on("requestUsers", (room) => {
    io.to(room).emit("getUsers", AllUsers);
  });

  // Handle userReady event
  socket.on("userReady", (data) => {
    const user = ToggleUserReady(data.username, data.isReady);

    if (user) {
      // Update users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });

      // Check if all users are ready
      if (allUsersReady(user.room)) {
        const admin = getRoomUsers(user.room).find((u) => u.isAdmin);
        if (admin) {
          io.to(admin.id).emit("allUsersReady", true);
        }
      }
    }
  });

  // Handle startChat event
  socket.on("startChat", (room) => {
    io.to(room).emit("startChat");
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
