import React from 'react';
import Navbar from './NavBar/Navbar';

function WeeklyRanks() {
  return (
    <>
      <Navbar />
      <div>
        <div className="flex justify-center mt-4">
          <ul className="flex flex-row gap-3">
            <li>
              <label>Week</label>
              <input />
            </li>
            <li>
              <label>Scoring format</label>
              <input />
            </li>
            <li>
              <input />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default WeeklyRanks;
