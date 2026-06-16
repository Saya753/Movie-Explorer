import React from "react";
import { Link } from "react-router-dom";

const MovieCard = React.memo(function MovieCard({
  movie,
  onAction,
  actionLabel,
}) {
  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>

      <p>{movie.year}</p>
      <p>{movie.genre}</p>
      <p>{movie.rating}</p>

      <Link to={`/movie/${movie.id}`}>Details</Link>

      <button onClick={() => onAction(movie)}>{actionLabel}</button>
    </div>
  );
});

export default MovieCard;
