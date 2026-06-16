import React from "react";
import { Link } from "react-router-dom";

const WatchlistItem = React.memo(function WatchlistItem({ movie, onRemove }) {
  return (
    <div className="watchlist-item">
      <h3>{movie.title}</h3>

      <p>
        <strong>Year:</strong> {movie.year}
      </p>

      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>

      <div className="watchlist-actions">
        <Link to={`/movie/${movie.id}`}>
          <button>Details</button>
        </Link>

        <button onClick={() => onRemove(movie.id)}>
          Remove from Watchlist
        </button>
      </div>
    </div>
  );
});

export default WatchlistItem;
