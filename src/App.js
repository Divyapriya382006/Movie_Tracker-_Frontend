import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [movies, setMovies] = useState(() => {
    const saved = localStorage.getItem("movies");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("Completed");
  const [lang, setLang] = useState("English");
  const [genre, setGenre] = useState("FeelGood");
  const [rating, setRating] = useState(5);
  const [time, setTime] = useState("This Year");

  const addMov = (e) => {
    e.preventDefault();
    const newMovie = {
      id: Date.now(),
      name,
      status,
      lang,
      genre,
      rating: `${rating}/10`,
      time,
    };
    setMovies((prev) => [...prev, newMovie]);
    setName("");
    setStatus("Completed");
    setLang("English");
    setGenre("FeelGood");
    setRating(5);
    setTime("This Year");
  };

  const update = (id, field, value) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, [field]: value } : movie
      )
    );
  };

  const deleteMovie = (id) => {
    setMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <div className="App">
      <h1>Movie Tracker</h1>
      <form onSubmit={addMov}>
        <input
          className="moviename"
          type="text"
          placeholder="Enter Movie Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          className="progressselect"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Yet to Watch">Yet to Watch</option>
        </select>

        <select
          className="progressselect"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Tamil">Tamil</option>
          <option value="Hindi">Hindi</option>
          <option value="Telugu">Telugu</option>
          <option value="Malayalam">Malayalam</option>
        </select>

        <select
          className="progressselect"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="FeelGood">Feel-Good</option>
          <option value="Comedy">Comedy</option>
          <option value="Horror">Horror</option>
          <option value="Thriller">Thriller</option>
          <option value="Rom-Com">Rom-Com</option>
        </select>

        <label>
          Rate it!
          <input
            type="range"
            className="Rating"
            min="0"
            max="10"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <span>{rating}/10</span>
        </label>

        <select
          className="progressselect"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="This Year">This Year</option>
        </select>

        <button className="submitbtn" type="submit">
          Submit
        </button>
      </form>

      <h2 className="countba">Total number of movies:{movies.length}</h2>

      <ul className="movieslist">
        {movies.map((movie) => (
          <li key={movie.id} className="movieitem">
            <div className="movietext">
              <span>{movie.name}</span>
              <span>
                ({movie.status}, {movie.lang}, {movie.genre}, {movie.rating},
                {movie.time})
              </span>
            </div>

            <div className="update">
              <select
                value={movie.status}
                onChange={(e) => update(movie.id, "status", e.target.value)}
                className="priority-select"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Yet to Watch">Yet to Watch</option>
              </select>

              <select
                value={movie.lang}
                onChange={(e) => update(movie.id, "lang", e.target.value)}
                className="priority-select"
              >
                <option value="English">English</option>
                <option value="Tamil">Tamil</option>
                <option value="Hindi">Hindi</option>
                <option value="Telugu">Telugu</option>
                <option value="Malayalam">Malayalam</option>
              </select>

              <select
                value={movie.genre}
                onChange={(e) => update(movie.id, "genre", e.target.value)}
                className="priority-select"
              >
                <option value="FeelGood">Feel-Good</option>
                <option value="Comedy">Comedy</option>
                <option value="Horror">Horror</option>
                <option value="Thriller">Thriller</option>
                <option value="Rom-Com">Rom-Com</option>
              </select>

              <select
                value={movie.time}
                onChange={(e) => update(movie.id, "time", e.target.value)}
                className="priority-select"
              >
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="This Year">This Year</option>
              </select>

              <button
                onClick={() => deleteMovie(movie.id)}
                className="deletebtn"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
