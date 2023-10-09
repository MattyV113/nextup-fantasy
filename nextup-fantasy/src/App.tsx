import './App.css';
import Navbar from './pages/NavBar/Navbar';
import './index.css';
import { useEffect, useMemo, useState } from 'react';
import NewsCard from './pages/NewsCard';

export type NewsTypes = {
  link: string;
  image: string;
  title: string;
  playerId: number;
};

function App() {
  const [lastestNews, setLatestNews] = useState<NewsTypes[]>([]);

  const url =
    'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLNews?recentNews=true&maxItems=10';
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
    /* async function getLatestNews() {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const data = result.body;
        console.log(data);
        setLatestNews(data);
      } catch (error) {
        console.error(error);
      }
    }
    getLatestNews();
    */
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h1 className=" mt-4 text-4xl">NextUp Fantasy</h1>
        {lastestNews.slice(0, 5).map((news: NewsTypes) => (
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
    </>
  );
}

export default App;
