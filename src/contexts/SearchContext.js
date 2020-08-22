import React, { createContext, useState, useEffect } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [media, setMedia] = useState("movie");
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState(false);
  const [mountResults, setMountResults] = useState(false);
  const [genres, setGenres] = useState([]);
  const [mediaAdvance, setMediaAdvance] = useState("movie");
  const [genresAdvance, setGenresAdvance] = useState("");
  const [years, setYears] = useState([]);
  const [interval, setInterval] = useState("exact");
  const [orderBy, setOrderBy] = useState("original_title.asc");

  const handleSearchBarVisibleClick = () => {
    setSearchVisible(!searchVisible);
    setVisibleResults(false);
  };
  const handleMediaClick = (event) => setMedia(event.target.value);

  const handleInputChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.input.value);
    setVisibleResults(true);
    setMountResults(true);
  };

  const handleCloseSearchClick = () => {
    setVisibleResults(false);
    setSearchVisible(false);
  };

  const handleMediaChange = (event) => setMediaAdvance(event.target.value);
  const handleGenreChange = (event) => setGenresAdvance(event.target.value);
  const handleIntervalChange = (event) => setInterval(event.target.value);
  const handleYearChange = (event) => setYears(event.target.value);
  const handleOrderByChange = (event) => setOrderBy(event.target.value);

  useEffect(() => {
    const getSearch = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${media}?api_key=8235fd73c07d8e61320d0df784562bb2&language=en-US&query=${inputValue}&page=1`
      );
      const dataJson = await response.json();
      setResults(dataJson.results);
      setMountResults(true);
    };
    getSearch();
  }, [inputValue, media]);

  useEffect(() => {
    const getGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/${mediaAdvance}/list?api_key=8235fd73c07d8e61320d0df784562bb2&language=en-US`
      );
      const dataJson = await response.json();
      setGenres(dataJson.genres);
    };
    getGenres();
  }, [mediaAdvance]);

  useEffect(() => {
    const areGenres = genresAdvance && `&with_genres=${genresAdvance}`;
    const areQuery = inputValue && `&query=${inputValue}`;
    const areSortBy =
      orderBy &&
      orderBy !== "original_name.asc" &&
      orderBy !== "original_name.desc" &&
      `&sort_by=${orderBy}`;
    console
    const reduceYears = (array, year) => {
      if (array.length < 1) {
        return [...array, year];
      } else {
        if (array.includes(year)) {
          return array;
        }
        return [...array, year];
      }
    };

    const getYears = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${mediaAdvance}?api_key=8235fd73c07d8e61320d0df784562bb2&language=en-US${areGenres}${areQuery}`
      );
      const dataJson = await response.json();
      const jsonYears =
        mediaAdvance === "tv"
          ? dataJson.results
              .map((serie) => serie.first_air_date.split("-")[0])
              .reduce(reduceYears, [])
              .sort()
          : dataJson.results
              .map((movie) => movie.release_date.split("-")[0])
              .reduce(reduceYears, [])
              .sort();

      console.log(dataJson.results);
      setYears(jsonYears);
      setResults(dataJson.results);
    };
    getYears();
  }, [mediaAdvance, genresAdvance]);

  return (
    <SearchContext.Provider
      value={{
        searchVisible,
        visibleResults,
        results,
        media,
        inputValue,
        mountResults,
        genres,
        years,
        interval,
        mediaAdvance,
        orderBy,
        handleSearchBarVisibleClick,
        handleMediaClick,
        setSearchVisible,
        setVisibleResults,
        handleInputChange,
        handleCloseSearchClick,
        handleIntervalChange,
        handleMediaChange,
        handleGenreChange,
        handleYearChange,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
export { SearchProvider };
