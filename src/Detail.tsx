import { useState } from "react";
import { Movie } from "./Movies";

export default function Detail({
  movie,
  adding,
  add,
}: {
  movie: Movie | null;
  adding: React.Dispatch<React.SetStateAction<boolean>>;
  add: React.Dispatch<React.SetStateAction<Movie[]>>;
}) {
  const [rate, setRate] = useState(0);
  const [hover, setHover] = useState(0);
  const addMovieHandler = (): void => {
    movie?.setMyRate(rate);
    movie?.Added();
    add((prev) => {
      if (movie) return prev ? [...prev, movie] : [movie];
      else return [...prev];
    });
    adding(false);
  };
  if (!movie)
    return (
      <>
        <p className="text-slate-200 text-sm justify-self-center pt-5">
          There Is No Movies with this Name
        </p>
      </>
    );
  return (
    <section className=" font-Inter text-slate-200 h-full">
      <section className="flex gap-6 bg-slate-800 h-52">
        <section className="w-40 h-full">
          <img
            alt="Poster"
            src={movie.poster !== "N/A" ? movie.poster : "OIP.jpg"}
            className="w-full h-full object-contain object-left"
          />
        </section>
        <section className="flex-1 pt-4 px-1">
          <h1 className="text-lg font-semibold">
            {movie.name ? movie.name : "No Provided Name"}
          </h1>
          <section className="flex flex-col justify-around h-28 mt-3">
            <p className="font-light text-xs">
              {movie.date ? movie.date : "No Provided Date"}
            </p>
            <p className="font-light text-xs">
              {movie.genre ? movie.genre : "No Provided Genre"}
            </p>
            <p className="font-light text-xs">
              {movie.rate ? `⭐${movie.rate} IMDB rating` : "No Provided Rate"}
            </p>
          </section>
        </section>
      </section>
      <section className="px-8">
        <section className="bg-slate-800  flex justify-center mt-5 rounded-md py-4 flex-wrap">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((star) => (
            <button
              key={star}
              className="focus:outline-none hover:scale-110 transition-transform duration-150"
              onClick={() => setRate(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <span
                className={`sm:text-lg text-md transition-colors duration-200 ${
                  star <= (hover || rate)
                    ? "text-yellow-400"
                    : "text-gray-400/50"
                }`}
              >
                ⭐
              </span>
            </button>
          ))}
          <button
            className="bg-violet-700 p-2 rounded-full w-3/4 mt-2 text-sm "
            onClick={addMovieHandler}
          >
            + Add to list
          </button>
        </section>
        <section className="text-left mt-5 font-light leading-snug text-sm flex flex-col gap-6 px-1">
          <p>{movie.plot}</p>
          <p>Starring {movie.actors}</p>
          <p>Directed By {movie.director}</p>
        </section>
      </section>
    </section>
  );
}
