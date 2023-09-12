import './GameCard.css';
import { deleteGame } from '../../utilities/games-api'
import { Link } from 'react-router-dom';
export default function GameCard({ game, onDelete }) {
  const handleDeleteClick = async () => {
    try {
      await deleteGame(game._id); 
      onDelete(game._id); 
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  return (
    <tr className="game-card">
      <td>{game.name}</td>
      <td>{game.gameStudio}</td>
      <td>{game.esrbRating}</td>
      <td>
        <button onClick={handleDeleteClick}>Delete</button>
        <Link to={`/games/${game._id}/edit`}>Edit</Link> 
      </td>
      <td>
        <Link to={`/games/${game._id}`}>Review</Link>
      </td>
    </tr>
  );
}
