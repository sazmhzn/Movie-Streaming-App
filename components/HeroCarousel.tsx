"use client";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import Image from "next/image";
import { getImagePath } from "@/hooks/getImagePath";
import { useCallback, useEffect } from "react";

interface Props {
  movies: Movie[];
}

const HeroCarousel = ({ movies }: Props) => {
  const autoplay = AutoPlay({
    stopOnMouseEnter: true,
    stopOnInteraction: false,
  });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay]);

  // Pause autoplay on hover
  const handleMouseEnter = useCallback(() => {
    if (emblaApi) {
      autoplay.stop(); // Stop autoplay when hovered
    }
  }, [emblaApi, autoplay]);

  // Resume autoplay on mouse leave
  const handleMouseLeave = useCallback(() => {
    if (emblaApi) {
      autoplay.play(); // Resume autoplay when no longer hovered
    }
  }, [emblaApi, autoplay]);

  // useEffect(() => {
  //   if (emblaApi) {
  //     console.log(emblaApi.slideNodes());
  //   }
  // }, [emblaApi]);

  return (
    <section
      className="p-0 m-0 overflow-hidden cursor-pointer relative -z-0"
      ref={emblaRef}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="flex">
        {movies.map((movie) => (
          <div
            key={movie?.id}
            className="flex-[0_0_100%] bg-red-300 min-w-0 relative"
          >
            <Image
              src={getImagePath(movie?.backdrop_path, true)}
              alt={movie?.title}
              width={1920}
              height={1080}
              className="w-screen object-cover aspect-auto min-h-[50vh] md:min-h-screen bg-red-100"
            />
            <div className="hidden lg:inline absolute bottom-0 pt-40 xl:pt-72 left-0 bg-transparent z-20 h-full w-full bg-gradient-to-r from-gray-900/90 via-transparent to-transparent p-10 space-y-5 text-white">
              <h2 className="text-5xl font-bold max-w-xl">{movie?.title}</h2>
              <p className="max-w-xl line-clamp-3">{movie?.overview}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-0 left-0 inset-0 bg-gradient-to-b from-black-100/10 via-gray-900/30 to-black dark:to-[#121212]" />
    </section>
  );
};

export default HeroCarousel;
