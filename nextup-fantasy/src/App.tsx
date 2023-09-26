import './App.css';
import Navbar from './pages/NavBar/Navbar';
import './index.css';
import { useEffect, useMemo, useState } from 'react';

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

  const options = useMemo(() => {
    return {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a3359fe54emsh86ff1ae90736126p120af4jsn6797c9bcf4e4',
        'X-RapidAPI-Host':
          'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com',
      },
    };
  }, []);
  const url =
    'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLGamesForWeek?week=3&seasonType=reg';

  useEffect(() => {
    async function getSchedule() {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const data = result.body;

        setSchedules(data);
      } catch (error) {
        console.error(error);
      }
    }
    getSchedule();
  }, [options]);

  return (
    <>
      <Navbar />
      <div>
        <h1 className=" mt-4 text-4xl">NextUp Fantasy</h1>
        {schedules.map((schedule: ScheduleTypes) => (
          <>
            <div
              className="h-full flex flex-row mt-4 w-full object-cover"
              key={schedule.gameID}
            >
              <h1>{schedule.away}</h1>
              ||
              <h1>{schedule.home}</h1>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default App;
