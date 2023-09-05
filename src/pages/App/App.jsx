import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import * as gamesAPI from '../../utilities/games-api';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import GamesPage from '../GamesPage/GamesPage';
import NavBar from '../../components/NavBar/NavBar';
import NewGameForm from '../../components/NewGameForm/NewGameForm'; // Import the NewGameForm

export default function App() {
  const [user, setUser] = useState(getUser());
  const [games, setGames] = useState([]);

  async function addGames(game) {
    const newGame = await gamesAPI.create(game);
    setGames([...games, newGame]);
  }

  useEffect(() => {
    async function getGames() {
      const allGames = await gamesAPI.index();
      setGames(allGames);
    }
    getGames();
  }, []); // Fetch games when the component mounts

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route
              path="/games/new"
              element={<NewGameForm addGame={addGames} />} // Pass the addGames function
            />
            <Route path="/" element={<GamesPage games={games} />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}