import './App.css';
import Navbar from './pages/NavBar/Navbar';
import './index.css';
import { useEffect, useState } from 'react';

function App() {
  type ScheduleTypes = {
    gameID: string;
    seasonType: string;
    away: string;
    gameDate: string;
    espnID: string;
    teamIDHome: string;
    gameStatus: string;
    gameWeek: string;
    teamIDAway: string;
    home: string;
    espnLink: string;
    cbsLink: string;
    gameTime: string;
    gameTime_epoch: string;
    season: string;
    neutralSite: string;
  };

  const [schedules, setSchedules] = useState<ScheduleTypes[]>([]);
  const url =
    'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLGamesForWeek?week=3&seasonType=reg';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a3359fe54emsh86ff1ae90736126p120af4jsn6797c9bcf4e4',
      'X-RapidAPI-Host':
        'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com',
    },
  };

  useEffect(() => {
    async function getSchedule() {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const data = result.body;
        console.log(data);
        setSchedules(data);
      } catch (error) {
        console.error(error);
      }
    }
    getSchedule();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        {schedules.map((schedule: ScheduleTypes) => (
          <>
            <div key={schedule.gameID}>
              {schedule.away} || {schedule.home}
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default App;
