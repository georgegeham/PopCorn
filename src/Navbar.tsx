import { useEffect, useState } from "react";
import { searchMovie } from "./API";
import { Movie } from "./Movies";

export default function Navbar({
  search,
  number,
}: {
  search: React.Dispatch<React.SetStateAction<Movie[]>>;
  number: number;
}) {
  const [query, setQuery] = useState("");
  useEffect(() => {
    const timeOut = setTimeout(async () => {
      if (query !== "") {
        const response = await searchMovie(query);
        if (response) search(response);
      }
    }, 500);
    return () => {
      clearTimeout(timeOut);
      search([]);
    };
  }, [query, search]);
  return (
    <nav className="bg-violet-700 h-14 my-4 rounded-lg flex flex-row justify-between items-center px-2 sm:px-6 flex-wrap sm:w-[68%] w-4/5 justify-self-center text-nowrap place-self-center mx-auto">
      <div className="flex-1">
        <h1 className="sm:text-xl text-white font-semibold font-Inter md:text-sm text-sm">
          <span className="sm:mr-2 sm:text-2xl text-lg">🍿</span>PopCorn
        </h1>
      </div>
      <input
        type="search"
        placeholder="Search Movies..."
        className="md:min-w-72 w-full text-xs flex-1 px-1 rounded-md text-slate-200 leading-tight bg-violet-600 py-1 sm:px-4 outline-none caret-slate-200 sm:text-base transition-all duration-300 ease-in-out
    transform
    focus:-translate-y-1
    focus:shadow-lg
    shadow-blue-200"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex-1 text-right">
        <h1 className="sm:text-sm text-xs font-Inter text-slate-200 font-light">
          Found <span className="font-semibold">{number}</span> results
        </h1>
      </div>
    </nav>
  );
}
