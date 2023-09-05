import './GameCard.css'; // Import the CSS file

export default function GameCard({ game }) {
  return (
    <tr className="game-card"> {/* Apply the CSS class */}
      <td>{game.name}</td>
      <td>{game.gameStudio}</td>
      <td>{game.esrbRating}</td>
    </tr>
  );
}
