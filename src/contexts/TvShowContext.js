import React, { createContext, useState, useEffect } from "react";
import API_KEY from "../utils/API_KEY";
import useFetch from "../hooks/useFetch";

const TvShowContext = createContext();

const TvShowProvider = ({ children }) => {
  const [tvShow, setTvShow] = useState([]);
  const [tvShowRandom, setTvShowRandom] = useState([]);
  const [tvTop, setTvTop] = useState([]);
  const [year, setYear] = useState(0);
  const [voteAverage, setVoteAverage] = useState(0);
  const [currentTv, setCurrentTv] = useState([]);
  const [todayTv, setTodayTv] = useState([]);
  const [isLoadingTvShow, setIsLoadingTvShow] = useState(true);
  const [seasonNumber, setSeasonNumber] = useState(1);

  const dataTVShows = useFetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`,
    []
  );

  const dataTVRandom = useFetch(
    `https://api.themoviedb.org/3/tv/popular?page=${
      Math.floor(Math.random() * 100) + 1
    }&api_key=${API_KEY}`,
    []
  );

  const dataTvTop = useFetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    []
  );

  const tvCurrent = useFetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`,
    []
  );

  const dataTvToday = useFetch(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`,
    []
  );

  useEffect(() => {
    (dataTVShows || dataTVRandom || dataTvTop || tvCurrent || dataTvToday) &&
      setIsLoadingTvShow(true);
    dataTVShows && setTvShow(dataTVShows.results);

    const indexRandom = Math.floor(Math.random() * 20);
    dataTVRandom && setTvShowRandom(dataTVRandom.results[indexRandom]);
    dataTVRandom &&
      setYear(dataTVRandom.results[indexRandom].first_air_date.split("-")[0]);
    dataTVRandom &&
      setVoteAverage(dataTVRandom.results[indexRandom].vote_average);

    dataTvTop && setTvTop(dataTvTop.results);

    tvCurrent && setCurrentTv(tvCurrent.results);

    dataTvToday && setTodayTv(dataTvToday.results);

    dataTVShows &&
      dataTVRandom &&
      dataTvTop &&
      dataTvToday &&
      setIsLoadingTvShow(false);
  }, [dataTVShows, dataTVRandom, dataTvTop, tvCurrent, dataTvToday]);
  
  return (
    <TvShowContext.Provider
      value={{
        todayTv,
        currentTv,
        tvTop,
        tvShow,
        tvShowRandom,
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
