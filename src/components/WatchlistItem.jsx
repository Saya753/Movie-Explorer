import React from "react";
const WatchlistItem = React.memo(function WatchlistItem({ movie, onRemove }) {
  return (
    <div className="watchlist-item">
      <h3>{movie.title}</h3>
      <p>
        <strong>Year: </strong> {movie.year}
      </p>
      <p>
        <strong>Genre: </strong> {movie.genre}
      </p>
      <button
        onClick={() => onRemove(movie.id)}
      >
         Remove from watch list. 
      </button>
    </div>
  );
});
export default WatchlistItem;