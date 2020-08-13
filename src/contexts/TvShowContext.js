import React, { createContext, useState, useEffect } from "react";

const TvShowContext = createContext();

const TvShowProvider = ({ children }) => {
  const [dataTvShow, setDataTvShow] = useState([]);
  const [dataTvShowRandom, setDataTvShowRandom] = useState([]);
  const [dataTvTop, setDataTvTop] = useState([]);
  const [year, setYear] = useState(0);
  const [voteAverage, setVoteAverage] = useState(0);
  const [dataCurrentTv, setDataCurrentTv] = useState([]);
  const [dataTodayTv, setDataTodayTv] = useState([]);

  useEffect(() => {
    const getTvShows = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=d6798e588b7a270cba41fa64d417d9e7`
      );
      const dataJson = await response.json();
      setDataTvShow(dataJson.results);
    };
    getTvShows();
  }, []);

  useEffect(() => {
    const pageRandom = Math.floor(Math.random() * 100) + 1;
    const indexRandom = Math.floor(Math.random() * 20);
    const getTvShowsRandom = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?page=${pageRandom}&api_key=d6798e588b7a270cba41fa64d417d9e7`
      );
      const dataJson = await response.json();
      setDataTvShowRandom(dataJson.results[indexRandom]);
      setYear(dataJson.results[indexRandom].first_air_date.split("-")[0]);
      setVoteAverage(dataJson.results[indexRandom].vote_average);
    };
    getTvShowsRandom();
  }, []);

  useEffect(() => {
    const getTvTop = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=d6798e588b7a270cba41fa64d417d9e7&language=en-US&page=1`
      );
      const dataJson = await response.json();
      setDataTvTop(dataJson.results);
    };
    getTvTop();
  }, []);

  useEffect(() => {
    const getTvCurrent = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/on_the_air?api_key=d6798e588b7a270cba41fa64d417d9e7&language=en-US&page=1`
      );
      const dataJson = await response.json();
      setDataCurrentTv(dataJson.results);
    };
    getTvCurrent();
  }, []);

  useEffect(() => {
    const getTvToday = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/airing_today?api_key=d6798e588b7a270cba41fa64d417d9e7&language=en-US&page=1`
      );
      const dataJson = await response.json();
      setDataTodayTv(dataJson.results);
    };
    getTvToday();
  }, []);

  return (
    <TvShowContext.Provider
      value={{
        dataTodayTv,
        dataCurrentTv,
        dataTvTop,
        dataTvShow,
        dataTvShowRandom,
        year,
        voteAverage,
      }}
    >
      {children}
    </TvShowContext.Provider>
  );
};

export default TvShowContext;
export { TvShowProvider };
