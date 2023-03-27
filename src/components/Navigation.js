import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/" style={{ marginRight: '15px' }}>
        Player Registration
      </NavLink>
      <NavLink to="/scorecard" style={{ marginRight: '15px' }}>
        Scorecard
      </NavLink>
      <NavLink to="/leaderboard">Leaderboard</NavLink>
    </nav>
  );
};

export default Navigation;
