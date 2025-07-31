import "./App.css";
import Navbar from "./Navbar";
import Main from "./Main";
import Statistics from "./Statistics";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import { Movie } from "./Movies";
import Detail from "./Detail";
const KEY = "moviesList";
function App() {
  const [searchList, setSearchList] = useState<Movie[]>([]);
  const [watchedList, setWatchedList] = useState<Movie[]>([]);
  const [selected, setSelected] = useState<Movie | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [movieLoaded, setMovieIsLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const found = searchList.length;
  const statistics = {
    movies: watchedList.length,
    imdbRate:
      watchedList.length > 0
        ? watchedList.reduce((sum, movie) => sum + movie.rate, 0) /
          watchedList.length
        : 0,
    myRate:
      watchedList.length > 0
        ? watchedList.reduce((sum, movie) => sum + movie.myRate, 0) /
          watchedList.length
        : 0,
    wholeTime:
      watchedList.length > 0
        ? watchedList.reduce((sum, movie) => sum + movie.time, 0)
        : 0,
  };
  const Spinner = () => {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-slate-900"></div>
      </div>
    );
  };
  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored) setWatchedList(JSON.parse(stored));
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    if (isLoaded && Array.isArray(watchedList)) {
      localStorage.setItem(KEY, JSON.stringify(watchedList));
    }
  }, [watchedList, isLoaded]);
  return (
    <div className="bg-gray-800 min-h-screen">
      <div className="w-full h-1"></div>
      <Navbar search={setSearchList} number={found} />
      <div className="flex flex-wrap gap-3 justify-center  sm:p-0 p-3">
        <Main>
          <div className="divide-y divide-slate-500 mt-4">
            {searchList.length > 0 ? (
              searchList.map((movie, index) => (
                <MovieCard
                  key={index}
                  movie={movie}
                  adding={setIsAdding}
                  selecting={setSelected}
                  movieLoading={setMovieIsLoaded}
                  watchedList={setWatchedList}
                >
                  <p>🗒️ {movie.year}</p>
                </MovieCard>
              ))
            ) : (
              <p className="text-slate-200 text-sm justify-self-center pt-5 text-center">
                There Is No Movies with this Name
              </p>
            )}
          </div>
        </Main>
        <Main>
          {movieLoaded ? (
            <Spinner />
          ) : isAdding ? (
            <Detail
              movie={selected}
              adding={setIsAdding}
              add={setWatchedList}
            />
          ) : (
            <>
              <Statistics statistics={statistics} />
              {watchedList.map((movie, index) => (
                <MovieCard
                  movie={movie}
                  key={index}
                  adding={setIsAdding}
                  selecting={setSelected}
                  movieLoading={setMovieIsLoaded}
                  watchedList={setWatchedList}
                >
                  <section className="flex flex-row justify-between text-sm font-semibold items-center leading-none gap-5">
                    <p>
                      <span>⭐</span>
                      {movie.rate}
                    </p>
                    <p>
                      <span>🌟</span>
                      {movie.myRate}
                    </p>
                    <div className="flex flex-row items-center">
                      <span className="mr-1">⌛</span>
                      <p>{movie.time} min</p>
                    </div>
                  </section>
                </MovieCard>
              ))}
            </>
          )}
        </Main>
      </div>
    </div>
  );
}

export default App;
