import './GamesPage.css';
import GameCard from '../../components/GameCard/GameCard';

export default function GamesPage({ games, onDelete, user }) {
  return (
    <div className="games-page">
      <div className="name-container">
      <h1> {user.name}'s GameGarden</h1>
      </div>
      {games.length ? (
        <table className="games-table">
          <thead>
            <tr>
              <th>Game Name</th>
              <th>Game Studio</th>
              <th>ESRB Rating</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <GameCard key={game._id} game={game} user={user} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-games">
          <p>No Games Yet</p>
          <img className="graphic" src="https://i.imgur.com/yEyVFIV.png" alt="" />
        </div>
      )}
    </div>
  );
}


