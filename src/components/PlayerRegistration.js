import React, { useState } from 'react';
import { fetchTeams, registerTeam } from '../api/api';


function PlayerRegistration({ setTeams }) {
  const [teamName, setTeamName] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (teamName && contact) {
      const team = { teamName, contact, scores: [] };
      console.log('Registering team:', team);
      await registerTeam(team);
  
      // Fetch the updated list of teams
      const updatedTeams = await fetchTeams();
      console.log('Updated teams:', updatedTeams);
      setTeams(updatedTeams);
  
      setTeamName('');
      setContact('');
      alert('Team registered successfully!');
    } else {
      alert('Please fill in all fields.');
    }
  };  

  return (
    <div className="player-registration">
      <h1>Player Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email or Phone Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default PlayerRegistration;
