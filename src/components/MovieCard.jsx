import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { useWatchlist } from "../context/Watchlist";

const MovieCard = React.memo(function MovieCard({ movie }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn } = useAuth();
  const { addMovie, isInWatchlist } = useWatchlist();

  const handleAdd = () => {
    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          from: location.pathname,
          movie,
        },
      });
      return;
    }

    addMovie(movie);
  };

  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>

      <Link to={`/movie/${movie.id}`}>Details</Link>
    </div>
  );
});

export default MovieCard;
