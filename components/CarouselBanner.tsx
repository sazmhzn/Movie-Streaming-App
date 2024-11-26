"use client";

import { useMovies } from "@/hooks/useMovies";
import HeroCarousel from "./HeroCarousel";

interface Props {
  id?: string;
  keywords?: string;
}

const CaroselBanner = ({ id, keywords }: Props) => {
  const { movies, loading, error } = useMovies();

  return <HeroCarousel movies={movies} />;
};

export default CaroselBanner;
