"use client";

import { useMovies } from "@/hooks/useMovies";
import HeroCarousel from "./HeroCarousel";

const CaroselBanner = () => {
  const { movies, loading, error } = useMovies();

  return <HeroCarousel movies={movies} />;
};

export default CaroselBanner;
