type statisticsType = {
  movies: number;
  imdbRate: number;
  myRate: number;
  wholeTime: number;
};
export default function Statistics({
  statistics,
}: {
  statistics: statisticsType;
}) {
  return (
    <div className="flex flex-col bg-slate-800 text-slate-300 py-5 px-6 gap-4 ">
      <h1 className="text-sm font-Inter font-bold uppercase ">
        Movies You Watched
      </h1>
      <section className="flex flex-row justify-between text-sm font-semibold items-center leading-none">
        <div className="flex flex-row items-center">
          <span className="mr-1">#️⃣</span>
          <p>{statistics.movies} movies</p>
        </div>
        <p>
          <span>⭐</span> {statistics.imdbRate.toFixed(2)}
        </p>
        <p>
          <span>🌟</span> {statistics.myRate.toFixed(2)}
        </p>
        <div className="flex flex-row items-center">
          <span className="mr-1">⌛</span>
          <p>{statistics.wholeTime} min</p>
        </div>
      </section>
    </div>
  );
}
