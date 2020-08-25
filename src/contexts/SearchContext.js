import React, { createContext, useState, useEffect, useContext } from "react";

import PaginationContext from "contexts/PaginationContext";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [newSearch, setNewSearch] = useState(false);
  const [media, setMedia] = useState("movie");
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState(false);

  const [genres, setGenres] = useState([]);
  const [mediaAdvance, setMediaAdvance] = useState("movie");
  const [genresAdvance, setGenresAdvance] = useState("");
  const [years, setYears] = useState([]);
  const [interval, setInterval] = useState("after");
  const [orderBy, setOrderBy] = useState("popularity.desc");
  const [discover, setDiscover] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [chosenYear, setChosenYear] = useState("2010");
  const [searchPage, setSearchPage] = useState(1);
  const [searchMaxPage, setSearchMaxPage] = useState(1000);
  const [maxPage, setMaxPage] = useState(1000);
  const [page, setPage] = useState(1);

  const handleSearchBarVisibleClick = () => {
    setSearchVisible(!searchVisible);
    setVisibleResults(false);
  };

  const handleMediaClick = (event) => {
    setMedia(event.target.value);
  };
  const handleInputChange = (event) => {
    event.preventDefault();
    setInputValue(event.target.input.value);
    setVisibleResults(true);
  };

  const handleCloseSearchClick = () => {
    setVisibleResults(false);
    setSearchVisible(false);
  };

  const handleMediaChange = (event) => {
    console.log(event.target.value);
    setMediaAdvance(event.target.value);
  };
  const handleGenreChange = (event) => setGenresAdvance(event.target.value);
  const handleIntervalChange = (event) => setInterval(event.target.value);
  const handleYearChange = (event) => setChosenYear(event.target.value);
  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };
  const handleShowResultsClick = (event) => {
    event.preventDefault();
    setShowResults(true);
  };
  const orderByYears = (
    discover,
    years,
    interval,
    setDiscover,
    mediaAdvance
  ) => {
    switch (interval) {
      case "before":
        {
          let filteredDiscover = [];
          if (mediaAdvance === "movie") {
            filteredDiscover = discover
              .filter(
                (movie) =>
                  movie.release_date !== undefined && movie.release_date !== ""
              )
              .filter((movie) => movie.release_date.split("-")[0] <= years);
          } else {
            filteredDiscover = discover
              .filter(
                (tv) =>
                  tv.first_air_date !== undefined && tv.first_air_date !== ""
              )
              .filter((tv) => tv.first_air_date.split("-")[0] <= years);
          }

          setDiscover(filteredDiscover);
        }
        break;
      case "exact":
        {
          let filteredDiscover = [];
          if (mediaAdvance === "movie") {
            filteredDiscover = discover
              .filter(
                (movie) =>
                  movie.release_date !== undefined && movie.release_date !== ""
              )
              .filter((movie) => movie.release_date.split("-")[0] === years);
          } else {
            filteredDiscover = discover
              .filter(
                (tv) =>
                  tv.first_air_date !== undefined && tv.first_air_date !== ""
              )
              .filter((tv) => tv.first_air_date.split("-")[0] === years);
          }
          setDiscover(filteredDiscover);
        }
        break;
      default:
        {
          let filteredDiscover = [];
          if (mediaAdvance === "movie") {
            filteredDiscover = discover
              .filter(
                (movie) =>
                  movie.release_date !== undefined && movie.release_date !== ""
              )
              .filter((movie) => movie.release_date.split("-")[0] >= years);
          } else {
            filteredDiscover = discover
              .filter(
                (tv) =>
                  tv.first_air_date !== undefined && tv.first_air_date !== ""
              )
              .filter((tv) => tv.first_air_date.split("-")[0] >= years);
          }
          setDiscover(filteredDiscover);
        }
        break;
    }
  };

  useEffect(() => {
    const getSearch = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${media}?api_key=8235fd73c07d8e61320d0df784562bb2&language=en-US&query=${inputValue}&page=${searchPage}`
      );
      const dataJson = await response.json();
      setResults(dataJson.results);
      setSearchMaxPage(dataJson.total_pages);

      setNewSearch(false);
    };
    getSearch();
  }, [inputValue, media, searchPage, newSearch]);

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
    const areSortBy =
      orderBy !== "original_name.asc" &&
      orderBy !== "original_name.desc" &&
      `&sort_by=${orderBy}`;
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
        `https://api.themoviedb.org/3/discover/${mediaAdvance}?api_key=8235fd73c07d8e61320d0df784562bb2&language=en-US${areGenres}${areSortBy}&page=${searchPage}`
      );
      const dataJson = await response.json();

      const jsonYears =
        mediaAdvance === "tv"
          ? dataJson.results
              .filter(
                (serie) =>
                  serie.first_air_date !== undefined &&
                  serie.first_air_date !== ""
              )
              .map((serie) => serie.first_air_date.split("-")[0])
              .reduce(reduceYears, [])
              .sort()
          : dataJson.results
              .filter(
                (movie) =>
                  movie.release_date !== undefined && movie.release_date !== ""
              )
              .map((movie) => movie.release_date.split("-")[0])
              .reduce(reduceYears, [])
              .sort();

      setYears(jsonYears);
      setDiscover(dataJson.results);
      console.log(dataJson.results);
      orderByYears(
        dataJson.results,
        chosenYear,
        interval,
        setDiscover,
        mediaAdvance
      );
    };
    getYears();
  }, [mediaAdvance, genresAdvance, orderBy, chosenYear, interval, searchPage]);

  return (
    <SearchContext.Provider
      value={{
        searchPage,
        searchVisible,
        visibleResults,
        results,
        media,
        discover,
        inputValue,
        genres,
        years,
        interval,
        mediaAdvance,
        orderBy,
        showResults,
        searchMaxPage,
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
        handleOrderByChange,
        handleShowResultsClick,
        setSearchPage,
        setNewSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
export { SearchProvider };
