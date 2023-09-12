import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="navbar">
      <div className="nav-logo">
      <Link to="/">
        <img src="https://i.imgur.com/zlklMjn.png" alt="My GameGarden" />
      </Link>
      </div>
      &nbsp; | &nbsp;
      <Link to="/games/new">New Game</Link>
      &nbsp; | &nbsp;
      <Link to="/devs">Top 10</Link>
      &nbsp; | &nbsp;
      <Link to="/contest">Contest</Link>
      &nbsp; | &nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}