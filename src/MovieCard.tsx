import { getByID } from "./API";
import { Movie } from "./Movies";

export default function MovieCard({
  children,
  movie,
  adding,
  selecting,
  movieLoading,
  watchedList,
}: {
  children: React.ReactNode;
  movie: Movie;
  adding: React.Dispatch<React.SetStateAction<boolean>>;
  selecting: React.Dispatch<React.SetStateAction<Movie | null>>;
  movieLoading: React.Dispatch<React.SetStateAction<boolean>>;
  watchedList: React.Dispatch<React.SetStateAction<Movie[]>>;
}) {
  if (!movie) return null;
  const removeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    selecting(null);
    movie.removed();
    movie.setMyRate(0);
    watchedList((prev) => prev.filter((watched) => watched.id !== movie.id));
    adding(false);
  };
  return (
    <section
      className="box-border  p-4 flex sm:justify-start gap-4 sm:gap-2 cursor-pointer"
      onClick={async () => {
        if (!movie.added) {
          movieLoading(true);
          const received = await getByID(movie.id);
          movieLoading(false);
          if (received) {
            movie.addDetails(
              received.Released,
              Number(received.imdbRating),
              Number(received.Runtime.trim().split(/\s+/)[0]),
              received.Genre,
              received.Plot,
              received.Actors,
              received.Director
            );
            selecting(movie);
            adding(true);
          } else return;
        }
      }}
    >
      <section className=" max-w-20 sm:max-w-16 overflow-hidden max-h-20 rounded-xl">
        <img
          alt="Poster"
          src={movie.poster !== "N/A" ? movie.poster : "OIP.jpg"}
          className="w-full h-full justify-self-center place-items-center p-3 object-cover"
        />
      </section>
      <section className=" text-slate-300 font-Inter flex flex-col justify-center items-start">
        <p className="font-semibold mb-2">{movie.name}</p>
        {children}
      </section>
      {movie.added ? (
        <section className="flex-1 flex justify-end items-center">
          <button
            className="button bg-red-700 w-4 h-4 rounded-full flex justify-center items-center text-center leading-none text-md font-normal pb-[3px]"
            onClick={removeHandler}
          >
            {"\u00D7"}
          </button>
        </section>
      ) : (
        ""
      )}
    </section>
  );
}
