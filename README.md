# Chat Detective

## Table of Contents

- [Description](#description)
- [Game Rules](#game-rules)
- [Features](#features)
- [Tech Stack](#tech-stack)
  - [Client](#client)
  - [Server](#server)
- [Usage](#usage)
- [Acknowledgements](#acknowledgements)
  
## Description

Chat Detective is an engaging and interactive game where players must guess each other’s identities based on chatting styles and personality traits. Friends join the game using their first names and a Room ID, then wait in a lobby until everyone is ready. The player who joins first becomes the lobby admin and starts the game once all players indicate they are ready.

Upon starting, each player is assigned a random name. Players must then chat with each other, trying to deduce who is who. Each player’s game name is listed with a dropdown menu containing the real names of all participants. Players can make guesses by selecting a real name they believe corresponds to a game name.

If the guess is correct, the guessed player is eliminated, and a message is broadcasted announcing the elimination, stating the guessed player’s game name and real name. If the guess is incorrect, the guesser is eliminated. Eliminated players remain in the game but cannot send messages; they can still read the ongoing conversation. Their names are also removed from the game name list and the suspect list.

The game continues until only one player remains uneliminated, who is then declared the winner. Rankings are assigned based on the order of elimination, with the first person eliminated being last and the final uneliminated player being first.

## Game Rules

- **Joining**: Enter your first name and Room ID to join.
- **Lobby Phase**: Wait until all players are ready.
- **Starting the Game**: The lobby admin starts the game.
- **Identity Assignment**: Each player receives a random pseudonym.
- **Texting Setup**: Players interact via text messages.
- **Guessing Identities**: Use a dropdown to guess the real identity behind a pseudonym.
- **Elimination**: 
  - Correct guess: Eliminates the guessed player.
  - Incorrect guess: Eliminates the guesser.
- **Eliminated Players**: 
  - Cannot send messages but can observe.
  - Ranked based on elimination order.
- **Winning**: Last player remaining wins.

## Features

- Real-time interactive gameplay
- Lobby system for player readiness
- Assign random name to players
- Text message interactions
- Player elimination and rankings
- Admin controls to start the game

## Tech Stack

### Client

- React
- Socket.IO Client
- Bootstrap
- React Router
- React Hot Toast
- Axios

### Server

- Node.js
- Express
- Socket.IO
- MongoDB with Mongoose
- CORS

## Usage

1. Join or create a game session:
   - Open your browser and navigate to http://localhost:3000.
   - Enter your first name and the Room ID provided by the admin.
   - Wait in the lobby until all players are ready.

2. Start chatting to discover other players' identities:
   - After the admin starts the game, each player is assigned a random name.
   - Use the chat feature to communicate with others and deduce their real identities.

3. Guess identities using the provided dropdowns:
   - When you suspect a player's real identity, select their name from the dropdown.
   - If your guess is correct, the player is eliminated, and a message broadcasts the elimination.
   - If your guess is wrong, you risk elimination yourself.

4. Avoid elimination and strategize to be the last player standing:
   - Eliminated players can no longer send messages but can observe the game.
   - The game continues until only one player remains, who is declared the winner.
   - Rankings are based on the order of elimination, with the first eliminated player ranked last.

## Acknowledgements

- React
- Material-UI
- Socket.IO
- Express
- MongoDB
- Bootstrap
