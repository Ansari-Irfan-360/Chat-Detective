import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from './components/Join.js';
import Lobby from './components/Lobby.js';
import Chat from './components/Chat.js';

import { Toaster } from 'react-hot-toast';;

const App = () => (
  <>
    <div>
      <Toaster position="top-center"></Toaster>
    </div>
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  </>
);

export default App;
