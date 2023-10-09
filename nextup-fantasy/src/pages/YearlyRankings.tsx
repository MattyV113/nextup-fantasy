import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './NavBar/Navbar';
import { Button } from '@material-tailwind/react';

type PlayerData = {
  [playerID: string]: {
    pos: string;
    Rushing: {
      rushYds: string;
      carries: string;
      rushTD: string;
      // Define other properties here
    };
    Passing: {
      passYds: string;
      passTd: string;
      passAttempts: string;
      passCompletions: string;
      int: string;
    };
    Receiving: {
      receptions: string;
      recTD: string;
      recYds: string;
      targets: string;
    };
    fantasyPoints: string;
    fantasyPointsDefault: {
      standard: string;
      PPR: string;
      halfPPR: string;
    };
    fumblesLost: string;

    longName: string;
    playerID: string;

    team: string;
    teamID: string;
    twoPointConversion: string;
    // Define other properties here
  };
};

function YearlyRanks() {
  const scoringButtons = [
    { Name: 'Scoring Format', buttons: ['PPR', 'Half PPR', 'Standard'] },
    { Name: 'Position', buttons: ['QB', 'RB', 'WR', 'TE'] },
  ];

  const [week, setWeek] = useState<string>('5');
  const [selectedScoring, setSelectedScoring] = useState<string | null>('PPR');
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [pointsPerRec, setPointsPerRec] = useState<string | null>(null);
  const [position, setPosition] = useState<string | null>(null);
  const [playerData, setPlayerData] = useState<PlayerData>({});

  const handleWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeek(e.currentTarget.value);
  };

  const handleButtonClick = (categoryName: string, buttonName: string) => {
    if (categoryName === 'Scoring Format') {
      setSelectedScoring((prevSelected) =>
        prevSelected === buttonName ? null : buttonName
      );
      if (buttonName === 'PPR') {
        setPointsPerRec('1');
      } else if (buttonName === 'Half PPR') {
        setPointsPerRec('0.5');
      } else if (buttonName === 'Standard') {
        setPointsPerRec('0');
      }
    } else if (categoryName === 'Position') {
      setSelectedPosition((prevSelected) =>
        prevSelected === buttonName ? null : buttonName
      );
      if (buttonName === 'QB') {
        setPosition('QB');
      }
      if (buttonName === 'RB') {
        setPosition('RB');
      }
      if (buttonName === 'WR') {
        setPosition('WR');
      }
      if (buttonName === 'TE') {
        setPosition('TE');
      }
    }
  };

  const url = `https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLProjections?week=${week}&twoPointConversions=2&passYards=.04&passAttempts=0&passTD=6&passCompletions=0&passInterceptions=-4&pointsPerReception=${pointsPerRec}&carries=0&rushYards=.1&rushTD=6&fumbles=-2&receivingYards=.1&receivingTD=6&targets=.1`;

  const options = useMemo(
    () => ({
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a3359fe54emsh86ff1ae90736126p120af4jsn6797c9bcf4e4',
        'X-RapidAPI-Host':
          'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com',
      },
    }),
    []
  );

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

    setSelectedPosition('QB');
    setPointsPerRec('1');
    setPosition('QB');
  }, [options, url]);

  const positionPlayerData = position
    ? Object.keys(playerData)
        .slice(0, 1000)
        .filter((playerID) => playerData[playerID].pos === position)
        .sort(
          (a, b) =>
            parseFloat(playerData[b].fantasyPoints) -
            parseFloat(playerData[a].fantasyPoints)
        )
    : Object.keys(playerData).slice(0, 1000);

  return (
    <>
      <Navbar />
      <div>
        <div className="flex flex-col justify-center mt-4">
          <h1>Week {week} Rankings</h1>
          <br />
          <ul className="flex flex-row m-auto gap-[120px]">
            {scoringButtons.map((category) => (
              <div key={category.Name}>
                <h3>{category.Name}</h3>
                {category.buttons.map((buttonName) => (
                  <Button
                    key={buttonName}
                    onClick={() => handleButtonClick(category.Name, buttonName)}
                    className={
                      (category.Name === 'Scoring Format' &&
                        selectedScoring === buttonName) ||
                      (category.Name === 'Position' &&
                        selectedPosition === buttonName)
                        ? 'p-2 bg-blue-500 h-[40px] w-[80px]'
                        : 'p-2 h-[40px] w-[80px]'
                    }
                  >
                    {buttonName}
                  </Button>
                ))}
              </div>
            ))}
            <li>
              <label>Choose Week</label>
              <input
                className="rounded p-2"
                value={week}
                onChange={handleWeekChange}
              />
            </li>
          </ul>
          <br />
          <br />
          <br />
          <h1>{position} Rankings</h1>

          <div className="flex w-full flex-col gap-4 mr-auto mt-[100px] h-[100vh]">
            {positionPlayerData.map((playerID, idx) => {
              const data = playerData[playerID];

              // Extract specific data points for the current playerData here
              return (
                <div
                  className="flex w-[50%] m-auto justify-between  flex-row gap-4 rounded text-white border border-white p-4"
                  key={playerID}
                >
                  <p className="">{idx + 1}</p>
                  <h2>Player: {data.longName}</h2>
                  <p>Projection: {data.fantasyPoints}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default YearlyRanks;
