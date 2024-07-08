// Initialize an empty array for users
const AllUsers = [];

// Set to keep track of used name indexes
const usedNameIndexes = new Set();

// List of random names for users
const randomNames = [
  "Arjun", "Aarav", "Vikram", "Rohan", "Aditya", "Siddharth", "Karthik", "Rahul", 
  "Akash", "Yash", "Raj", "Vivek", "Anand", "Ajay", "Prakash", "Varun", "Nitin", 
  "Tarun", "Deepak", "Sanjay", "Pratik", "Alok", "Ravi", "Kartik", "Vikas", "Suresh", 
  "Arvind", "Ashok", "Rakesh", "Gaurav", "Neeraj", "Sunil", "Rajesh", "Anil", "Mohit", 
  "Vineet", "Amar", "Sachin", "Vijay", "Suraj"
];

// Function to add a user to the chat
function userJoin(id, username, room) {
  let isAdmin;
  let nameIndex;
  let gameName;
  if (AllUsers.length === 0) {
    isAdmin = true;
    nameIndex = Math.floor(Math.random() * randomNames.length);
    gameName = randomNames[nameIndex];
  } else {
    isAdmin = false;
    const existingUser = AllUsers.find((user) => user.username === username);

    if (existingUser) {
      return false;
    }

    do {
      nameIndex = Math.floor(Math.random() * randomNames.length);
    } while (usedNameIndexes.has(nameIndex));

    usedNameIndexes.add(nameIndex);
    gameName = randomNames[nameIndex];
  }

  const user = {
    id,
    username,
    room,
    gameName,
    nameIndex,
    isAdmin,
    ready: false,
    eliminated: false,
    rank: 0,
    gotEliminatedBy: "Undefeated",
  };
  AllUsers.push(user);

  return user;
}

// Function to get the current user by ID
function getCurrentUser(id) {
  return AllUsers.find((user) => user.id === id);
}

// Function to remove a user from the chat
function userLeave(id) {
  const index = AllUsers.findIndex((user) => user.id === id);

  if (index !== -1) {
    const user = AllUsers.splice(index, 1)[0];
    if (AllUsers[0]) {
      AllUsers[0].isAdmin = true;
    }
    return user;
  }
}

// Function to get all users in a specific room
function getRoomUsers(room) {
  return AllUsers.filter((user) => user.room === room);
}

// Function to toggle user ready state
function ToggleUserReady(username, isready) {
  const user = AllUsers.find((user) => user.username === username);
  if (user) {
    user.ready = !isready; // Toggle the ready state
  }
  return user;
}

// Function to check if all users in a room are ready
function allUsersReady(room) {
  const roomUsers = getRoomUsers(room);
  return roomUsers.every((user) => user.ready);
}

export {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  ToggleUserReady,
  allUsersReady,
  AllUsers,
};
