import './GamesPage.css';
import GameCard from '../../components/GameCard/GameCard';

export default function GamesPage({ games, onDelete, user }) {
  return (
    <div className="games-page">
      <h1> {user.name}'s GamesPage</h1>
      {games.length ? (
        <table className="games-table">
          <thead>
            <tr>
              <th>Game Name</th>
              <th>Game Studio</th>
              <th>ESRB Rating</th>
              <th>Action</th>
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
          <img className="graphic" src="https://i.imgur.com/Rj4bGWN.jpg" alt="" />
        </div>
      )}
    </div>
  );
}


