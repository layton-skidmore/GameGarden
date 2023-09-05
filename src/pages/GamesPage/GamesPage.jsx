import './GamesPage.css'
import GameCard from '../../components/GameCard/GameCard';

export default function GamesPage({ games }) {
  return (
    <div>
      <h1>GamesPage</h1>
      {games.length ? (
        <table className="games-table"> {/* Apply the CSS class */}
          <thead>
            <tr>
              <th>Game Name</th>
              <th>Game Studio</th>
              <th>ESRB Rating</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, idx) => (
              <GameCard key={idx} game={game} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-games">No Games Yet</p>
      )}
    </div>
  );
}
