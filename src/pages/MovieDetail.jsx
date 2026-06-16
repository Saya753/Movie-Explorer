import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "../api/fakeapi";
import { useWatchlist } from "../context/Watchlist";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: movie,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id),
  });
  const {
    addMovie,
    removeMovie,
    isInWatchlist
  } = useWatchlist();

  // افزودن یا حذف
  const handleToggleWatchlist = () => {
    if (!movie) return;
    if (isInWatchlist(movie.id)) {
      removeMovie(movie.id);
    } else {
      addMovie(movie);
    }
    navigate("/watchlist");
  };
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;
  if (!movie) return <p>Movie Not Found.</p>;
  return (
    <div>
      <h2>{movie.title}</h2>
      <p><strong>Year: </strong> {movie.year}</p>
      <p><strong>Genre: </strong> {movie.genre}</p>
      <p><strong>Rating: </strong> {movie.rating}</p>
      <p><strong>Director: </strong> {movie.director}</p>
      <p><strong>Actors: </strong> {movie.actors}</p>
      <p><strong>Description: </strong> {movie.description}</p>
      <button onClick={handleToggleWatchlist}>
        {isInWatchlist(movie.id)
          ? "Remove from watch list."
          : "Add to watch list."}
      </button>
    </div>
  );
}