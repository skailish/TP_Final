import React, { createContext, useState, useEffect } from "react";

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
  const [chosenYear, setChosenYear] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const [searchMaxPage, setSearchMaxPage] = useState(1000);
  const [yearEndPoint, setYearEndPoint] = useState("");

  const areGenres = genresAdvance ? `&with_genres=${genresAdvance}` : "";

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
    setMediaAdvance(event.target.value);
  };

  const handleGenreChange = (event) => setGenresAdvance(event.target.value);

  const handleIntervalChange = (event) => setInterval(event.target.value);

  const handleYearChange = (event) => {
    setChosenYear(event.target.value);
    console.log(event.target.value);
  };

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handleShowResultsClick = (event) => {
    event.preventDefault();
    setShowResults(true);
  };

  const orderByYears = (
    setYearEndPoint,
    chosenYear,
    interval,
    mediaAdvance
  ) => {
    switch (interval) {
      case "before":
        if (mediaAdvance === "movie") {
          setYearEndPoint(`&release_date.lte=${chosenYear}-01-01`);
        } else {
          setYearEndPoint(`&first_air_date.lte=${chosenYear}-01-01`);
        }

        break;
      case "exact":
        if (mediaAdvance === "movie") {
          setYearEndPoint(`&primary_release_year=${chosenYear}`);
        } else {
          setYearEndPoint(`&first_air_date_year=${chosenYear}`);
        }

        break;
      default:
        if (mediaAdvance === "movie") {
          setYearEndPoint(`&release_date.gte=${chosenYear}-01-01`);
        } else {
          setYearEndPoint(`&first_air_date.gte=${chosenYear}-01-01`);
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
      setGenresAdvance(false);
    };
    getGenres();
  }, [mediaAdvance]);

  useEffect(() => {
    const getYears = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${mediaAdvance}?api_key=8235fd73c07d8e61320d0df784562bb2&language=en-US&page=1&sort_by=${
          mediaAdvance === "movie" ? "release_date.asc" : "first_date_air.asc"
        }`
      );
      const dataJson = await response.json();
      const getFirstYear =
        mediaAdvance === "movie"
          ? dataJson.results
              .filter(
                (movie) =>
                  movie.release_date !== undefined && movie.release_date !== ""
              )[0]
              .release_date.split("-")[0]
          : dataJson.results
              .filter(
                (serie) =>
                  serie.first_air_date !== undefined &&
                  serie.first_air_date !== ""
              )[0]
              .first_air_date.split("-")[0];

      const arrayLength = 2021 - Number(getFirstYear);
      const arrayYears = Array(arrayLength);
      const getArray = () => {
        for (let i = 0; i < arrayYears.length; i++) {
          arrayYears[i] = Number(getFirstYear) + i;
        }
        return arrayYears;
      };
      setYears(getArray());
      setChosenYear(Number(getFirstYear));
    };
    getYears();
  }, [mediaAdvance]);

  useEffect(() => {
    const areSortBy =
      orderBy !== "original_name.asc" &&
      orderBy !== "original_name.desc" &&
      `&sort_by=${orderBy}`;

    const getResults = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${mediaAdvance}?api_key=8235fd73c07d8e61320d0df784562bb2&language=en-US${areGenres}${yearEndPoint}${areSortBy}&page=${searchPage}`
      );
      const dataJson = await response.json();

      setDiscover(dataJson.results);
      setSearchMaxPage(dataJson.total_pages);
      orderByYears(setYearEndPoint, chosenYear, interval, mediaAdvance);
    };
    getResults();
  }, [
    yearEndPoint,
    areGenres,
    mediaAdvance,
    genresAdvance,
    orderBy,
    chosenYear,
    interval,
    searchPage,
  ]);

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
        genresAdvance,
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
