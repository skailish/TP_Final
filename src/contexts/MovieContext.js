import React, { createContext, useState, useEffect } from "react";
import API_KEY from "../utils/API_KEY";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movieRandom, setMovieRandom] = useState([]);
  const [movieTop, setMovieTop] = useState([]);
  const [movieUpcoming, setMovieUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [yearMovie, setYearMovie] = useState();
  const [voteAverageMovie, setVoteAverageMovie] = useState(0);
  const [movie, setMovie] = useState([]);
  const [isLoadingMovie, setIsLoadingMovie] = useState(true);

  useEffect(() => {
    setIsLoadingMovie(true);
    const getMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?page=1&api_key=${API_KEY}`
      );
      const dataJson = await response.json();
      setMovie(dataJson.results);
      setIsLoadingMovie(false);
    };
    getMovies();
  }, []);

  useEffect(() => {
    setIsLoadingMovie(true);
    const pageRandom = Math.floor(Math.random() * 100) + 1;
    const indexRandom = Math.floor(Math.random() * 20);
    const getMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?page=${pageRandom}&api_key=${API_KEY}`
      );
      const dataJson = await response.json();
      setMovieRandom(dataJson.results[indexRandom]);
      setYearMovie(dataJson.results[indexRandom].release_date.split("-")[0]);
      setVoteAverageMovie(dataJson.results[indexRandom].vote_average);
      setIsLoadingMovie(false);
    };
    getMovies();
  }, []);

  useEffect(() => {
    setIsLoadingMovie(true);
    const getMoviesTop = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      const dataJson = await response.json();

      setMovieTop(dataJson.results);
      setIsLoadingMovie(false);
    };
    getMoviesTop();
  }, []);

  useEffect(() => {
    setIsLoadingMovie(true);

    const getMoviesNowPlaying = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      );
      const dataJson = await response.json();

      setNowPlaying(dataJson.results);
      setIsLoadingMovie(false);
    };
    getMoviesNowPlaying();
  }, []);

  useEffect(() => {
    setIsLoadingMovie(true);

    const getMoviesUpcoming = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );
      const dataJson = await response.json();

      setMovieUpcoming(dataJson.results);
      setIsLoadingMovie(false);
    };
    getMoviesUpcoming();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        movieRandom,
        yearMovie,
        voteAverageMovie,
        movie,
        movieTop,
        movieUpcoming,
        nowPlaying,
        isLoadingMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
export { MovieProvider };
