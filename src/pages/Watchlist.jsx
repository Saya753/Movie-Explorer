import { useState, useMemo, useCallback } from "react";
import { useWatchlist } from "../context/Watchlist"; 
import React from "react";

const WatchlistItem = React.memo(function WatchlistItem({ movie, onRemove }) {
  console.log("Rendering WatchlistItem:", movie.title); // برای تست بهینه‌سازی
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0", borderRadius: "8px" }}>
      <h3>{movie.title}</h3>
      <p>Year: {movie.year} | Genre: {movie.genre}</p>
      <button 
        onClick={() => onRemove(movie.id)}
        style={{ backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "4px" }}
      >
        Delete
      </button>
    </div>
  );
});

export default function Watchlist() {
  // استفاده از Destructuring درست
  const { watchlist, removeMovie } = useWatchlist();
  const [search, setSearch] = useState("");

  // فیلتر لیست با استفاده از useMemo برای بهینه‌سازی
  const filteredWatchlist = useMemo(() => {
    return watchlist.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [watchlist, search]);

  // مموآیز کردن تابع حذف برای جلوگیری از رندر اضافه WatchlistItem
  const handleRemove = useCallback((id) => {
    removeMovie(id);
  }, [removeMovie]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Watch List</h2>
      <p>Movie Count: <strong>{watchlist.length}</strong></p>
      
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search in watch list..."
        style={{ padding: "8px", width: "100%", marginBottom: "20px" }}
      />

      {filteredWatchlist.length === 0 ? (
        <p>No movie found in your watch list.</p>
      ) : (
        filteredWatchlist.map((movie) => (
          <WatchlistItem
            key={movie.id}
            movie={movie}
            onRemove={handleRemove}
          />
        ))
      )}
    </div>
  );
}