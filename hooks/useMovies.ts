import { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { Movie } from "@/type";

// const API_URL = "https://api.themoviedb.org/3/discover/";
const API_URL = "https://api.themoviedb.org/3";

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`${API_URL}/discover/movie`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
          },
        });
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

export const useSearch = (query: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedSearch = debounce((query: string) => {
    setLoading(true);
    setError("");

    axios
      .get(`${API_URL}/search/movie?`, {
        params: { query: query },
        headers: {
          accept: "application/json",
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2ViYTE1YzhlOTMwNmExNGMxZWQ3ZDUyYTRlNGFhMCIsIm5iZiI6MTczMjYxMjEwNC4xMTAzNDA0LCJzdWIiOiI2NzQ1OGRkMzgwYjQ0YTg5MzdiN2MzNDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.f5pYhZOw9kt_ZFyPzWay-D1seZ2dOGJ43W7Mb5-a-A0`,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
        },
      })
      .then((response) => {
        setData(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch search data. Please try again.");
        console.error(err);
        setLoading(false);
      });
  }, 500);

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    }
  }, [query]);

  return { data, loading, error };
};

// v0.0
// export const useSearch = (query: string) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/search/movie?query=${query}`,
//           {
//             headers: {
//               accept: "application/json",
//               Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2ViYTE1YzhlOTMwNmExNGMxZWQ3ZDUyYTRlNGFhMCIsIm5iZiI6MTczMjYxMjEwNC4xMTAzNDA0LCJzdWIiOiI2NzQ1OGRkMzgwYjQ0YTg5MzdiN2MzNDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.f5pYhZOw9kt_ZFyPzWay-D1seZ2dOGJ43W7Mb5-a-A0`,
//             },
//           }
//         );
//         setData(response.data.results);
//       } catch (err) {
//         setError("Failed to fetch search data. Please try again.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (query) {
//       fetchData();
//     }
//   }, [query]);

//   return { data, loading, error };
// };

export const useMovieId = (id: string) => {
  const [movies, setMovies] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${API_URL}/movie/${id}?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
            },
          }
        );
        setMovies(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch movie data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovieDetails();
  }, []);

  return { movies, loading, error };
};
