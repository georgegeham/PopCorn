import axios from "axios";
import { Movie } from "./Movies";
const URL = "http://www.omdbapi.com/";
const API_KEY = "e2425fa";
export const searchMovie = async (query: string): Promise<Movie[] | null> => {
  try {
    const response = await axios.get(URL, {
      params: {
        apikey: API_KEY,
        s: query,
      },
    });
    const searchedMovie = response.data.Search as {
      Title: string;
      Year: number;
      imdbID: string;
      Poster: string;
    }[];
    console.log(searchedMovie);
    if (searchedMovie) {
      const resultList = searchedMovie.map((movie) => {
        const newMovie = new Movie(
          movie.Title,
          movie.Year,
          movie.imdbID,
          movie.Poster
        );
        return newMovie;
      });
      return resultList;
    }
    console.log("There is no Movie Found with this name");
    return null;
  } catch (err) {
    console.log("Error While Fetching Searched Movies", err);
    throw err;
  }
};

export const getByID = async (id: string): Promise<any | null> => {
  try {
    const response = await axios.get(URL, {
      params: {
        apikey: API_KEY,
        i: id,
      },
    });
    const searchedMovie = response.data;
    if (searchedMovie.Response === "True") {
      return searchedMovie;
    }
    return null;
  } catch (err) {
    console.log("Error While Getting Movie Details", err);
    throw err;
  }
};
