export class Movie {
  id: string;
  poster: string;
  name: string;
  year: number;
  date: string = "";
  rate: number = 0;
  myRate: number = 0;
  time: number = 0;
  genre: string = "";
  plot: string = "";
  actors: string = "";
  director: string = "";
  added: boolean = false;
  constructor(name: string, year: number, id: string, poster: string) {
    this.name = name;
    this.year = year;
    this.id = id;
    this.poster = poster;
  }
  print(): void {
    console.log(
      `${this.name} is published in ${this.year} with rate of ${this.rate} and time of ${this.time}, My rating for it is ${this.myRate}`
    );
  }
  setMyRate(myRate: number) {
    this.myRate = myRate;
  }
  addDetails(
    date: string,
    rate: number,
    time: number,
    genre: string,
    plot: string,
    actors: string,
    director: string
  ) {
    this.date = date;
    this.rate = rate;
    this.time = time;
    this.genre = genre;
    this.plot = plot;
    this.actors = actors;
    this.director = director;
  }
  Added() {
    this.added = true;
  }
  removed() {
    this.added = false;
  }
}
export class Movies {
  myList: Movie[] = [];
  constructor(initialMovies?: Movie[]) {
    if (initialMovies) this.myList = initialMovies;
  }
  addMovie(newMovie: Movie): void {
    this.myList.push(newMovie);
  }
  listMovies(): Movie[] {
    for (const movie of this.myList) {
      movie.print();
    }
    return this.myList;
  }
  removeMovie(name: string): Movie[] {
    this.myList.filter((movie) => movie.name !== name);
    return this.listMovies();
  }
}
