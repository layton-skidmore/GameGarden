import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGameById } from '../../utilities/games-api';
import './EditGamePage.css'; 

export default function EditGamePage({ updateGame }) {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [updatedGameData, setUpdatedGameData] = useState({
    name: '',
    gameStudio: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGameDetails() {
      try {
        const response = await getGameById(id);
        setGame(response);
        setUpdatedGameData({
          name: response.name,
          gameStudio: response.gameStudio,
        });
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    }

    fetchGameDetails();
  }, [id]);

  const handleUpdateClick = async () => {
    try {
      console.log('Updating game with data:', updatedGameData);
      await updateGame(id, updatedGameData);
      console.log('Game updated successfully');

      navigate(`/games/${id}`);
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };

  return (
    <div className="edit-game-container">
      <h1 className="edit-game-title">Edit Game</h1>
      {game ? (
        <div className="edit-form">
          <label className="label">Name:</label>
          <input
            className="input"
            type="text"
            value={updatedGameData.name}
            onChange={(e) =>
              setUpdatedGameData({ ...updatedGameData, name: e.target.value })
            }
          />

          <label className="label">Game Studio:</label>
          <input
            className="input"
            type="text"
            value={updatedGameData.gameStudio}
            onChange={(e) =>
              setUpdatedGameData({
                ...updatedGameData,
                gameStudio: e.target.value,
              })
            }
          />

          <button className="update-button" onClick={handleUpdateClick}>
            Update
          </button>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
}
