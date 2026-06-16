import React from "react";

function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="genre-filter">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onSelectGenre(genre)}
          className={selectedGenre === genre ? "active" : ""}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;
