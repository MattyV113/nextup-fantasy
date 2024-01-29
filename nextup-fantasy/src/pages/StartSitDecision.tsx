import { useEffect, useMemo, useState } from 'react';
import Navbar from './NavBar/Navbar';
import { Button } from '@material-tailwind/react';
import { PlayerData } from './YearlyRankings';

type PlayerInfo = {
  [playerID: string]: {
    espnId: string;
    espnName: string;
    espnIDFull: string;
    weight: string;
    jerseyNum: string;
    cbsShortName: string;
    team: string;
    yahooPlayerID: string;
    age: string;
    espnLink: string;
    yahooLink: string;
    bDay: string;
    espnHeadshot: string;
    rotoWirePlayerIDFull: string;
    cbsLongName: string;
    injury: {
      description: string;
      injDate: string;
      desgination: string;
    };
    teamID: string;
    pos: string;
    school: string;
    cbsPlayerID: string;
    longName: string;
    rotoWirePlayerID: string;
    height: string;
    cbsPlayertIDFull: string;
    lastGamePlayed: string;
    playerID: string;
    exp: string;
    stats: {
      Rushing: {
        rushYds: string;
        carries: string;
        rushTD: string;
      };
      Passing: {
        passAttempts: string;
        passTD: string;
        passYds: string;
        int: string;
        passCompletions: string;
      };
      Receiving: {
        receptions: string;
        recTD: string;
        targets: string;
        recYds: string;
      };
    };
    gamesPlayed: string;
    teamAbv: string;
    Defense: {
      totalTackles: string;
      defTD: string;
      soloTackles: string;
      defensiveInterceptions: string;
      qbHits: string;
      tfl: string;
      passDeflections: string;
      sacks: string;
    };
  };
};

function StartSitDecision() {
  const scoringButtons = [
    { Name: 'Scoring Format', buttons: ['PPR', 'Half PPR', 'Standard'] },
  ];

  const [selectedScoring, setSelectedScoring] = useState<string | null>('PPR');
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [pointsPerRec, setPointsPerRec] = useState<string | null>('1');
  const [position, setPosition] = useState<string | null>(null);
  const [playerData, setPlayerData] = useState<PlayerData>({});
  const [week, setWeek] = useState<string>('5');
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({});
  const [bestPlayerID, setBestPlayerID] = useState<string | null>(null);
  const [playerOne, setPlayerOne] = useState<
    string | number | readonly string[] | undefined
  >('');
  const [playerTwo, setPlayerTwo] = useState<
    string | number | readonly string[] | undefined
  >('');

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
    }
  };

  const handlePlayerOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerOne(e.currentTarget.value);
  };

  const handlePlayerTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerTwo(e.currentTarget.value);
  };

  const handleWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeek(e.currentTarget.value);
  };

  useEffect(() => {
    async function getPlayerData() {
      try {
        const url = `https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLProjections?week=${week}&twoPointConversions=2&passYards=.04&passAttempts=0&passTD=6&passCompletions=0&passInterceptions=-4&pointsPerReception=${pointsPerRec}&carries=0&rushYards=.1&rushTD=6&fumbles=-2&receivingYards=.1&receivingTD=6&targets=.1`;

        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key':
              'a3359fe54emsh86ff1ae90736126p120af4jsn6797c9bcf4e4',
            'X-RapidAPI-Host':
              'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com',
          },
        };
        const response = await fetch(url, options);
        const result = await response.json();
        const data = result.body.playerProjections;
        setPlayerData(data);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    getPlayerData();
  }, [pointsPerRec, week]);

  const playerOneData = Object.keys(playerData)
    .filter((playerID) => playerData[playerID].longName === playerOne)
    .map((playerID) => ({
      id: playerID,
      fantasyPoints: playerData[playerID].fantasyPoints,
    }));

  console.log(playerOneData[0]);

  const playerTwoData = Object.keys(playerData)
    .filter((playerID) => playerData[playerID].longName === playerTwo)
    .map((playerID) => ({
      id: playerID,
      fantasyPoints: playerData[playerID].fantasyPoints,
    }));

  const playerComparison = () => {
    if (playerOneData.length > 0 && playerTwoData.length > 0) {
      if (playerOneData[0].fantasyPoints > playerTwoData[0].fantasyPoints) {
        setBestPlayerID(playerOneData[0].id);
        console.log(bestPlayerID);
      } else if (
        playerOneData[0].fantasyPoints < playerTwoData[0].fantasyPoints
      ) {
        setBestPlayerID(playerTwoData[0].id);
        console.log(bestPlayerID);
      }
    }
  };

  useEffect(() => {
    async function getPlayerInfo() {
      if (bestPlayerID) {
        try {
          const url = `https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLPlayerInfo?playerID=${bestPlayerID}&getStats=true`;
          const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key':
                'a3359fe54emsh86ff1ae90736126p120af4jsn6797c9bcf4e4',
              'X-RapidAPI-Host':
                'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com',
            },
          };
          const response = await fetch(url, options);
          const result = await response.json();
          const data = result.body;
          setPlayerInfo(data);
          console.log(playerInfo);
        } catch (error) {
          console.error(error);
        }
      }
    }

    getPlayerInfo();
  }, [bestPlayerID, playerInfo]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    playerComparison();
    setPlayerOne('');
    setPlayerTwo('');
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="flex flex-col justify-center mt-4">
          <h1 className="text-2xl mb-4">Start/Sit Decisions</h1>
          <br />
          <ul className="flex flex-col gap-[50px] m-auto">
            {scoringButtons.map((category) => (
              <div className="gap-2" key={category.Name}>
                <h3 className="mb-2">{category.Name}</h3>
                {category.buttons.map((buttonName) => (
                  <Button
                    key={buttonName}
                    onClick={() => handleButtonClick(category.Name, buttonName)}
                    className={
                      (category.Name === 'Scoring Format' &&
                        selectedScoring === buttonName) ||
                      (category.Name === 'Position' &&
                        selectedPosition === buttonName)
                        ? 'p-2 bg-blue-500 h-[45px] text-md w-[80px]'
                        : 'p-2 h-[45px] text-md w-[80px]'
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
                className="rounded m-4 p-2"
                value={week}
                onChange={handleWeekChange}
              />
            </li>
          </ul>
          <br />
          <br />
          <br /> <br />
          <form
            onSubmit={handleSubmit}
            className="flex gap-4 m-auto justify-center flex-col"
          >
            <div className=" flex gap-4 md:flex-row flex-col">
              <div className="flex flex-col">
                <label htmlFor="player1">Player 1</label>
                <input
                  value={playerOne}
                  onChange={handlePlayerOneChange}
                  id="player1"
                  className="p-2  rounded m-4"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="player2">Player 2</label>
                <input
                  value={playerTwo}
                  onChange={handlePlayerTwoChange}
                  id="player2"
                  className="p-2  rounded m-4"
                  type="text"
                />
              </div>
            </div>
            <Button type="submit" className="w-[100px]  p-2 m-auto">
              Submit
            </Button>
          </form>
          <br />
          <br />
          <br />
          {playerInfo ? (
            <div>
              <h1>{playerInfo[0]?.longName}</h1>
              <img src={playerInfo[0]?.espnHeadshot} alt="" />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}

export default StartSitDecision;
