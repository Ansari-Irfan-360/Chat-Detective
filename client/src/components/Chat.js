import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";
import WinnerPage from "./WinnerPage.js";

let socket;

const Chat = () => {
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [suspect, setSuspect] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [rightUsers, setRightUsers] = useState([]);
  const [isEliminated, setIsEliminated] = useState(false);
  const [winnerFound, setWinnerFound] = useState(false);

  const BackendUrl = "https://chat-detective.onrender.com";

  useEffect(() => {
    const { username, room } = queryString.parse(location.search);

    socket = io(BackendUrl);

    setUsername(username);
    setRoom(room);

    socket.emit("joinRoom", { username, room });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [BackendUrl, location.search]);

  useEffect(() => {
    const handleMessage = (message) => {
      setMessages((messages) => [...messages, message]);
    };

    const handleRoomUsers = ({ users }) => {
      // Shuffle users array randomly
      const shuffledUsers1 = [...users].sort(() => Math.random() - 0.5);
      setUsers(shuffledUsers1);

      const shuffledUsers2 = [...users].sort(() => Math.random() - 0.5);
      setRightUsers(shuffledUsers2);

      // Check if current user is eliminated
      const currentUser = users.find((user) => user.username === username);
      if (currentUser && currentUser.eliminated) {
        setIsEliminated(true);
      }
      // console.log(users);
    };

    const handleWinnerFound = () => {
      setWinnerFound(true);
    };

    socket.on("message", handleMessage);
    socket.on("roomUsers", handleRoomUsers);
    socket.on("winnerFound", handleWinnerFound);

    return () => {
      socket.off("message", handleMessage);
      socket.off("roomUsers", handleRoomUsers);
    };
  }, [username]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit("chatMessage", { text: message, suspect: suspect || "" });
      setMessage("");
    }
  };

  const handleWrongSuspect = () => {
    socket.emit("RemoveSuspect", { username, room, eliminator: username });
  };

  const handleRightSuspect = (index) => {
    const eliminatorUsername = username; // Assuming the current user is the eliminator
    const eliminatedUsername = users[index].username;
    socket.emit("RemoveSuspect", {
      username: eliminatedUsername,
      room,
      eliminator: eliminatorUsername,
    });
  };

  if (winnerFound) {
    console.log(users);
    return <WinnerPage users={users} />;
  }

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div>
          <h4>Username: {username}</h4>
          <h4>Room Name: {room}</h4>
        </div>
        <h1 className="project-name">
          <i className="fas fa-smile"></i> Chat Detective
        </h1>
        <a href="/" className="btn">
          Leave Room
        </a>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>
            <i className="fas fa-users"></i> Users (Game Name)
          </h3>
          <ul id="users">
            {users.map(
              (user, index) =>
                !user.eliminated && (
                  <li key={index}>
                    {user.gameName}{" "}
                    {user.username === username ? (
                      " (You) "
                    ) : (
                      <select
                        value={suspect || ""}
                        onChange={(e) => {
                          const selectedSuspect = e.target.value;
                          setSuspect(selectedSuspect);
                          if (user.username === selectedSuspect) {
                            handleRightSuspect(index);
                          } else {
                            handleWrongSuspect();
                          }
                        }}
                        disabled={isEliminated}
                      >
                        <option value="">Suspect</option>
                        {rightUsers.map(
                          (rightUser, idx) =>
                            !rightUser.eliminated &&
                            rightUser.username !== username && (
                              <option key={idx} value={rightUser.username}>
                                {rightUser.username}
                              </option>
                            )
                        )}
                      </select>
                    )}
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <p className="meta">
                {message.gameName} <span>{message.time}</span>
              </p>
              <p className="text">{message.text}</p>
              {message.suspect && (
                <p className="suspect">Suspect: {message.suspect}</p>
              )}
            </div>
          ))}
        </div>
        <div className="chat-sidebar">
          <h3>
            <i className="fas fa-users"></i> Users (Real Name)
          </h3>
          <ul id="users">
            {rightUsers.map(
              (user, index) =>
                !user.eliminated && (
                  <li key={index}>
                    {user.username} {user.username === username && " (You)"}
                  </li>
                )
            )}
          </ul>
        </div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form" onSubmit={sendMessage}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            autoComplete="off"
            disabled={isEliminated}
          />
          <button className="btn" disabled={isEliminated}>
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
