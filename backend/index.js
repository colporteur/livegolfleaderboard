const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// In-memory data store
const teams = [];

// Routes
app.post('/api/teams', (req, res) => {
  const team = req.body;
  teams.push(team);
  res.status(201).json(team);
});

app.get('/api/teams', (req, res) => {
  res.json(teams);
});

app.get('/api/teams/:teamName', (req, res) => {
  const { teamName } = req.params;
  const team = teams.find(t => t.teamName === teamName);

  if (team) {
    res.json(team);
  } else {
    res.status(404).json({ message: 'Team not found' });
  }
});

app.put('/api/teams/:teamName', (req, res) => {
  const { teamName } = req.params;
  const updatedTeam = req.body;
  const teamIndex = teams.findIndex(t => t.teamName === teamName);

  if (teamIndex !== -1) {
    teams[teamIndex] = updatedTeam;
    res.json(updatedTeam);
  } else {
    res.status(404).json({ message: 'Team not found' });
  }
});

app.put('/api/teams/reset-scores', (req, res) => {
  teams.forEach((team) => {
    team.scores = [];
  });
  res.json(teams);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
