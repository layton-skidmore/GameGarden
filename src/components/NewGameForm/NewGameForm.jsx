import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewGameForm.css'; 

export default function NewGameForm({ addGame, user }) {
  const [newGame, setNewGame] = useState({
    name: '',
    gameStudio: '',
    esrbRating: '',
    imageUrl: '', // Add imageUrl field to the newGame state
  });
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();
    const userId = user._id;
    addGame({ ...newGame, user: userId });
    setNewGame({
      name: '',
      gameStudio: '',
      esrbRating: '',
      imageUrl: '', // Clear imageUrl field after submission
    });
    navigate('/');
  }

  function handleChange(evt) {
    setNewGame({ ...newGame, [evt.target.name]: evt.target.value });
  }

  return (
    <div className="new-game-form">
      <h2>Add a New Game</h2>
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
        <input
          type="text"
          name="imageUrl" 
          value={newGame.imageUrl}
          onChange={handleChange}
          placeholder="Image URL (Optional)"
        />
        <button type="submit" className="add-game-button">
          Add Game
        </button>
      </form>
      <img
        src="https://cdn.pixabay.com/photo/2016/06/29/14/12/joystick-1486898_1280.png"
        alt="Game Controller"
        className="game-controller-image"
      />
    </div> 
  );
}