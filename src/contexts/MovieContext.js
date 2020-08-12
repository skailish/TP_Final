import React, { createContext, useState, useEffect } from "react";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [dataMovieRandom, setDataMovieRandom] = useState([]);
  const [category, setCategory] = useState("popular");
  const [dataMoviePopular, setDataMoviePopular] = useState();
  const [dataMovieTop, setDataMovieTop] = useState();
  const [dataMovieUpcoming, setDataMovieUpcoming] = useState();
  const [dataNowPlaying, setDataNowPlaying] = useState();
  const [yearMovie, setYearMovie] = useState();
  const [voteAverageMovie, setVoteAverageMovie] = useState(0);
  const [dataMovie, setDataMovie] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?page=1&api_key=d6798e588b7a270cba41fa64d417d9e7`
      );
      const dataJson = await response.json();
      setDataMovie(dataJson.results);
    };
    getMovies();
  }, []);

  useEffect(() => {
    const pageRandom = Math.floor(Math.random() * 100) + 1;
    const indexRandom = Math.floor(Math.random() * 20);
    const getMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?page=${pageRandom}&api_key=d6798e588b7a270cba41fa64d417d9e7`
      );
      const dataJson = await response.json();
      setDataMovieRandom(dataJson.results[indexRandom]);
      setYearMovie(dataJson.results[indexRandom].release_date.split("-")[0]);
      setVoteAverageMovie(dataJson.results[indexRandom].vote_average);
    };
    getMovies();
  }, []);

  return (
    <MovieContext.Provider
      value={{ dataMovieRandom, yearMovie, voteAverageMovie, dataMovie }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
export { MovieProvider };
