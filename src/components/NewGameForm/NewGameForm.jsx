import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewGameForm({ addGame }) {
  const [newGame, setNewGame] = useState({
    name: '',
    gameStudio: '',
    esrbRating: '', 
  });
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();
    addGame(newGame);
    setNewGame({
      name: '',
      gameStudio: '',
      esrbRating: '', 
    });
    navigate('/games');
  }

  function handleChange(evt) {
    setNewGame({ ...newGame, [evt.target.name]: evt.target.value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={newGame.name}
        onChange={handleChange}
        placeholder="Game Name"
        required
      />
      <input
        type="text"
        name="gameStudio"
        value={newGame.gameStudio}
        onChange={handleChange}
        placeholder="Game Studio"
        required
      />
      <select
        name="esrbRating"
        value={newGame.esrbRating}
        onChange={handleChange}
        required
      >
        <option value="">Select ESRB Rating</option>
        <option value="E">E</option>
        <option value="T">T</option>
        <option value="M">M</option>
      </select>
      <button type="submit">Add Game</button>
    </form>
  );
}