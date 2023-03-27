import React from 'react';
import { parValues } from '../constants/constants';

function Leaderboard({ teams }) {
  const calculateTotalScore = (scores) => {
    let totalScore = 0;
    scores.forEach((score, index) => {
      if (score) {
        totalScore += score - parValues[index];
      }
    });
    return totalScore;
  };

  const calculateHolesPlayed = (scores) => {
    return scores.filter((score) => score !== null && score !== undefined).length;
  };

  const sortedTeams = teams.sort((a, b) => {
    const aTotalScore = calculateTotalScore(a.scores);
    const bTotalScore = calculateTotalScore(b.scores);
    const aHolesPlayed = calculateHolesPlayed(a.scores);
    const bHolesPlayed = calculateHolesPlayed(b.scores);

    if (aTotalScore !== bTotalScore) {
      return aTotalScore - bTotalScore;
    } else {
      return bHolesPlayed - aHolesPlayed;
    }
  });

  return (
    <div>
      <h2>Leaderboard</h2>
      <table border='1'>
        <thead>
          <tr>
            <th>Team</th>
            <th>Score</th>
            <th>Holes Completed</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team) => (
            <tr key={team.teamName}>
              <td>{team.teamName}</td>
              <td>{calculateTotalScore(team.scores)}</td>
              <td>{calculateHolesPlayed(team.scores)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
