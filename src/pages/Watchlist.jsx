import { useState, useMemo, useCallback } from "react";
import { useWatchlist } from "../context/Watchlist";
import WatchlistItem from "../components/WatchlistItem";

export default function Watchlist() {
  const { watchlist, removeMovie } = useWatchlist();

  const [search, setSearch] = useState("");

  const filteredWatchlist = useMemo(() => {
    return watchlist.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [watchlist, search]);

  const handleRemove = useCallback(
    (id) => {
      removeMovie(id);
    },
    [removeMovie],
  );

  return (
    <div className="watchlist-page">
      <h2>Watch List</h2>

      <p>
        Movie Count: <strong>{watchlist.length}</strong>
      </p>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search in watchlist..."
      />

      {filteredWatchlist.length === 0 ? (
        <p>No movie found in your watchlist.</p>
      ) : (
        <div className="watchlist-container">
          {filteredWatchlist.map((movie) => (
            <WatchlistItem
              key={movie.id}
              movie={movie}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
