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
      {/* همیشه نمایش داده می‌شود */}
      <NavLink to="/">Explore</NavLink>

      {/* فقط وقتی لاگین هستی */}
      {isLoggedIn && <NavLink to="/watchlist">Watch List ({count})</NavLink>}

      {/* فقط وقتی لاگین نیستی */}
      {!isLoggedIn && <NavLink to="/login">Login</NavLink>}

      {/* فقط وقتی لاگین هستی */}
      {isLoggedIn && (
        <>
          <span>User: {user}</span>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}
