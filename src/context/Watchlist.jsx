// watchlist
// addMovie
// removeMovie
// isInWatchlist
// count

import { createContext, useContext, useState, useCallback, useMemo } from "react";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  // افزودن فیلم
  const addMovie = useCallback((movie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  }, []);

  // حذف فیلم
  const removeMovie = useCallback((id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // بررسی وجود فیلم
  const isInWatchlist = useCallback(
    (id) => watchlist.some((movie) => movie.id === id),
    [watchlist]
  );

  // تعداد فیلم‌ها
  const count = watchlist.length;

  const value = useMemo(
    () => ({
      watchlist,
      addMovie,
      removeMovie,
      isInWatchlist,
      count,
    }),
    [watchlist, addMovie, removeMovie, isInWatchlist]
  );

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};

// هوک دسترسی آسان
export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within WatchlistProvider");
  }
  return context;
};