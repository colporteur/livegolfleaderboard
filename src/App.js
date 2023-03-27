import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerRegistration from './components/PlayerRegistration';
import Leaderboard from './components/Leaderboard';
import Scorecard from './components/Scorecard';
import Navigation from './components/Navigation';

function App() {
  const [teams, setTeams] = useState([]);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<PlayerRegistration teams={teams} setTeams={setTeams} />} />
        <Route path="/leaderboard" element={<Leaderboard teams={teams} />} />
        <Route path="/scorecard" element={<Scorecard teams={teams} setTeams={setTeams} />} />
      </Routes>
    </Router>
  );
}

export default App;
