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
  const [orderBy, setOrderBy] = useState("popularity.desc");
  const [discover, setDiscover] = useState([]);
  const [showResults, setShowResults] = useState(false);

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
  const handleOrderByChange = (event) => {
    console.log(event.target.value);
    setOrderBy(event.target.value);
  };
  const handleShowResultsClick = (event) => {
    event.preventDefault();
    setShowResults(true);
  };
  const orderDiscoverBy = (orderBy, array, setDiscover) => {
    switch (orderBy) {
      case "original_name.asc":
        {
          const newArray = array.sort((a, b) => {
            if (a.original_name < b.original_name) {
              return -1;
            }
            if (a.original_name > b.original_name) {
              return 1;
            }
            return 0;
          });
          setDiscover(newArray);
        }
        break;
      case "original_name.desc":
        {
          const newArray = array.sort((a, b) => {
            if (a.original_name < b.original_name) {
              return 1;
            }
            if (a.original_name > b.original_name) {
              return -1;
            }
            return 0;
          });
          setDiscover(newArray);
        }
        break;
        
    }
  };

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
    const areSortBy =
      orderBy !== "original_name.asc" &&
      orderBy !== "original_name.desc" &&
      `&sort_by=${orderBy}`;
    console.log(areSortBy);
    console.log(orderBy);
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
        `https://api.themoviedb.org/3/discover/${mediaAdvance}?api_key=8235fd73c07d8e61320d0df784562bb2&language=en-US${areGenres}${areSortBy}${
          mediaAdvance === "tv"
            ? "&include_null_first_air_date=false"
            : "&include_null_release_date=false"
        }`
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
      orderDiscoverBy(dataJson.results, orderBy, setDiscover);
      setShowResults(false);
    };
    getYears();
  }, [mediaAdvance, genresAdvance, orderBy]);

  return (
    <SearchContext.Provider
      value={{
        searchVisible,
        visibleResults,
        results,
        media,
        discover,
        inputValue,
        mountResults,
        genres,
        years,
        interval,
        mediaAdvance,
        orderBy,
        showResults,
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
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
export { SearchProvider };
