import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "../api/fakeapi";
import { useWatchlist } from "../context/Watchlist";
import { useAuth } from "../context/Auth";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn } = useAuth();
  const { addMovie, removeMovie, isInWatchlist } = useWatchlist();

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(Number(id)),
  });

  const handleToggleWatchlist = () => {
    if (!movie) return;

    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          from: location.pathname,
          movie,
        },
      });
      return;
    }

    if (isInWatchlist(movie.id)) {
      removeMovie(movie.id);
      navigate("/watchlist");
    } else {
      addMovie(movie);
    }
  };

  if (isLoading) return <p>Loading movie details...</p>;
  if (isError) return <p>Failed to load movie.</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="movie-detail">
      <h2>{movie.title}</h2>

      <p>
        <strong>Year:</strong> {movie.year}
      </p>
      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p>
        <strong>Rating:</strong> {movie.rating}
      </p>
      <p>
        <strong>Director:</strong> {movie.director}
      </p>
      <p>
        <strong>Cast:</strong> {movie.cast.join(", ")}
      </p>
      <p>
        <strong>Plot:</strong> {movie.plot}
      </p>

      <button onClick={handleToggleWatchlist}>
        {isInWatchlist(movie.id) ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
