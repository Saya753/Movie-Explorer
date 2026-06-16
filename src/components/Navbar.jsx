import { NavLink, Link } from "react-router-dom"; 
import { useAuth } from "../context/Auth";
import { useWatchlist } from "../context/Watchlist";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const { watchlist } = useWatchlist();
  return (
    <nav style={{ display: "flex", gap: "20px", borderBottom: "1px solid #ccc", padding: "10px" }}>
      <NavLink to="/">Movie Explorer</NavLink>

      <NavLink to="/searchbox">Search</NavLink>

      <NavLink to="/watchlist">Watch List ({watchlist.length})</NavLink>
      {isLoggedIn ? (
        <>
          <span>User: {user}</span>

          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </nav>
  );
}