const API_URL = process.env.REACT_APP_API_URL;

export async function fetchTeams() {
  const response = await fetch(`${API_URL}/teams`);
  return response.json();
}

export async function fetchTeam(teamName) {
  const response = await fetch(`${API_URL}/teams/${teamName}`);
  return response.json();
}

export async function registerTeam(team) {
  const response = await fetch(`${API_URL}/teams`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(team),
  });
  return response.json();
}

export async function updateTeam(teamName, updatedTeam) {
  const response = await fetch(`${API_URL}/teams/${teamName}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTeam),
  });
  return response.json();
}

export async function resetAllScores() {
  const response = await fetch(`${API_URL}/teams/reset-scores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
