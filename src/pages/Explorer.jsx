import { useState, useMemo, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api/fakeapi";
import { useWatchlist } from "../context/Watchlist";
import MovieCard from "../components/MovieCard";
import Searchbox from "../components/Searchbox";
import GenreFilter from "../components/GenreFilter";

export default function Explorer() {

  const { data: movies, isLoading, isError } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies
  });

  const { addMovie, isInWatchlist } = useWatchlist();
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const genres = ["Action", "Drama", "Comedy", "Sci-Fi", "Horror"];
  const [showToast, setShowToast] = useState(false);
  const searchRef = useRef(null);

  // فیلتر فیلم‌ها
  const filteredMovies = useMemo(() => {
    if (!movies) return [];

    return movies.filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) &&
      (genre === "All" || m.genre === genre)
    );

  }, [movies, search, genre]);

  const handleAdd = useCallback((movie) => {

    if (!isInWatchlist(movie.id)) {
      addMovie(movie);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);

      if (searchRef.current) {
        searchRef.current.focus();
      }
    }

  }, [addMovie, isInWatchlist]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  return (
    <div>

      {showToast && (
        <div className="toast">Movie addeed to watch list.</div>
      )}
      <Searchbox
        ref={searchRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Searching ..."
      />
      <div className="genres">
        {["All", "action", "comedy", "crime", "drama", "sci-fi"].map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            style={{ background: genre === g ? "yellow" : "" }}
          >
            {g}
          </button>
        ))}
      </div>
      <div className="movie-list">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onAction={handleAdd}
            actionLabel={
              isInWatchlist(movie.id) ? "[In watch list]" : "[Add]"
            }
          />
        ))}
      </div>
    </div>
  );
}







// import { useState, useMemo, useRef, useCallback } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getMovies } from "../api/fakeapi";
// import { useWatchlist } from "../context/Watchlist";

// function Explorer() {

//   // دریافت فیلم ها
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["movies"],
//     queryFn: getMovies
//   });

//   // جستجو
//   const [search, setSearch] = useState("");

//   // ژانر
//   const [genre, setGenre] = useState("all");

//   // پیام موقت
//   const [message, setMessage] = useState("");

//   // ref برای فوکوس
//   const searchRef = useRef(null);

//   const { addMovie } = useWatchlist();

//   // افزودن فیلم
//   const handleAddMovie = useCallback((movie) => {
//     addMovie(movie);
//     // جلوگیری از Render Loop
//     setMessage("فیلم اضافه شد");

//     if (searchRef.current) {
//       searchRef.current.focus();
//     }

//     setTimeout(() => {
//       setMessage("");
//     }, 2000);

//   }, [addMovie]);

//   // فیلتر فیلم‌ها
//   const filteredMovies = useMemo(() => {

//     if (!data) return [];

//     return data.filter((movie) => {

//       const matchName =
//         movie.title
//           .toLowerCase()
//           .includes(search.toLowerCase());

//       const matchGenre =
//         genre === "all" ||
//         movie.genre === genre;

//       return matchName && matchGenre;

//     });

//   }, [data, search, genre]);

//   if (isLoading) return <p>در حال بارگذاری...</p>;
//   if (isError) return <p>خطا در دریافت فیلم‌ها</p>;

// }