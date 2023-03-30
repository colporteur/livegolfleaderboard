const functions = require("firebase-functions");
const express = require("express");

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.options('*', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

// In-memory data store
const teams = [];

// Routes
app.post("/api/teams", (req, res) => {
  const team = req.body;
  teams.push(team);
  res.status(201).json(team);
});

app.get("/api/teams", (req, res) => {
  res.json(teams);
});

app.get("/api/teams/:teamName", (req, res) => {
  const { teamName } = req.params;
  const team = teams.find((t) => t.teamName === teamName);

  if (team) {
    res.json(team);
  } else {
    res.status(404).json({ message: "Team not found" });
  }
});

app.put("/api/teams/:teamName", (req, res) => {
  const { teamName } = req.params;
  const updatedTeam = req.body;
  const teamIndex = teams.findIndex((t) => t.teamName === teamName);

  if (teamIndex !== -1) {
    teams[teamIndex] = updatedTeam;
    res.json(updatedTeam);
  } else {
    res.status(404).json({ message: "Team not found" });
  }
});

app.put("/api/teams/reset-scores", (req, res) => {
  teams.forEach((team) => {
    team.scores = [];
  });
  res.json(teams);
});

app.get("/test", (req, res) => {
  res.json({ message: "Test endpoint is working!" });
});

exports.api = functions.https.onRequest(app);
