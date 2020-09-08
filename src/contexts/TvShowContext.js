import React, { createContext, useState, useEffect } from "react";
import API_KEY from "../utils/API_KEY";

const TvShowContext = createContext();

const TvShowProvider = ({ children }) => {
  const [dataTvShow, setDataTvShow] = useState([]);
  const [dataTvShowRandom, setDataTvShowRandom] = useState([]);
  const [dataTvTop, setDataTvTop] = useState([]);
  const [year, setYear] = useState(0);
  const [voteAverage, setVoteAverage] = useState(0);
  const [dataCurrentTv, setDataCurrentTv] = useState([]);
  const [dataTodayTv, setDataTodayTv] = useState([]);
  const [isLoadingTvShow, setIsLoadingTvShow] = useState(true);
  const [seasonNumber, setSeasonNumber] = useState(1);

  useEffect(() => {
    setIsLoadingTvShow(true);

    const getTvShows = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
      );
      const dataJson = await response.json();
      setDataTvShow(dataJson.results);
      setIsLoadingTvShow(false);
    };
    getTvShows();
  }, []);

  useEffect(() => {
    setIsLoadingTvShow(true);
    const pageRandom = Math.floor(Math.random() * 100) + 1;
    const indexRandom = Math.floor(Math.random() * 20);

    const getTvShowsRandom = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?page=${pageRandom}&api_key=${API_KEY}`
      );
      const dataJson = await response.json();
      setDataTvShowRandom(dataJson.results[indexRandom]);
      setYear(dataJson.results[indexRandom].first_air_date.split("-")[0]);
      setVoteAverage(dataJson.results[indexRandom].vote_average);
      setIsLoadingTvShow(false);
    };
    getTvShowsRandom();
  }, []);

  useEffect(() => {
    setIsLoadingTvShow(true);

    const getTvTop = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      const dataJson = await response.json();
      setDataTvTop(dataJson.results);
      setIsLoadingTvShow(false);
    };
    getTvTop();
  }, []);

  useEffect(() => {
    setIsLoadingTvShow(true);

    const getTvCurrent = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`
      );
      const dataJson = await response.json();
      setDataCurrentTv(dataJson.results);
      setIsLoadingTvShow(false);
    };
    getTvCurrent();
  }, []);

  useEffect(() => {
    setIsLoadingTvShow(true);

    const getTvToday = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`
      );
      const dataJson = await response.json();
      setDataTodayTv(dataJson.results);
      setIsLoadingTvShow(false);
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
        isLoadingTvShow,
        seasonNumber,
        setSeasonNumber,
      }}
    >
      {children}
    </TvShowContext.Provider>
  );
};

export default TvShowContext;
export { TvShowProvider };
