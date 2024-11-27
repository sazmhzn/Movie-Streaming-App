"use client";

import CaroselBanner from "@/components/CarouselBanner";
import MovieContainer from "@/components/MovieContainer";
import { Skeleton } from "@/components/ui/skeleton";
import { useMovies } from "@/hooks/useMovies";

import { useState } from "react";

export default function Home() {
  const [isMovie, setIsMovie] = useState(true);
  const { movies, loading, error } = useMovies(isMovie);

  if (error) return <div className="my-40">{error}</div>;

  return (
    <main className="relative min-h-screen flex justify-center items-center flex-col overflow-hidden mx-auto">
      {loading && (
        <div className="flex w-full px-8 items-start">
          <div className="space-y-2">
            <Skeleton className="h-4 bg-gray-300 w-[250px]" />
            <Skeleton className="h-4 bg-gray-300 w-[200px]" />
          </div>
        </div>
      )}

      {error && (
        <p className="text-lg text-red-600 px-10">
          Something went wrong: {error}. Please try again.
        </p>
      )}

      <CaroselBanner isMovie />

      <div className="w-full py-10">
        <div className="flex flex-col space-y-2">
          <MovieContainer
            title="Popular Movies"
            movies={movies}
            isLoading={loading}
            setIsMovie={setIsMovie}
          />
        </div>
      </div>
    </main>
  );
}
