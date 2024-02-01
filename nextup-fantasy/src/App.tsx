import './App.css';
import Navbar from './pages/NavBar/Navbar';
import './index.css';
import { useEffect, useMemo, useState } from 'react';
import NewsCard from './pages/NewsCard';
import ScheduleCard from './pages/ScheduleCard';

export type NewsTypes = {
  link: string;
  image: string;
  title: string;
  playerId: number;
};

export type ScheduleTypes = {
  gameDate: string;
};

function App() {
  const [lastestNews, setLatestNews] = useState<NewsTypes[]>([]);
  const [schedule, setSchedule] = useState<ScheduleTypes>('');

  const newsUrl =
    'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLNews?recentNews=true&maxItems=10';
  const newsOptions = useMemo(
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

  const scheduleUrl =
    'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLGamesForDate?gameDate=20240107';
  const scheduleOptions = useMemo(
    () => ({
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8c30d39afcmsh1a0df2646f934fcp16591fjsn2ee4c5365179',
        'X-RapidAPI-Host':
          'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com',
      },
    }),
    []
  );

  useEffect(() => {
    async function getLatestNews() {
      try {
        const response = await fetch(newsUrl, newsOptions);
        const result = await response.json();
        const data = result.body;
        console.log(data);
        setLatestNews(data);
      } catch (error) {
        console.error(error);
      }
    }
    getLatestNews();
  }, []);

  useEffect(() => {
    async function getLatestSchedule() {
      try {
        const response = await fetch(scheduleUrl, scheduleOptions);
        const result = await response.json();
        const data = result.body;
        console.log(data);
        setSchedule(data);
      } catch (error) {
        console.error(error);
      }
    }
    getLatestSchedule();
  }, []);

  return (
    <>
      <Navbar />
      <div className="gap-4">
        <h1 className=" mt-4 text-4xl">NextUp Fantasy</h1>
        <br />
        <br />
        <br />
        <div>
          <h1 className="text-2xl font-semibold">Super Bowl LVIII </h1>
          <ScheduleCard />
        </div>
        <h3 className="mt-[100px]">Latest News and Reports</h3>
        <div className="mt-[50px] grid grid-cols-1 md:grid-cols-2 gap-4 justify-between">
          {lastestNews.slice(0, 4).map((news: NewsTypes) => (
            <>
              <NewsCard
                link={news.link}
                title={news.title}
                image={news.image}
                playerId={news.playerId}
              />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
