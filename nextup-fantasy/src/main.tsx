import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext.tsx';
import WeeklyRanks from './pages/WeeklyRanks.tsx';
import Navbar from './pages/NavBar/Navbar.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/weekly-rankings',
    element: <WeeklyRanks />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
