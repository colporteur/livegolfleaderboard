import React, { useState, useEffect } from 'react';
import { parValues } from '../constants/constants';
import { updateTeam } from '../api/api';
import './Scorecard.css';

function Scorecard({ teams, setTeams }) {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [holeScores, setHoleScores] = useState(Array(parValues.length).fill(''));

  useEffect(() => {
    if (selectedTeam) {
      const team = teams.find((team) => team.teamName === selectedTeam);
      if (team) {
        setHoleScores(team.scores.map((score) => (score === null ? '' : score)));
      }
    } else {
      setHoleScores(Array(parValues.length).fill(''));
    }
  }, [selectedTeam, teams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedTeam) {
      const teamToUpdate = teams.find((team) => team.teamName === selectedTeam);
      teamToUpdate.scores = holeScores.map((score) => (score === '' ? null : score));
      await updateTeam(selectedTeam, teamToUpdate);
      setTeams(teams.map((team) => (team.teamName === selectedTeam ? teamToUpdate : team)));

      alert('Scores submitted successfully!');
    }
  };

  const renderGridRows = (start, end) => (
    <>
      <div className="grid-label">Hole</div>
      {parValues.slice(start, end).map((_, index) => (
        <div key={index + start}>{index + start + 1}</div>
      ))}
      <div className="grid-label">Par</div>
      {parValues.slice(start, end).map((par, index) => (
        <div key={index + start}>{par}</div>
      ))}
      <div className="grid-label">Score</div>
      {holeScores.slice(start, end).map((_, index) => (
        <div key={index + start}>
          <select
            value={holeScores[index + start]}
            onChange={(e) => {
              const updatedHoleScores = [...holeScores];
              updatedHoleScores[index + start] = parseInt(e.target.value);
              setHoleScores(updatedHoleScores);
            }}
          >
            <option value="">Select</option>
            {Array.from({ length: parValues[index + start] + 2 }, (_, i) => i + 1).map((score) => (
              <option key={score} value={score}>
                {score}
              </option>
            ))}
          </select>
        </div>
      ))}
    </>
  );

  return (
    <div>
      <h2>Scorecard</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Team:
          <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
            <option value="">Select a team</option>
            {teams.map((team) => (
              <option key={team.teamName} value={team.teamName}>
                {team.teamName}
              </option>
            ))}
          </select>
        </label>
        <div className="scorecard-grid">{renderGridRows(0, 9)}</div>
        <div className="scorecard-grid">{renderGridRows(9, 18)}</div>
        <button type="submit">Submit Scores</button>
      </form>
    </div>
  );
}

export default Scorecard;
