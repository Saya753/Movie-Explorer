import { NavLink } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { useWatchlist } from "../context/Watchlist";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const { count } = useWatchlist();

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        borderBottom: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <NavLink to="/">Explore</NavLink>

      <NavLink to="/watchlist">Watch List ({count})</NavLink>

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
