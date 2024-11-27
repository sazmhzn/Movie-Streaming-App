"use client";

import { useMovies } from "@/hooks/useMovies";
import HeroCarousel from "./HeroCarousel";

const CaroselBanner = () => {
  const { movies, loading, error } = useMovies();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        {" "}
        <h3> Loading your carousel</h3>
      </div>
    );

  if (error) <div>Error: {error}</div>;

  return <HeroCarousel movies={movies} />;
};

export default CaroselBanner;
