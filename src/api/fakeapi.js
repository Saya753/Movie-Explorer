const movies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genre: "sci-fi",
    rating: 8.8,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Elliot Page"],
    plot: "A thief who steals corporate secrets through dream-sharing technology...",
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    genre: "action",
    rating: 9.0,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger"],
    plot: "When the menace known as the Joker wreaks havoc on the people of Gotham...",
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    genre: "sci-fi",
    rating: 8.6,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway"],
    plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: 4,
    title: "The Godfather",
    year: 1972,
    genre: "crime",
    rating: 9.2,
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino"],
    plot: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
  },
  {
    id: 5,
    title: "Pulp Fiction",
    year: 1994,
    genre: "crime",
    rating: 8.9,
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman"],
    plot: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
  },
  {
    id: 6,
    title: "The Matrix",
    year: 1999,
    genre: "sci-fi",
    rating: 8.7,
    director: "The Wachowskis",
    cast: ["Keanu Reeves", "Laurence Fishburne"],
    plot: "A computer hacker learns from mysterious rebels about the true nature of his reality.",
  },
  {
    id: 7,
    title: "The Hangover",
    year: 2009,
    genre: "comedy",
    rating: 7.7,
    director: "Todd Phillips",
    cast: ["Bradley Cooper", "Zach Galifianakis"],
    plot: "Three buddies wake up from a bachelor party in Las Vegas with no memory of the previous night.",
  },
  {
    id: 8,
    title: "Se7en",
    year: 1995,
    genre: "crime",
    rating: 8.6,
    director: "David Fincher",
    cast: ["Morgan Freeman", "Brad Pitt"],
    plot: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motifs.",
  },
  {
    id: 9,
    title: "Superbad",
    year: 2007,
    genre: "comedy",
    rating: 7.6,
    director: "Greg Mottola",
    cast: ["Jonah Hill", "Michael Cera"],
    plot: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
  },
  {
    id: 10,
    title: "Gladiator",
    year: 2000,
    genre: "action",
    rating: 8.5,
    director: "Ridley Scott",
    cast: ["Russell Crowe", "Joaquin Phoenix"],
    plot: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family.",
  },
  {
    id: 11,
    title: "Parasite",
    year: 2019,
    genre: "drama",
    rating: 8.5,
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun"],
    plot: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
  },
  {
    id: 12,
    title: "The Truman Show",
    year: 1998,
    genre: "drama",
    rating: 8.2,
    director: "Peter Weir",
    cast: ["Jim Carrey", "Laura Linney"],
    plot: "An insurance salesman discovers his whole life is actually a reality TV show.",
  },
  {
    id: 13,
    title: "Mad Max: Fury Road",
    year: 2015,
    genre: "action",
    rating: 8.1,
    director: "George Miller",
    cast: ["Tom Hardy", "Charlize Theron"],
    plot: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland.",
  },
  {
    id: 14,
    title: "Snatch",
    year: 2000,
    genre: "comedy",
    rating: 8.2,
    director: "Guy Ritchie",
    cast: ["Jason Statham", "Brad Pitt"],
    plot: "Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and Jewish jewelers fight to track down a priceless stolen diamond.",
  },
  {
    id: 15,
    title: "Joker",
    year: 2019,
    genre: "crime",
    rating: 8.4,
    director: "Todd Phillips",
    cast: ["Joaquin Phoenix", "Robert De Niro"],
    plot: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society.",
  },
  {
    id: 16,
    title: "The Prestige",
    year: 2006,
    genre: "drama",
    rating: 8.5,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Hugh Jackman"],
    plot: "After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion.",
  },
  {
    id: 17,
    title: "Deadpool",
    year: 2016,
    genre: "action",
    rating: 8.0,
    director: "Tim Miller",
    cast: ["Ryan Reynolds", "Morena Baccarin"],
    plot: "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.",
  },
  {
    id: 18,
    title: "Step Brothers",
    year: 2008,
    genre: "comedy",
    rating: 6.9,
    director: "Adam McKay",
    cast: ["Will Ferrell", "John C. Reilly"],
    plot: "Two middle-aged, leisure-loving boys living at home are forced to become roommates when their parents marry.",
  },
  {
    id: 19,
    title: "The Departed",
    year: 2006,
    genre: "crime",
    rating: 8.5,
    director: "Martin Scorsese",
    cast: ["Leonardo DiCaprio", "Matt Damon"],
    plot: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang.",
  },
  {
    id: 20,
    title: "Arrival",
    year: 2016,
    genre: "sci-fi",
    rating: 7.9,
    director: "Denis Villeneuve",
    cast: ["Amy Adams", "Jeremy Renner"],
    plot: "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
  },
];

export const getMovies = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // شبیه‌سازی خطای احتمالی شبکه (۱۰ درصد احتمال خطا)
      if (Math.random() < 0.1) {
        reject(new Error("Server Error"));
        return;
      }

      resolve(movies);
    }, 800);
  });

export const getMovieById = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const movie = movies.find((m) => m.id === Number(id));
      if (movie) {
        resolve(movie);
      } else {
        reject(new Error("Movie not found"));
      }
    }, 800); // زمان پاسخ‌دهی برای جزئیات
  });
