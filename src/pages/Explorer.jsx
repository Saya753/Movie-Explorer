import { useState, useMemo, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api/fakeapi";
import { useWatchlist } from "../context/Watchlist";

import MovieCard from "../components/MovieCard";
import Searchbox from "../components/Searchbox";
import GenreFilter from "../components/GenreFilter";

export default function Explorer() {
  const {
    data: movies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  const { addMovie, isInWatchlist } = useWatchlist();

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [showToast, setShowToast] = useState(false);

  const searchRef = useRef(null);

  const genres = ["all", "action", "comedy", "crime", "drama", "sci-fi"];

  const filteredMovies = useMemo(() => {
    return movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase()) &&
        (genre === "all" || movie.genre === genre),
    );
  }, [movies, search, genre]);

  const handleAdd = useCallback(
    (movie) => {
      addMovie(movie);

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2000);

      searchRef.current?.focus();
    },
    [addMovie],
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading movies</p>;

  return (
    <div>
      {showToast && <div className="toast">Added to watchlist</div>}

      <div className="filters-row">
        <Searchbox
          ref={searchRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <GenreFilter
          genres={genres}
          selectedGenre={genre}
          onSelectGenre={setGenre}
        />
      </div>

      {filteredMovies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onAction={handleAdd}
            // actionLabel={isInWatchlist(movie.id) ? "Added" : "Add"}
          />
        ))
      )}
    </div>
  );
}
