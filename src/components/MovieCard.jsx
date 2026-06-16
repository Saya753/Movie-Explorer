import React from "react";
import { Link } from "react-router-dom";
import { useWatchlist } from "../context/Watchlist";

// باعث می‌شود اگر props تغییر نکردند کامپوننت دوباره render نشود.
const MovieCard = React.memo(function MovieCard({
  id,
  title,
  rating,
  year,
  genre,
}) {
  const { addMovie, isInWatchlist } = useWatchlist();
  const handleAdd = () => {
    //  ارسال اطلاعات فیلم
    // برای اینکه Watchlist صفحه جداگانه fetch نکند:
    addMovie({ id, title, rating, year, genre });
  };

  //  جلوگیری از اضافه شدن تکراری
  // اگر فیلم قبلاً اضافه شده باشد دکمه disabled می‌شود  و متن دکمه تغییر می‌کند
  const added = isInWatchlist(id);
  return (
    <div className="movie-card">
      <h3>{title}</h3>

      <p>{rating}</p>
      <p>{year}</p>
      <p>{genre}</p>

      <div className="actions">
        {/*  لینک به صفحه جزئیات */}
        <Link to={`/movie/${id}`}>details</Link>

        <button onClick={handleAdd} disabled={added}>
          {added ? "Added." : "Add"}
        </button>
      </div>
    </div>
  );
});
export default MovieCard;