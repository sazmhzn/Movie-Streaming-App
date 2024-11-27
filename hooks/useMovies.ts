import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/discover/";

export const useMovies = (isMovie: Boolean) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${API_URL}${isMovie ? "movie" : "tv"}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
            },
          }
        );
        setMovies(response.data.results); // Assume results contain the list of movies
        console.log(response.data.results);
      } catch (err) {
        setError("Failed to fetch movie data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};
