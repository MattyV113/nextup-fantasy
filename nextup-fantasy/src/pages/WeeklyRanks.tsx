import React, { useEffect, useState } from 'react';
import Navbar from './NavBar/Navbar';
import { Button } from '@material-tailwind/react';

function WeeklyRanks() {
  const [selected, setSelected] = useState<string | null>(null); // Initialize with null

  const buttonData = [
    { Name: 'Scoring Format', buttons: ['PPR', 'Half PPR', 'Standard'] },
    { Name: 'Position', buttons: ['QB', 'RB', 'WR', 'TE'] },
  ];

  const url =
    'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLProjections?week=3&twoPointConversions=2&passYards=.04&passAttempts=0&passTD=6&passCompletions=0&passInterceptions=-4&pointsPerReception=1&carries=0&rushYards=.1&rushTD=6&fumbles=-2&receivingYards=.1&receivingTD=6&targets=.1';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a3359fe54emsh86ff1ae90736126p120af4jsn6797c9bcf4e4',
      'X-RapidAPI-Host':
        'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com',
    },
  };

  const [playerData, setPlayerData] = useState({});

  useEffect(() => {
    async function getPlayerData() {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const data = result.body.playerProjections;
        setPlayerData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    getPlayerData();
  }, []);

  const playerIDs = Object.keys(playerData).slice(0, 10);

  return (
    <>
      <Navbar />
      <div>
        <div className="flex flex-col justify-center mt-4">
          <br />
          <ul className="flex flex-row m-auto gap-[150px]">
            {buttonData.map((data) => {
              return (
                <>
                  <div className="flex flex-col gap-5">
                    <label>{data.Name}</label>
                    <li className="flex gap-4">
                      {data.buttons.map((name) => (
                        <Button
                          key={name}
                          onClick={() =>
                            setSelected((prevSelected) =>
                              prevSelected === name ? null : name
                            )
                          }
                          className={
                            selected === name
                              ? 'p-2 bg-blue-500 h-[40px] w-[80px]'
                              : 'p-2 h-[40px] w-[80px]'
                          }
                        >
                          {name}
                        </Button>
                      ))}
                    </li>
                  </div>
                </>
              );
            })}
          </ul>
          <div className="flex flex-col gap-4 mr-auto mt-[100px] h-[100vh]">
            {playerIDs.map((playerID) => {
              const data = playerData[playerID];

              // Extract specific data points for the current playerData here

              return (
                <div
                  className="flex flex-row gap-4 bg-white text-black p-4"
                  key={playerID}
                >
                  <h2>Player Name: {data.longName}</h2>
                  <p>Fantasy Projection: {data.fantasyPoints}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default WeeklyRanks;
