import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import * as gamesAPI from '../../utilities/games-api';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import GamesPage from '../GamesPage/GamesPage';
import NavBar from '../../components/NavBar/NavBar';
import NewGameForm from '../../components/NewGameForm/NewGameForm'; 
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import EditGamePage from '../EditGamePage/EditGamePage';
import DevPage from '../DevPage/DevPage';
import GameDetailsPage from '../GameDetailsPage/GameDetailsPage';
import ContestPage from '../ContestPage/ContestPage';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  

  async function addGame(game, userId) {
    try {
        game.user = userId; 
        const newGame = await gamesAPI.create(game);
        setGames([...games, newGame]);
    } catch (error) {
        console.error('Error adding game:', error);
    }
}

  async function deleteGame(gameId) {
    try {
      await gamesAPI.deleteGame(gameId);
      setGames(games.filter((game) => game._id !== gameId));
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  }

  async function updateGame(gameId, updatedGameData) {
    try {
      await gamesAPI.updateGame(gameId, updatedGameData);
      const updatedGame = await gamesAPI.getGameById(gameId)
      setGames((prevGames) =>
        prevGames.map((game) =>
          game._id === gameId ? updatedGame : game
        )
      );
      navigate(`/games`);
    } catch (error) {
      console.error('Error updating game:', error);
    }
  }

  useEffect(() => {
    async function getGames() {
      console.log('User ID:', user._id);
      const allGames = await gamesAPI.index();
      console.log('All Games:', allGames);
    
      const userGames = allGames.filter((game) => {
        console.log(`Game User ID: ${game.user}`);
        return game.user === user._id;
      });
    
      console.log('User Games:', userGames);
    
      setGames(userGames);
    }
  
    if (user) {
      console.log('User is authenticated:', user);
      getGames();
    } else {
      console.log('User is not authenticated');
      setGames([]);
    }
  }, [user]);

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route
              path="/games/new"
              element={<NewGameForm addGame={addGame} user={user} />}
            />
            <Route
              path="/"
              element={<GamesPage games={games} user={user}  onDelete={deleteGame} />}
            />
            <Route 
            path="/games/:id" 
            element={<GameDetailsPage user={user}/>} 
            />
            <Route
            path="/reviews/new"
            element={<ReviewForm user={user} />}
            />
            <Route 
            path="/games/:id/edit" 
            element={<EditGamePage updateGame={updateGame} />} />
            <Route 
            path="/devs" 
            element={<DevPage user={user}/>} 
            />
            <Route
            path="/contest"
            element={<ContestPage />}
            />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}