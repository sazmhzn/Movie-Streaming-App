import { useState, useEffect } from "react";
import axios from "axios";
import Banner from "@/components/Banner";
import Carousel from "@/components/Carousel";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch movies from API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get("https://api.example.com/movies"); // Replace with actual API
        setMovies(data.results);
        setFilteredMovies(data.results);
        setSelectedMovie(data.results[0]); // Set the first movie as the default
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  // Handle search input
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };

  return (
    <div className="home-container">
      {/* Search Bar */}
      {/* <SearchBar onSearch={handleSearch} /> */}

      {/* Movie Banner */}
      {selectedMovie && <Banner movie={selectedMovie} />}

      {/* Movie Carousel */}
      {/* <Carousel
        movies={filteredMovies}
        onMovieSelect={setSelectedMovie}
      /> */}

      <style jsx>{`
        .home-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          color: #fff;
          background-color: #000;
        }
      `}</style>
    </div>
  );
}
