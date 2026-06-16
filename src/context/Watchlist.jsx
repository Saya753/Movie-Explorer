// // watchlist
// // addMovie
// // removeMovie
// // isInWatchlist
// // count

// import { createContext, useContext, useState, useCallback, useMemo } from "react";

// const WatchlistContext = createContext();

// export const WatchlistProvider = ({ children }) => {
//   const [watchlist, setWatchlist] = useState([]);

//   // افزودن فیلم
//   const addMovie = useCallback((movie) => {
//     setWatchlist((prev) => {
//       if (prev.some((m) => m.id === movie.id)) return prev;
//       return [...prev, movie];
//     });
//   }, []);

//   // حذف فیلم
//   const removeMovie = useCallback((id) => {
//     setWatchlist((prev) => prev.filter((m) => m.id !== id));
//   }, []);

//   // بررسی وجود فیلم
//   const isInWatchlist = useCallback(
//     (id) => watchlist.some((movie) => movie.id === id),
//     [watchlist]
//   );

//   // تعداد فیلم‌ها
//   const count = watchlist.length;

//   const value = useMemo(
//     () => ({
//       watchlist,
//       addMovie,
//       removeMovie,
//       isInWatchlist,
//       count,
//     }),
//     [watchlist, addMovie, removeMovie, isInWatchlist]
//   );

//   return (
//     <WatchlistContext.Provider value={value}>
//       {children}
//     </WatchlistContext.Provider>
//   );
// };

// // هوک دسترسی آسان
// export const useWatchlist = () => {
//   const context = useContext(WatchlistContext);
//   if (!context) {
//     throw new Error("useWatchlist must be used within WatchlistProvider");
//   }
//   return context;
// };

// import { createContext, useContext, useEffect, useState } from "react";

// const WatchlistContext = createContext();

// export function WatchlistProvider({ children }) {
//   const [watchlist, setWatchlist] = useState(() => {
//     const saved = localStorage.getItem("watchlist");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // sync with localStorage
//   useEffect(() => {
//     localStorage.setItem("watchlist", JSON.stringify(watchlist));
//   }, [watchlist]);

//   const addMovie = (movie) => {
//     setWatchlist((prev) => {
//       if (prev.some((m) => m.id === movie.id)) return prev;
//       return [...prev, movie];
//     });
//   };

//   const removeMovie = (id) => {
//     setWatchlist((prev) => prev.filter((m) => m.id !== id));
//   };

//   const isInWatchlist = (id) => {
//     return watchlist.some((m) => m.id === id);
//   };

//   const count = watchlist.length;

//   return (
//     <WatchlistContext.Provider
//       value={{
//         watchlist,
//         addMovie,
//         removeMovie,
//         isInWatchlist,
//         count,
//       }}
//     >
//       {children}
//     </WatchlistContext.Provider>
//   );
// }

// export const useWatchlist = () => useContext(WatchlistContext);

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

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
