import MovieCard from "./MovieCard";
import { cn } from "@/lib/utils";

import { Skeleton } from "./ui/skeleton";
import { Movie } from "@/type";

type Props = {
  title?: string;
  movies: Movie[];
  isVertical?: boolean;
  isLoading?: boolean;
  setIsMovie?: (value: boolean) => boolean;
};

const MovieContainer = ({ title, movies, isVertical, isLoading }: Props) => {
  return (
    <div className="">
      <div className=" w-full sm:px-10 px-5 py-2 flex items-center justify-between border-b border-b-gray-500 relative mb-4">
        <h2 className="text-lg uppercase font-medium tracking-wider">
          {title}
        </h2>

        <span className="w-16 h-1 inline-block absolute left-0 -bottom-[1.5px] z-10" />
      </div>
      <div
        className={cn(
          "grid lg:grid-cols-7 md:grid-cols-5 grid-cols-2 gap-4 px-5 lg:px-10 py-5",
          isVertical && "bg-red-200 flex-col space-x-0 space-y-12"
        )}
      >
        {isLoading
          ? Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  isVertical &&
                    "flex flex-col space-y-5 mb-5 items-center lg:flex-row space-x-5"
                )}
              >
                <Skeleton className="h-[300px] w-[200px] bg-gray-400 rounded-xl" />
                <div className="max-w-2xl">
                  <hr className="mb-3" />
                  <Skeleton className="h-4 bg-gray-400 w-[200px]" />
                </div>
              </div>
            ))
          : movies?.map((movie) =>
              isVertical ? (
                <div
                  key={movie.id}
                  className={cn(
                    isVertical &&
                      "flex flex-col space-y-5 mb-5 items-center lg:flex-row space-x-5"
                  )}
                >
                  <MovieCard movie={movie} />
                  <div className="max-w-2xl">
                    <hr className="mb-3" />
                    <p>{movie?.overview}</p>
                  </div>
                </div>
              ) : (
                <MovieCard key={movie?.id} movie={movie} />
              )
            )}
      </div>
    </div>
  );
};

export default MovieContainer;
