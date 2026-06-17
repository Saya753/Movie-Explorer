import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  // ----------------------------
  // INIT STATE (persisted)
  // ----------------------------
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem("watchlist");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      return [];
    }
  });

  // ----------------------------
  // PERSIST TO LOCALSTORAGE
  // ----------------------------
  useEffect(() => {
    try {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    } catch (err) {
      console.error("Failed to save watchlist:", err);
    }
  }, [watchlist]);

  // ----------------------------
  // ADD MOVIE (stable)
  // ----------------------------
  const addMovie = useCallback((movie) => {
    setWatchlist((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) return prev;
      return [...prev, movie];
    });
  }, []);

  // ----------------------------
  // REMOVE MOVIE (stable)
  // ----------------------------
  const removeMovie = useCallback((id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // ----------------------------
  // CHECK MOVIE (memoized lookup)
  // ----------------------------
  const isInWatchlist = useCallback(
    (id) => {
      return watchlist.some((m) => m.id === id);
    },
    [watchlist],
  );

  // ----------------------------
  // DERIVED VALUE (no state)
  // ----------------------------
  const count = useMemo(() => watchlist.length, [watchlist]);

  // ----------------------------
  // CONTEXT VALUE (fully memoized)
  // ----------------------------
  const value = useMemo(
    () => ({
      watchlist,
      addMovie,
      removeMovie,
      isInWatchlist,
      count,
    }),
    [watchlist, addMovie, removeMovie, isInWatchlist, count],
  );

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

// ----------------------------
// CUSTOM HOOK
// ----------------------------
export function useWatchlist() {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error("useWatchlist must be used within WatchlistProvider");
  }

  return context;
}
